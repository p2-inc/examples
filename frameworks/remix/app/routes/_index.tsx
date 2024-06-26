import { User } from "~/components/user";
import { useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { LoaderFunctionArgs, json } from "@remix-run/node";

export async function loader({ request }: LoaderFunctionArgs) {
  const user = await authenticator.isAuthenticated(request);
  return json(user);
}

export default function Index() {
  const authenticatedUser = useLoaderData<typeof loader>();
  return (
    <div className="page-bg min-h-screen">
      <picture>
        <source media="(max-width: 767px)" srcSet="/home-bg-mobile.jpg" />
        <source media="(min-width: 768px)" srcSet="/home-bg.jpg" />
        <img
          className="page-home"
          src="/img/home-bg-mobile.jpg"
          alt="Gradient Background"
        />
      </picture>
      <div className="px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
            <img
              src="/logo_phase_slash.svg"
              className="w-full max-w-xl mx-auto"
              alt="Phase Two"
            />
          </a>
          <a
            href="https://github.com/p2-inc/examples/tree/main/frameworks/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-xl font-semibold leading-7 text-p2blue-500 mt-6">
              Remix App Example
            </p>
          </a>
        </div>
      </div>
      <div className="py-12">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <User
            status={Boolean(authenticatedUser)}
            user={authenticatedUser?.__json}
          />
        </div>
      </div>
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
            <a
              href="https://phasetwo.io/docs/introduction"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Docs
              </div>
            </a>
            <a
              href="https://github.com/p2-inc/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Github
              </div>
            </a>
            <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Blog
              </div>
            </a>
            <a
              href="mailto:support@phasetwo.io"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Contact
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
