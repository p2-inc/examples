# oidc-spa tutorial starter

The starting point of the tutorial [Securing Keycloak with OIDC SPA and Phase Two](https://phasetwo.io/blog/keycloak-oidc-spa-phasetwo): a React app (Vite, Tailwind CSS) with the Phase Two example layout and no authentication yet. The finished result is the [oidc-spa example](../oidc-spa).

## Run it

```sh
pnpm install
pnpm dev
```

Then open <http://localhost:3000>. `.env` already points at the hosted Phase Two demo realm; to use the [local Keycloak](../../../keycloak/README.md) instead, run `cp .env.local.sample .env.local`.

## Add login with oidc-spa

1. Install oidc-spa, and zod to describe the ID token:

   ```sh
   pnpm add oidc-spa zod
   ```

2. Create `src/oidc.ts`:

   ```ts
   import { oidcSpa } from "oidc-spa/react-spa";
   import { z } from "zod";

   export const { bootstrapOidc, useOidc, getOidc, OidcInitializationGate } =
     oidcSpa
       .withExpectedDecodedIdTokenShape({
         decodedIdTokenSchema: z.looseObject({
           sub: z.string(),
           name: z.string().optional(),
           email: z.string().optional(),
         }),
       })
       .createUtils();

   bootstrapOidc({
     implementation: "real",
     issuerUri: import.meta.env.VITE_OIDC_ISSUER_URI,
     clientId: import.meta.env.VITE_OIDC_CLIENT_ID,
     scopes: ["profile", "email"],
   });
   ```

3. Add the oidc-spa plugin to `vite.config.ts`, so oidc-spa starts before the app and protects the tokens:

   ```ts
   import { oidcSpa } from "oidc-spa/vite-plugin";

   export default defineConfig({
     plugins: [
       react(),
       tailwindcss(),
       oidcSpa({ browserRuntimeFreeze: { enabled: true } }),
     ],
   });
   ```

4. In `src/App.tsx`, wrap `<Auth />` so it renders once oidc-spa is ready:

   ```tsx
   import { OidcInitializationGate } from "./oidc.ts";

   <OidcInitializationGate>
     <Auth />
   </OidcInitializationGate>;
   ```

5. Replace `src/Auth.tsx`:

   ```tsx
   import { useOidc } from "./oidc.ts";

   export default function Auth() {
     const oidc = useOidc();

     return (
       <div>
         <div className="pb-8 text-xl italic">Your current status is:</div>
         {oidc.isUserLoggedIn ? (
           <>
             <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
             <div className="mb-6 text-p2blue-700">
               {oidc.decodedIdToken.email}
             </div>
             <button onClick={() => oidc.logout({ redirectTo: "home" })}>
               Log out
             </button>
           </>
         ) : (
           <>
             <div className="mb-6 text-2xl text-p2blue-700">
               Not authenticated.
             </div>
             <button onClick={() => oidc.login()}>Log in</button>
           </>
         )}
       </div>
     );
   }
   ```

The [finished example](../oidc-spa) also shows the decoded tokens, a link to the Keycloak account console, a mock mode for working without Keycloak, a `fetchWithAuth` helper for calling APIs, and a warning before an idle session expires.

## Keycloak client

For your own realm, create an OpenID Connect client with client authentication off, the standard flow enabled, `http://localhost:3000/*` as valid redirect URI, and `+` as web origin and as valid post logout redirect URI. Then set `VITE_OIDC_ISSUER_URI` and `VITE_OIDC_CLIENT_ID` in `.env.local`.
