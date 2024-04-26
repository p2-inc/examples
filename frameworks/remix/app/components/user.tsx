import { LoginButton, LogoutButton } from "./buttons";

interface User {
  status: boolean;
  user?: {
    name?: string;
    email?: string;
  }
}

export const User = ({ status, user }: User) => {
  let content;

  if (!status) {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
        <LoginButton />
      </div>
    );
  }

  if (status) {
    content = (
      <div>
        <div className="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
        <div className="mb-6 text-p2blue-700 text-md">
          <div>{user?.email}</div>
          <div>{user?.name}</div>
        </div>
        <LogoutButton />
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
