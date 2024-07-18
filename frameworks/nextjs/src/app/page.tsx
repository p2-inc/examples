import { User } from "@/components/user.component";
import { Icon } from "@iconify/react";

export default async function Home() {
  return (
    <div className="page-bg min-h-screen">
      <picture>
        <source media="(max-width: 767px)" srcSet="/home-bg-mobile.webp" />
        <source media="(min-width: 768px)" srcSet="/home-bg.webp" />
        <img
          className="page-home"
          src="/img/home-bg-mobile.webp"
          alt="Gradient Background"
        />
      </picture>
      <div className="px-6 pt-24 pb-8 sm:py-8 lg:pt-24 lg:pb-8 lg:px-8">
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
              Next.js App Example
              <Icon icon="line-md:external-link-rounded" className="ml-1" />
            </p>
          </a>
        </div>
      </div>
      <div className="py-8">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <User />
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
                <Icon icon="line-md:external-link-rounded" className="ml-1" />
              </div>
            </a>
            <a
              href="https://github.com/p2-inc/"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Github
                <Icon icon="bi:github" className="ml-1" />
              </div>
            </a>
            <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Blog
                <Icon icon="line-md:external-link-rounded" className="ml-1" />
              </div>
            </a>
            <a
              href="mailto:support@phasetwo.io"
              target="_blank"
              rel="noreferrer"
            >
              <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80">
                Contact
                <Icon
                  icon="ic:outline-email"
                  className="ml-1"
                  style={{ width: "1.1em", height: "1.1em" }}
                />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
