import { useAuth } from "react-oidc-context";
import { Token } from "./components/token.component";

const Auth = () => {
  const auth = useAuth();
  let content;

  switch (auth.activeNavigator) {
    case "signinSilent":
      content = (
        <div className="mb-6 text-p2blue-700 text-2xl">Signing you in...</div>
      );
      break;
    case "signoutRedirect":
      content = (
        <div className="mb-6 text-p2blue-700 text-2xl">Signing you out...</div>
      );
      break;
  }

  if (auth.isLoading) {
    content = (
      <div className="mb-6 text-p2blue-700 text-2xl">
        Loading authentication... (checking local state or redirecting)
      </div>
    );
  } else if (!auth.isAuthenticated) {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
        <button
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => void auth.signinRedirect({})}
        >
          Log in
        </button>
      </div>
    );
  } else if (auth.error) {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">
          Authentication Error.
        </div>
        <div>{auth.error.message}</div>
      </div>
    );
  } else if (auth.isAuthenticated) {
    content = (
      <div>
        <div className="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
        <div className="mb-6 text-p2blue-700 text-md">
          <div>{auth.user?.profile.email}</div>
          <div>{auth.user?.profile.sub}</div>
        </div>
        <button
          className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => void auth.removeUser()}
        >
          Log out
        </button>
        <Token />
      </div>
    );
  }

  return (
    <div>
      <div className="text-xl pb-8 italic">Your current status is:</div>
      {content}
    </div>
  );
};

export default Auth;
