import type { Session } from "next-auth";
import type { ReactNode } from "react";
import { LoginButton, LogoutButton } from "./buttons.components";
import { Token } from "./token.component";

export function User({ session }: { session: Session | null }) {
  let content: ReactNode;
  if (session?.error) {
    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">
          Authentication error.
        </div>
        <div className="mb-6">Your session expired. Please log in again.</div>
        <LoginButton />
      </>
    );
  } else if (session) {
    content = (
      <>
        <div className="mb-2 text-2xl text-p2blue-700">Authenticated</div>
        <div className="mb-6 text-p2blue-700">
          <div>{session.user?.name}</div>
          <div>{session.user?.email}</div>
        </div>
        <LogoutButton />
        <Token session={session} />
      </>
    );
  } else {
    content = (
      <>
        <div className="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
        <LoginButton />
      </>
    );
  }

  return (
    <div>
      <div className="pb-8 text-xl italic">Your current status is:</div>
      {content}
    </div>
  );
}
