import type { ReactNode } from "react";
import { useAuth } from "react-oidc-context";
import { Token } from "./components/token.component.tsx";

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export default function Auth() {
  const auth = useAuth();

  let content: ReactNode;
  if (auth.error) {
    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">
          Authentication error.
        </div>
        <div className="mb-6">{auth.error.message}</div>
        <button
          className={buttonClasses}
          onClick={() => void auth.signinRedirect()}
        >
          Log in
        </button>
      </>
    );
  } else if (
    auth.isLoading ||
    auth.activeNavigator === "signinRedirect" ||
    auth.activeNavigator === "signoutRedirect"
  ) {
    content = (
      <div className="mb-6 text-2xl text-p2blue-700">
        Loading authentication…
      </div>
    );
  } else if (auth.isAuthenticated) {
    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
        <div className="mb-6 text-p2blue-700">
          <div>{auth.user?.profile.name}</div>
          <div>{auth.user?.profile.email}</div>
        </div>
        <button
          className={buttonClasses}
          onClick={() => void auth.signoutRedirect()}
        >
          Log out
        </button>
        <Token />
      </>
    );
  } else {
    content = (
      <>
        <div className="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
        <button
          className={buttonClasses}
          onClick={() => void auth.signinRedirect()}
        >
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
