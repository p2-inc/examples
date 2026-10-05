import Auth from "./Auth.tsx";
import { AutoLogoutWarningOverlay } from "./components/auto-logout-warning-overlay.tsx";
import { FooterLinks } from "./components/footer-links.components.tsx";
import { GithubIcon, ReactIcon } from "./components/icons.tsx";
import { OidcInitializationGate } from "./oidc.ts";

const exampleUrl =
  "https://github.com/p2-inc/examples/tree/main/frameworks/reactjs/oidc-spa";

export default function App() {
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
            <ReactIcon />
            <GithubIcon />
          </a>
          <p className="mt-4 text-lg text-p2blue-700">React · oidc-spa</p>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <OidcInitializationGate
            fallback={
              <div>
                <div className="pb-8 text-xl italic">
                  Your current status is:
                </div>
                <div className="mb-6 text-2xl text-p2blue-700">
                  Loading authentication…
                </div>
              </div>
            }
          >
            <Auth />
            <AutoLogoutWarningOverlay />
          </OidcInitializationGate>
        </div>
      </main>
      <FooterLinks />
    </div>
  );
}
