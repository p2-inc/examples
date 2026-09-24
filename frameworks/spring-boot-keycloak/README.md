# Phase Two Spring Boot example: resource server + Angular client

A Spring Boot API secured with Keycloak, and an Angular single-page app that logs users in and calls it with their access token. Follow along with the tutorial [Securing an Angular and Spring Boot Application with Keycloak](https://phasetwo.io/blog/secure-spring-boot/).

## How it works

```text
  Angular client (localhost:4200)                   Keycloak (localhost:8888)
  ┌──────────────────────────────┐  1. log in       ┌──────────────────────────┐
  │ angular-oauth2-oidc          │ ───────────────▶ │ realm demo-realm         │
  │ code flow + PKCE             │ ◀─────────────── │ client demo-spa          │
  └──────────────────────────────┘  access token    └──────────────────────────┘
                 │                                                ▲
                 │ 2. GET /api/test/user                          │ 3. signing keys
                 │    Authorization: Bearer <access token>        │
                 ▼                                                │
  ┌────────────────────────────────────────────────────────────────────────────┐
  │ Spring Boot API (localhost:8080): OAuth 2.0 resource server                │
  └────────────────────────────────────────────────────────────────────────────┘
```

1. The [Angular client](./angularclient) logs the user in with the authorization code flow and PKCE. Tokens stay in the browser's session storage and are refreshed before they expire.
2. It sends the access token as a bearer token, only on requests to the API.
3. The API validates the token (signature, issuer, expiry) with the realm's public keys, then maps the realm roles from the `realm_access.roles` claim to Spring Security roles: the Keycloak role `user` becomes `ROLE_user`.

| Endpoint                  | Who can call it                            | Response                                                                    |
| ------------------------- | ------------------------------------------ | --------------------------------------------------------------------------- |
| `GET /api/test/anonymous` | everyone                                   | `{"message":"Hello Anonymous"}`                                             |
| `GET /api/test/user`      | an access token with the realm role `user` | `{"message":"Hello Secured with user role.","user":"<preferred_username>"}` |

Without a token, `/api/test/user` answers `401 Unauthorized`; with a token that lacks the `user` role, `403 Forbidden`. Any other path is denied, except `/.well-known/oauth-protected-resource`, where Spring Security publishes the API's [OAuth 2.0 protected resource metadata](https://datatracker.ietf.org/doc/html/rfc9728).

| File                                                                                                       | What it does                                                                        |
| ---------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------- |
| [`SecurityConfig.java`](./src/main/java/com/example/springbootkeycloak/config/SecurityConfig.java)         | Stateless resource server, the paths that need a token, CORS for the Angular client |
| [`JwtClaimsConverter.java`](./src/main/java/com/example/springbootkeycloak/config/JwtClaimsConverter.java) | Realm roles to `ROLE_*` authorities, `preferred_username` as the user name          |
| [`TestController.java`](./src/main/java/com/example/springbootkeycloak/web/TestController.java)            | The two endpoints; `@PreAuthorize("hasRole('user')")` guards `/api/test/user`       |
| [`application.yaml`](./src/main/resources/application.yaml)                                                | Keycloak issuer and allowed CORS origins                                            |
| [`keycloak/demo-realm-realm.json`](./keycloak/demo-realm-realm.json)                                       | The realm Keycloak imports at startup                                               |

## Requirements

- Java 17 or newer to run Gradle. The build compiles with a Java 21 toolchain, which Gradle downloads if you do not have one.
- Node.js 24 and pnpm, for the Angular client.
- Docker with the Compose plugin.

## Run it

1. Start Keycloak on port 8888, from this folder:

   ```sh
   docker compose up -d --wait
   ```

   Keycloak imports [`keycloak/demo-realm-realm.json`](./keycloak/demo-realm-realm.json) (the file name follows Keycloak's `<realm>-realm.json` export convention):

   | What          | Value                                                                                       |
   | ------------- | ------------------------------------------------------------------------------------------- |
   | Issuer        | `http://localhost:8888/auth/realms/demo-realm`                                              |
   | Admin console | <http://localhost:8888/auth/admin>, `admin` / `admin`                                       |
   | Users         | `test` / `test` has the realm role `user`; `noaccess` / `noaccess` does not                 |
   | Client        | `demo-spa`: public, standard flow with PKCE (S256), redirect URIs `http://localhost:4200/*` |

   Nothing is persisted: `docker compose down` followed by `docker compose up -d --wait` gives you a fresh realm.

2. Start the API on port 8080:

   ```sh
   ./gradlew bootRun
   ```

3. Start the Angular client on port 4200, in another terminal:

   ```sh
   cd angularclient
   pnpm install
   pnpm start
   ```

Open <http://localhost:4200>. Call both endpoints while logged out, then log in as `test` and call `/api/test/user` again. Log out, log in as `noaccess` and the same call returns `403 Forbidden`. The protected page (`/protected`) shows how an Angular route guard sends users to Keycloak before they can open a page.

## Call the API with curl

The public endpoint needs no token:

```sh
curl http://localhost:8080/api/test/anonymous
```

The `user` endpoint needs an access token. The `demo-spa` client only allows the browser login flow, so take the token from the Angular client: log in, open the browser's developer console and run `sessionStorage.getItem('access_token')`. Then:

```sh
ACCESS_TOKEN='paste the access token here'

curl -i http://localhost:8080/api/test/user
curl -H "Authorization: Bearer $ACCESS_TOKEN" http://localhost:8080/api/test/user
```

The first call returns `401`, the second `{"message":"Hello Secured with user role.","user":"test"}` (or `403` with the `noaccess` user's token). Access tokens expire after 5 minutes.

## Configuration

The API reads these settings from [`application.yaml`](./src/main/resources/application.yaml); the environment variables override them.

| Property                                               | Environment variable   | Default                                        | Description                                                                                                                        |
| ------------------------------------------------------ | ---------------------- | ---------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `spring.security.oauth2.resourceserver.jwt.issuer-uri` | `KEYCLOAK_ISSUER_URI`  | `http://localhost:8888/auth/realms/demo-realm` | URL of the Keycloak realm. On the first request the API reads the realm's signing keys from it. Tokens must have this exact `iss`. |
| `app.cors.allowed-origins`                             | `CORS_ALLOWED_ORIGINS` | `http://localhost:4200`                        | Comma-separated origins allowed to call the API from a browser                                                                     |
| `server.port`                                          | `SERVER_PORT`          | `8080`                                         | Port of the API                                                                                                                    |

For example: `KEYCLOAK_ISSUER_URI=https://keycloak.example.com/auth/realms/myrealm ./gradlew bootRun`.

The Angular client's settings (issuer, client ID and API URL) are in [`angularclient/src/environments/environment.ts`](./angularclient/src/environments/environment.ts).

## Use your own Keycloak realm

1. Create a realm role `user`.
2. Create an OpenID Connect client, for example `demo-spa`, with client authentication off and only the standard flow enabled. Set `http://localhost:4200/*` as valid redirect URI, and `+` as valid post logout redirect URI and as web origin. In the client's advanced settings, set the PKCE method to `S256`.
3. Create a user with a password, an email, a first name and a last name, and assign it the `user` role.
4. Point the API at the realm with `KEYCLOAK_ISSUER_URI`, and the Angular client with `issuer` and `clientId` in `environment.ts`.

## Build and test

```sh
./gradlew build
```

It compiles the API and runs its tests, none of which need Keycloak:

- [`TestControllerTests`](./src/test/java/com/example/springbootkeycloak/web/TestControllerTests.java) calls the endpoints through the security filter chain: public endpoint, `401` without a token, `403` without the `user` role, `200` with it, CORS for the Angular client.
- [`JwtClaimsConverterTests`](./src/test/java/com/example/springbootkeycloak/config/JwtClaimsConverterTests.java) checks the role mapping.

`./gradlew bootJar` builds `build/libs/spring-boot-keycloak-0.0.1-SNAPSHOT.jar`, which runs with `java -jar`. For the Angular client, see [its README](./angularclient/README.md).
