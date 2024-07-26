import "./App.css";
import { Icon } from "@iconify/react";

import Auth from "./Auth";
import { FooterLinks } from "./components/footer-links.components";

function App() {
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
              className="w-full max-w-xl mx-auto max-h-28"
              alt="Phase Two"
            />
          </a>
          <a
            href="https://github.com/p2-inc/examples/tree/main/frameworks/reactjs"
            target="_blank"
            rel="noreferrer"
          >
            <p className="text-5xl font-semibold leading-7 text-p2blue-500 mt-6 flex items-center w-full justify-center">
              <Icon icon="simple-icons:react" className="mr-2" />
              <Icon icon="bi:github" />
            </p>
          </a>
        </div>
      </div>
      <div className="py-8">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <Auth />
        </div>
      </div>
      <FooterLinks />
    </div>
  );
}

export default App;
