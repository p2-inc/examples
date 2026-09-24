"use client";

import { signIn, signOut } from "next-auth/react";

const buttonClasses =
  "cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export function LoginButton() {
  return (
    <button className={buttonClasses} onClick={() => signIn("keycloak")}>
      Log in
    </button>
  );
}

export function LogoutButton() {
  return (
    <button
      className={buttonClasses}
      onClick={() => signOut({ callbackUrl: "/" })}
    >
      Log out
    </button>
  );
}
