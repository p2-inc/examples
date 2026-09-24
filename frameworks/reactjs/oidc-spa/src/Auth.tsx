import { createKeycloakUtils, isKeycloak } from "oidc-spa/keycloak";
import type { ReactNode } from "react";
import { Token } from "./components/token.component.tsx";
import { useOidc } from "./oidc.ts";

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
const secondaryButtonClasses =
  "rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-indigo-600 shadow-xs ring-1 ring-indigo-600 ring-inset hover:bg-indigo-50";

export default function Auth() {
  const oidc = useOidc();

  let content: ReactNode;
  if (oidc.isUserLoggedIn) {
    const { decodedIdToken, issuerUri, clientId, validRedirectUri } = oidc;
    const accountUrl = isKeycloak({ issuerUri })
      ? createKeycloakUtils({ issuerUri }).getAccountUrl({
          clientId,
          validRedirectUri,
        })
      : undefined;

    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
        <div className="mb-6 text-p2blue-700">
          <div>{decodedIdToken.name}</div>
          <div>{decodedIdToken.email}</div>
        </div>
        <div className="flex justify-center gap-3">
          <button
            className={buttonClasses}
            onClick={() => oidc.logout({ redirectTo: "home" })}
          >
            Log out
          </button>
          {accountUrl && (
            <a className={secondaryButtonClasses} href={accountUrl}>
              Manage account
            </a>
          )}
        </div>
        <Token />
      </>
    );
  } else if (oidc.initializationError) {
    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">
          Authentication error.
        </div>
        <div className="mb-6">{oidc.initializationError.message}</div>
        <button className={buttonClasses} onClick={() => oidc.login()}>
          Log in
        </button>
      </>
    );
  } else {
    content = (
      <>
        <div className="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
        <button className={buttonClasses} onClick={() => oidc.login()}>
          Log in
        </button>
      </>
    );
  }

  return (
    <div>
      <div className="pb-8 text-xl italic">Your current status is:</div>
      {content}
    </div>
  );
}
