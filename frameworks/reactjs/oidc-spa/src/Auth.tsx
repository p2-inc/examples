import { useOidc } from "./index";
import { Token } from "./components/token.component";

const Auth = () => {
  const { isUserLoggedIn, login, logout, oidcTokens } = useOidc();
  console.log("🚀 ~ Auth ~ oidcTokens:", oidcTokens);

  let content;

  if (isUserLoggedIn) {
    content = (
      <div>
        <div className="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
        <div className="mb-6 text-p2blue-700 text-md">
          <div>{oidcTokens.decodedIdToken?.email as string}</div>
          <div>{oidcTokens.decodedIdToken?.sub as string}</div>
        </div>
        <button
          className="rounded-md bg-indigo-500 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
          onClick={() => logout({ redirectTo: "current page" })}
        >
          Log out
        </button>
        <Token />
      </div>
    );
  } else {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
        <button
          className="rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={() => login({ doesCurrentHrefRequiresAuth: true })}
        >
          Log in
        </button>
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
