from unittest import mock
from urllib.parse import parse_qs

from django.conf import settings
from django.contrib.auth import SESSION_KEY
from django.contrib.auth.models import User
from django.core.exceptions import SuspiciousOperation
from django.test import TestCase
from django.urls import reverse

from locallibrary.auth import KeycloakOIDCAuthenticationBackend

CLAIMS = {
    "sub": "5f0c7a3e-9b1d-4c2e-8f6a-0d4b3c2a1e9f",
    "preferred_username": "demo",
    "email": "demo@example.com",
    "given_name": "Demo",
    "family_name": "User",
}


class KeycloakOIDCAuthenticationBackendTest(TestCase):
    def get_or_create_user(self, claims):
        backend = KeycloakOIDCAuthenticationBackend()
        with mock.patch.object(backend, "get_userinfo", return_value=claims):
            return backend.get_or_create_user("access-token", "id-token", {})

    def test_creates_user_from_keycloak_claims(self):
        user = self.get_or_create_user(CLAIMS)
        self.assertEqual(user.username, "demo")
        self.assertEqual(user.email, "demo@example.com")
        self.assertEqual(user.get_full_name(), "Demo User")
        self.assertFalse(user.has_usable_password())

    def test_updates_existing_user_with_same_username(self):
        existing = User.objects.create_user("demo", email="old@example.com")
        user = self.get_or_create_user(CLAIMS)
        self.assertEqual(user.pk, existing.pk)
        self.assertEqual(User.objects.get(pk=existing.pk).email, "demo@example.com")

    def test_rejects_claims_without_preferred_username(self):
        with self.assertRaises(SuspiciousOperation):
            self.get_or_create_user({"sub": CLAIMS["sub"], "email": CLAIMS["email"]})


class KeycloakLogoutTest(TestCase):
    def setUp(self):
        self.client.force_login(User.objects.create_user("demo"))

    def test_logout_ends_keycloak_session(self):
        session = self.client.session
        session["oidc_id_token"] = "id-token"
        session.save()

        response = self.client.post(reverse("oidc_logout"))

        endpoint, _, query = response.url.partition("?")
        self.assertEqual(endpoint, settings.OIDC_OP_LOGOUT_ENDPOINT)
        self.assertEqual(
            parse_qs(query),
            {
                "client_id": [settings.OIDC_RP_CLIENT_ID],
                "post_logout_redirect_uri": ["http://testserver/"],
                "id_token_hint": ["id-token"],
            },
        )
        self.assertNotIn(SESSION_KEY, self.client.session)

    def test_logout_without_id_token_only_ends_django_session(self):
        response = self.client.post(reverse("oidc_logout"))
        self.assertRedirects(response, settings.LOGOUT_REDIRECT_URL, fetch_redirect_response=False)
        self.assertNotIn(SESSION_KEY, self.client.session)
