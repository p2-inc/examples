from urllib.parse import urlencode

from django.conf import settings
from django.shortcuts import resolve_url
from mozilla_django_oidc.auth import OIDCAuthenticationBackend


class KeycloakOIDCAuthenticationBackend(OIDCAuthenticationBackend):
    def verify_claims(self, claims):
        return bool(claims.get("preferred_username"))

    def filter_users_by_claims(self, claims):
        return self.UserModel.objects.filter(username=claims["preferred_username"])

    def create_user(self, claims):
        user = self.UserModel.objects.create_user(claims["preferred_username"])
        return self.update_user(user, claims)

    def update_user(self, user, claims):
        user.email = claims.get("email", "")
        user.first_name = claims.get("given_name", "")
        user.last_name = claims.get("family_name", "")
        user.save()
        return user


def keycloak_logout_url(request):
    redirect_url = resolve_url(settings.LOGOUT_REDIRECT_URL)
    id_token = request.session.get("oidc_id_token")
    if not id_token:
        return redirect_url
    query = urlencode(
        {
            "client_id": settings.OIDC_RP_CLIENT_ID,
            "post_logout_redirect_uri": request.build_absolute_uri(redirect_url),
            "id_token_hint": id_token,
        }
    )
    return f"{settings.OIDC_OP_LOGOUT_ENDPOINT}?{query}"
