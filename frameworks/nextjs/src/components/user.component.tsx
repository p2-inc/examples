"use client";

import { useSession } from "next-auth/react";
import { LoginButton, LogoutButton } from "./buttons.components";

import { Token } from "./token.component";

export const User = () => {
  const { data: session, status } = useSession();
  console.log("🚀 ~ User ~ session:", session);
  let content;

  if (status === "loading") {
    content = (
      <div className="mb-6 text-p2blue-700 text-2xl">
        Loading authentication... (checking local state or redirecting)
      </div>
    );
  }

  if (status === "unauthenticated") {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
        <LoginButton />
      </div>
    );
  }

  if (status === "authenticated") {
    content = (
      <div>
        <div className="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
        <div className="mb-6 text-p2blue-700 text-md">
          <div>{session.user?.email}</div>
          <div>{session.user?.name}</div>
        </div>
        <LogoutButton />
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
