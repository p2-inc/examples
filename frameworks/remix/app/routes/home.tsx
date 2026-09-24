import { FooterLinks } from "~/components/footer-links";
import { GithubIcon, ReactRouterIcon } from "~/components/icons";
import { UserStatus } from "~/components/user-status";
import { decodeJwtPayload } from "~/jwt.server";
import { getSession } from "~/sessions.server";
import type { Route } from "./+types/home";

const exampleUrl =
  "https://github.com/p2-inc/examples/tree/main/frameworks/remix";

export function meta() {
  return [
    { title: "Phase Two · React Router + remix-auth" },
    {
      name: "description",
      content: "Keycloak login for a React Router app with remix-auth",
    },
  ];
}

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request);
  const idToken = session.get("idToken");

  if (!idToken) {
    return { user: null };
  }

  return {
    user: {
      idTokenClaims: decodeJwtPayload(idToken),
      accessTokenClaims: session.get("accessTokenClaims") ?? {},
    },
  };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <div className="page-bg min-h-screen">
      <picture>
        <source media="(max-width: 767px)" srcSet="/home-bg-mobile.webp" />
        <source media="(min-width: 768px)" srcSet="/home-bg.webp" />
        <img className="page-home" src="/home-bg-mobile.webp" alt="" />
      </picture>
      <header className="px-6 pt-24 pb-8 sm:py-8 lg:px-8 lg:pt-24 lg:pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
            <img
              src="/logo_phase_slash.svg"
              className="mx-auto max-h-28 w-full max-w-xl"
              alt="Phase Two"
            />
          </a>
          <a
            href={exampleUrl}
            target="_blank"
            rel="noreferrer"
            aria-label="Source code on GitHub"
            className="mt-6 flex items-center justify-center gap-2 text-5xl text-p2blue-500"
          >
            <ReactRouterIcon />
            <GithubIcon />
          </a>
          <p className="mt-4 text-lg text-p2blue-700">
            React Router · remix-auth
          </p>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <UserStatus user={loaderData.user} />
        </div>
      </main>
      <FooterLinks />
    </div>
  );
}
