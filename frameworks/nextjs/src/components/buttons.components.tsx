"use client";

import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

const classes =
  "rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export const LoginButton = () => {
  return (
    <button className={classes} onClick={() => signIn("keycloak")}>
      Sign in
    </button>
  );
};

export const RegisterButton = () => {
  return <Link href="/register">Register</Link>;
};

export const LogoutButton = () => {
  return (
    <button className={classes} onClick={() => signOut()}>
      Sign Out
    </button>
  );
};

export const ProfileButton = () => {
  return <Link href="/profile">Profile</Link>;
};
