import { Icon } from '@iconify/react';
import { FooterLinks } from './footer-links';

import homeBgMobile from '../assets/home-bg-mobile.webp';
import homeBg from '../assets/home-bg.webp';
import Logo from '../assets/logo_phase_slash.svg';

export function AppLayout({
  Auth,
  appName,
  appTenant,
}: {
  Auth: React.ComponentType;
  appName: string;
  appTenant: string;
}) {
  return (
    <div className="bg-top bg-no-repeat bg-cover min-h-screen">
      <picture>
        <source media="(max-width: 767px)" srcSet={homeBgMobile} />
        <source media="(min-width: 768px)" srcSet={homeBg} />
        <img
          className="page-home absolute left-0 top-0 w-screen h-screen -z-10 md:left-1/2 md:transform md:-translate-x-1/2"
          src={homeBgMobile}
          alt="Gradient Background"
        />
      </picture>
      <div className="px-6 pt-24 pb-8 sm:py-8 lg:pt-24 lg:pb-8 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <a href="https://phasetwo.io" target="_blank" rel="noreferrer">
            <img
              src={Logo}
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
          <div className="flex justify-center gap-5 mt-5">
            <div className="text-2xl">Application: {appName}</div>
            <div className="text-2xl">Tenant: {appTenant}</div>
          </div>
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

export default AppLayout;
