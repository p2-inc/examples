import { jwtDecode } from "jwt-decode";
import { useOidc } from "../index";

const TextAreaClasses =
  "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50";

function stringifyToken(token: any) {
  return JSON.stringify(jwtDecode(token), null, 2);
}

export const Token = () => {
  const { isUserLoggedIn, oidcTokens } = useOidc();

  if (!isUserLoggedIn) {
    return null;
  }

  if (isUserLoggedIn) {
    return (
      <div className="mt-4 text-left">
        <div className="mt-2">
          <label
            htmlFor="accessToken"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Access Token
          </label>

          <textarea
            rows={6}
            name="accessToken"
            id="accessToken"
            className={TextAreaClasses}
            defaultValue={stringifyToken(oidcTokens.accessToken)}
          ></textarea>
        </div>
        <div className="mt-2">
          <label
            htmlFor="idToken"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Id Token
          </label>

          <textarea
            rows={6}
            name="idToken"
            id="idToken"
            className={TextAreaClasses}
            defaultValue={stringifyToken(oidcTokens.idToken)}
          ></textarea>
        </div>
        <div className="mt-2">
          <label
            htmlFor="refreshToken"
            className="block text-sm font-semibold leading-6 text-gray-900"
          >
            Refresh Token
          </label>

          <textarea
            rows={6}
            name="refreshToken"
            id="refreshToken"
            className={TextAreaClasses}
            defaultValue={stringifyToken(oidcTokens.refreshToken)}
          ></textarea>
        </div>
      </div>
    );
  }

  return null;
};
