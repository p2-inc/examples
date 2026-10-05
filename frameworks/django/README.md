# Phase Two Django example: mozilla-django-oidc

A Django site that logs users in with Keycloak using the OpenID Connect authorization code flow with PKCE, through [mozilla-django-oidc](https://mozilla-django-oidc.readthedocs.io/en/stable/). It is the code for the tutorial [Django Web Authentication with Keycloak](https://phasetwo.io/blog/secure-django/).

The site is MDN's Local Library tutorial app: a catalog of books and authors, where logged-in users see the books they borrowed and librarians renew loans. The Keycloak integration lives in a few files:

- [locallibrary/settings.py](./locallibrary/settings.py) reads the configuration from the environment and sets up mozilla-django-oidc: the Keycloak endpoints (derived from `OIDC_ISSUER`), the client ID and secret, PKCE, and `LOGIN_URL = "oidc_authentication_init"`, so pages that need a login send the user to Keycloak.
- [locallibrary/auth.py](./locallibrary/auth.py) has `KeycloakOIDCAuthenticationBackend`, which creates and updates Django users from Keycloak's claims, and `keycloak_logout_url`, which makes logging out end the Keycloak session too.
- [locallibrary/urls.py](./locallibrary/urls.py) mounts mozilla-django-oidc's views under `/oidc/`: `authenticate/`, `callback/` and `logout/`.
- [catalog/templates/base_generic.html](./catalog/templates/base_generic.html) has the Login link and the Logout button, a form that posts to `/oidc/logout/`.

## How it works

Views protected with `LoginRequiredMixin`, `PermissionRequiredMixin` or `@login_required` redirect anonymous users to `/oidc/authenticate/`, which redirects to Keycloak. After the user logs in, Keycloak redirects back to `/oidc/callback/`. The backend exchanges the authorization code for tokens (sending the client secret and the PKCE code verifier), checks the ID token's signature against Keycloak's keys, reads the user's claims from the userinfo endpoint and logs in the matching Django user. Tokens stay on the server: the ID token is kept in the Django session, and nothing is stored in the browser but the session cookie.

Django users are matched to Keycloak users by username (the `preferred_username` claim). The user is created on their first login, with no Django password, and their email, first name and last name are copied from Keycloak on every login. A Keycloak user logs in to the Django account with the same username, including one created with `createsuperuser`.

Logging out posts to `/oidc/logout/`, which calls `keycloak_logout_url` before ending the Django session. It redirects to Keycloak's end-session endpoint with the ID token as `id_token_hint`, so Keycloak ends its session without asking for confirmation and then redirects back to `LOGOUT_REDIRECT_URL`. A user who logged in without Keycloak, for example through the admin login form, only has their Django session ended.

Django's own `ModelBackend` stays enabled after the Keycloak backend, so the admin site at `/admin/` accepts local accounts created with `createsuperuser`, and the tests can log in with `client.login`. Django's `/accounts/` login and password reset pages are not used: Keycloak handles logins and password resets.

## Configuration

| Variable                      | Description                                                         | Default                                                   |
| ----------------------------- | ------------------------------------------------------------------- | --------------------------------------------------------- |
| `OIDC_ISSUER`                 | URL of your Keycloak realm                                          | `http://localhost:8080/auth/realms/p2examples`            |
| `OIDC_RP_CLIENT_ID`           | Client ID of a confidential Keycloak client                         | `django`                                                  |
| `OIDC_RP_CLIENT_SECRET`       | Secret of that client                                               | none                                                      |
| `DJANGO_DEBUG`                | `True` for local development                                        | `False`                                                   |
| `DJANGO_SECRET_KEY`           | Django's secret key, required unless `DJANGO_DEBUG` is `True`       | an insecure development key when `DJANGO_DEBUG` is `True` |
| `DJANGO_ALLOWED_HOSTS`        | Comma-separated host names the site answers to                      | `localhost,127.0.0.1`                                     |
| `DJANGO_CSRF_TRUSTED_ORIGINS` | Comma-separated origins trusted for HTTPS form posts                | none                                                      |
| `DATABASE_URL`                | Database URL, for example `postgres://user:password@host:5432/name` | SQLite, in `db.sqlite3`                                   |

The settings read these from the environment and from a `.env` file next to `manage.py`, if there is one. Variables that are already set in the environment take precedence over `.env`. The Keycloak endpoints are derived from `OIDC_ISSUER`, using Keycloak's paths `/protocol/openid-connect/auth`, `/token`, `/userinfo`, `/certs` and `/logout`.

[`.env.example`](./.env.example) has the values for the local Keycloak.

## Keycloak

To use the [local Keycloak](../../keycloak/README.md), start it from the repository root:

```sh
docker compose -f keycloak/docker-compose.yml up -d --wait
```

Its `p2examples` realm has a confidential `django` client and the user `demo` / `demo`. Then, in `frameworks/django`:

```sh
cp .env.example .env
```

For your own realm, create an OpenID Connect client with client authentication on, the standard flow enabled, `http://localhost:8000/*` as valid redirect URI and `+` as valid post logout redirect URI. Keep Keycloak's default `profile` and `email` client scopes, which provide the username, name and email claims. Put the client ID, the client secret from the client's Credentials tab, and your realm's URL (for example `https://<your-keycloak>/auth/realms/<your-realm>`) in `.env`.

## Run it

You need Python 3.14, the version in [`.python-version`](./.python-version) that CI uses. The pinned dependencies support Python 3.10 and newer.

```sh
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver 8000
```

On Windows, activate the virtual environment with `.venv\Scripts\activate`. Then open <http://localhost:8000>, click Login and log in as `demo` / `demo`.

The admin site is at <http://localhost:8000/admin/>. To use it, create a local account with `python manage.py createsuperuser`. A Keycloak user can also use it once a superuser has given them staff status there.

## Tests

```sh
python manage.py test
```

The tests don't need Keycloak. They log in with Django's `ModelBackend`, check that protected pages redirect to the OIDC login URL, and test the Keycloak backend and logout URL with sample claims.

When `DJANGO_DEBUG` is off, as in CI, run `python manage.py collectstatic --noinput` first. Static files then use WhiteNoise's `CompressedManifestStaticFilesStorage`, which serves files under hashed names listed in a manifest that `collectstatic` writes, so templates can't render until it has run. With `DJANGO_DEBUG=True`, the settings use `CompressedStaticFilesStorage` instead, which needs no manifest, so `runserver` and the tests work without `collectstatic`.

The [GitHub workflow](../../.github/workflows/django.yml) runs `check`, `makemigrations --check`, `collectstatic` and `test`.

## Deploy

The [Procfile](./Procfile), for Railway or Heroku, runs the migrations, collects the static files and starts gunicorn. Set `DJANGO_SECRET_KEY`, `DJANGO_ALLOWED_HOSTS`, `DJANGO_CSRF_TRUSTED_ORIGINS`, `DATABASE_URL` and the `OIDC_*` variables, and add the site's URL (for example `https://library.example.com/*`) to the client's valid redirect URIs.

Behind a proxy that terminates TLS, as on Railway and Heroku, also set Django's `SECURE_PROXY_SSL_HEADER`, so that the redirect URI sent to Keycloak starts with `https`. `python manage.py check --deploy` and Django's [deployment checklist](https://docs.djangoproject.com/en/5.2/howto/deployment/checklist/) list the other production settings.

## Credits

The Local Library app comes from MDN's [django-locallibrary-tutorial](https://github.com/mdn/django-locallibrary-tutorial), the code of the [MDN Django tutorial](https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Server-side/Django/Tutorial_local_library_website). It is dedicated to the public domain under CC0; see [LICENSE](./LICENSE).
