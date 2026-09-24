import { Form } from "react-router";
import { TokenPanels } from "./token-panels";

type User = {
  idTokenClaims: Record<string, unknown>;
  accessTokenClaims: Record<string, unknown>;
};

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export function UserStatus({ user }: { user: User | null }) {
  return (
    <div>
      <div className="pb-8 text-xl italic">Your current status is:</div>
      {user ? (
        <>
          <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
          <div className="mb-6 text-p2blue-700">
            <div>{String(user.idTokenClaims.name ?? "")}</div>
            <div>{String(user.idTokenClaims.email ?? "")}</div>
          </div>
          <Form method="post" action="/logout" reloadDocument>
            <button type="submit" className={buttonClasses}>
              Log out
            </button>
          </Form>
          <TokenPanels
            accessTokenClaims={user.accessTokenClaims}
            idTokenClaims={user.idTokenClaims}
          />
        </>
      ) : (
        <>
          <div className="mb-6 text-2xl text-p2blue-700">
            Not authenticated.
          </div>
          <Form method="post" action="/auth/keycloak" reloadDocument>
            <button type="submit" className={buttonClasses}>
              Log in
            </button>
          </Form>
        </>
      )}
    </div>
  );
}
