import { User as UserType } from "~/services/auth.server";
import { LoginButton, LogoutButton } from "./buttons";

interface UserArgs {
  status: boolean;
  user?: UserType;
}

const TextAreaClasses =
  "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50";

export const User = ({ status, user }: UserArgs) => {
  let content;

  if (!status) {
    content = (
      <div>
        <div className="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
        <LoginButton />
      </div>
    );
  }

  if (status && user) {
    const profile = user.__json;
    content = (
      <div>
        <div className="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
        <div className="mb-6 text-p2blue-700 text-md">
          <div>{profile?.email}</div>
          <div>{profile?.name}</div>
        </div>
        <LogoutButton />
        <div className="mt-4 text-left">
          <div className="mt-2">
            <label
              htmlFor="userData"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Remix Session User Data
            </label>

            <textarea
              rows={6}
              name="userData"
              id="userData"
              className={TextAreaClasses}
              defaultValue={JSON.stringify(user, null, 2)}
            ></textarea>
          </div>
        </div>
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
