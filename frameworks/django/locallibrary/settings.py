import os
from pathlib import Path

import dj_database_url
from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv(BASE_DIR / ".env")


def env_list(name, default=""):
    return [value.strip() for value in os.environ.get(name, default).split(",") if value.strip()]


DEBUG = os.environ.get("DJANGO_DEBUG", "False").lower() in ("1", "true", "yes")

SECRET_KEY = os.environ.get("DJANGO_SECRET_KEY", "")
if not SECRET_KEY:
    if not DEBUG:
        raise ImproperlyConfigured("Set DJANGO_SECRET_KEY, or DJANGO_DEBUG=True for local development.")
    SECRET_KEY = "django-insecure-local-development-only"

ALLOWED_HOSTS = env_list("DJANGO_ALLOWED_HOSTS", "localhost,127.0.0.1")
CSRF_TRUSTED_ORIGINS = env_list("DJANGO_CSRF_TRUSTED_ORIGINS")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "mozilla_django_oidc",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "catalog.apps.CatalogConfig",
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

ROOT_URLCONF = "locallibrary.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "locallibrary.wsgi.application"

DATABASES = {
    "default": dj_database_url.config(
        default=f"sqlite:///{BASE_DIR / 'db.sqlite3'}",
        conn_max_age=600,
    ),
}

AUTH_PASSWORD_VALIDATORS = [
    {"NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator"},
    {"NAME": "django.contrib.auth.password_validation.MinimumLengthValidator"},
    {"NAME": "django.contrib.auth.password_validation.CommonPasswordValidator"},
    {"NAME": "django.contrib.auth.password_validation.NumericPasswordValidator"},
]

LANGUAGE_CODE = "en-us"
TIME_ZONE = "UTC"
USE_I18N = True
USE_TZ = True

STATIC_URL = "/static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STORAGES = {
    "default": {"BACKEND": "django.core.files.storage.FileSystemStorage"},
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage"
        if DEBUG
        else "whitenoise.storage.CompressedManifestStaticFilesStorage",
    },
}

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

AUTHENTICATION_BACKENDS = [
    "locallibrary.auth.KeycloakOIDCAuthenticationBackend",
    "django.contrib.auth.backends.ModelBackend",
]

LOGIN_URL = "oidc_authentication_init"
LOGIN_REDIRECT_URL = "/"
LOGOUT_REDIRECT_URL = "/"

OIDC_ISSUER = os.environ.get("OIDC_ISSUER", "http://localhost:8080/auth/realms/p2examples").rstrip("/")
OIDC_OP_AUTHORIZATION_ENDPOINT = f"{OIDC_ISSUER}/protocol/openid-connect/auth"
OIDC_OP_TOKEN_ENDPOINT = f"{OIDC_ISSUER}/protocol/openid-connect/token"
OIDC_OP_USER_ENDPOINT = f"{OIDC_ISSUER}/protocol/openid-connect/userinfo"
OIDC_OP_JWKS_ENDPOINT = f"{OIDC_ISSUER}/protocol/openid-connect/certs"
OIDC_OP_LOGOUT_ENDPOINT = f"{OIDC_ISSUER}/protocol/openid-connect/logout"
OIDC_OP_LOGOUT_URL_METHOD = "locallibrary.auth.keycloak_logout_url"
OIDC_RP_CLIENT_ID = os.environ.get("OIDC_RP_CLIENT_ID", "django")
OIDC_RP_CLIENT_SECRET = os.environ.get("OIDC_RP_CLIENT_SECRET", "")
OIDC_RP_SIGN_ALGO = "RS256"
OIDC_RP_SCOPES = "openid email profile"
OIDC_USE_PKCE = True
OIDC_STORE_ID_TOKEN = True
