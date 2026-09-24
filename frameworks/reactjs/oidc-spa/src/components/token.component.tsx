import { decodeJwt } from "oidc-spa/decode-jwt";
import { useEffect, useState } from "react";
import { getOidc, useOidc } from "../oidc.ts";

const textareaClasses =
  "block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset";

function decode(token: string | undefined) {
  if (!token) {
    return "";
  }
  try {
    return JSON.stringify(decodeJwt(token), null, 2);
  } catch {
    return token;
  }
}

export function Token() {
  const { decodedIdToken } = useOidc({ assert: "user logged in" });
  const [accessToken, setAccessToken] = useState<string>();

  useEffect(() => {
    let active = true;
    let unsubscribe = () => {};

    void getOidc({ assert: "user logged in" }).then(async (oidc) => {
      const token = await oidc.getAccessToken();
      if (!active) {
        return;
      }
      setAccessToken(token);
      unsubscribe =
        oidc.subscribeToAccessTokenRotation(
          setAccessToken,
        ).unsubscribeFromAccessTokenRotation;
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, []);

  return (
    <div className="mt-8 space-y-4 text-left">
      <div>
        <label
          htmlFor="access-token"
          className="mb-1 block text-sm font-semibold text-gray-900"
        >
          Access token (decoded)
        </label>
        <textarea
          id="access-token"
          rows={12}
          readOnly
          className={textareaClasses}
          value={decode(accessToken)}
        />
      </div>
      <div>
        <label
          htmlFor="id-token"
          className="mb-1 block text-sm font-semibold text-gray-900"
        >
          ID token (decoded)
        </label>
        <textarea
          id="id-token"
          rows={12}
          readOnly
          className={textareaClasses}
          value={JSON.stringify(decodedIdToken, null, 2)}
        />
      </div>
    </div>
  );
}
