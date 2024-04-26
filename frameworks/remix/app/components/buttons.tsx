import { Form, Link } from "@remix-run/react";

const classes =
  "rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";

export const LoginButton = () => {
  return (
    <Form action="/auth/keycloak" method="post">
      <button className={classes}>Sign in</button>
    </Form>
  );
};

export const LogoutButton = () => {
  return (
    <Link to="/auth/signout" className={classes}>
      Sign Out
    </Link>
  );
};
