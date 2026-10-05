# e2e smoke test

A single Playwright test that logs in and out of any example through Keycloak. It relies on the shared UI of the examples: the "Not authenticated." / "Authenticated" status, the "Log in" / "Log out" buttons and a decoded token panel.

```sh
pnpm install
pnpm install-browser            # first time only: downloads Chromium

# with the local Keycloak running and an example started on its dev port
APP_URL=http://localhost:3000 KC_USERNAME=demo KC_PASSWORD=demo pnpm test
```

| Variable      | Default                 |
| ------------- | ----------------------- |
| `APP_URL`     | `http://localhost:3000` |
| `KC_USERNAME` | `demo`                  |
| `KC_PASSWORD` | `demo`                  |
