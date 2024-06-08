import { useSession } from "next-auth/react";
import jwt from "jsonwebtoken";
import { ExtendedSession } from "@/app/api/auth/[...nextauth]/route";

export const Token = () => {
  const { data: session, status } = useSession();
  const extendedSession = session as ExtendedSession | null;

  if (status === "loading" || status === "unauthenticated") {
    return null;
  }

  if (status === "authenticated") {
    return (
      <div className="mt-4 text-left">
        <div className="mt-2">
          <label
            htmlFor="accessToken"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Access Token
          </label>

          <textarea
            rows={6}
            name="accessToken"
            id="accessToken"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={JSON.stringify(
              jwt.decode(extendedSession?.accessToken ?? "", { complete: true })
                ?.payload,
              null,
              2
            )}
          ></textarea>
        </div>
        <div className="mt-2">
          <label
            htmlFor="idToken"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Id Token
          </label>

          <textarea
            rows={6}
            name="idToken"
            id="idToken"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {JSON.stringify(
              //@ts-ignore
              jwt.decode(extendedSession?.idToken ?? "", { complete: true })
                ?.payload,
              null,
              2
            )}
          </textarea>
        </div>
        <div className="mt-2">
          <label
            htmlFor="refreshToken"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Refresh Token
          </label>

          <textarea
            rows={6}
            name="refreshToken"
            id="refreshToken"
            className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
          >
            {JSON.stringify(
              //@ts-ignore
              jwt.decode(extendedSession?.refreshToken ?? "", {
                complete: true,
              })?.payload,
              null,
              2
            )}
          </textarea>
        </div>
      </div>
    );
  }
};
