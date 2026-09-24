import { useOidc } from "../oidc.ts";

export function AutoLogoutWarningOverlay() {
  const { autoLogoutState } = useOidc();

  if (!autoLogoutState.shouldDisplayWarning) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 backdrop-blur">
      <div
        role="alertdialog"
        aria-live="assertive"
        aria-modal="true"
        className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl"
      >
        <p className="text-sm font-medium text-gray-900">
          Are you still there?
        </p>
        <p className="text-sm text-gray-600">
          Click anywhere to stay logged in.
        </p>
        <p className="mt-2 text-lg font-semibold text-p2blue-700">
          You will be logged out in{" "}
          {autoLogoutState.secondsLeftBeforeAutoLogout}s
        </p>
      </div>
    </div>
  );
}
