import type { ReactNode } from 'react';
import homeBgMobile from '../assets/home-bg-mobile.webp';
import homeBg from '../assets/home-bg.webp';
import logo from '../assets/logo_phase_slash.svg';
import { FooterLinks } from './footer-links';
import { GithubIcon, ReactIcon } from './icons';

const exampleUrl = 'https://github.com/p2-inc/examples/tree/main/multitenant';

export function AppLayout({
  appName,
  children,
}: {
  appName: string;
  children: ReactNode;
}) {
  return (
    <div className="page-bg min-h-screen">
      <picture>
        <source media="(max-width: 767px)" srcSet={homeBgMobile} />
        <source media="(min-width: 768px)" srcSet={homeBg} />
        <img className="page-home" src={homeBgMobile} alt="" />
      </picture>
      <header className="px-6 pt-24 pb-8 sm:py-8 lg:px-8 lg:pt-24 lg:pb-8">
        <div className="mx-auto max-w-2xl text-center">
          <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
            <img
              src={logo}
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
          <h1 className="mt-4 text-3xl font-semibold text-p2blue-700">
            {appName}
          </h1>
          <p className="mt-1 text-lg text-p2blue-700">
            Multitenant · React · oidc-spa
          </p>
        </div>
      </header>
      <main className="py-8">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          {children}
        </div>
      </main>
      <FooterLinks />
    </div>
  );
}
