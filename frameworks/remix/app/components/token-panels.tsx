const textareaClasses =
  "block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset";

export function TokenPanels({
  accessTokenClaims,
  idTokenClaims,
}: {
  accessTokenClaims: Record<string, unknown>;
  idTokenClaims: Record<string, unknown>;
}) {
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
          value={JSON.stringify(accessTokenClaims, null, 2)}
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
          value={JSON.stringify(idTokenClaims, null, 2)}
        />
      </div>
    </div>
  );
}
