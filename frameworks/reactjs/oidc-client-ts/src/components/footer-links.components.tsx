import { Icon } from "@iconify/react";

const LinkContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-8 sm:p-10 bg-purple-500/10 text-center text-xl font-semibold text-slate-600/80 flex items-center justify-center">
      {children}
    </div>
  );
};

export const FooterLinks = () => {
  return (
    <div className="sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
          <a
            href="https://phasetwo.io/docs/introduction"
            target="_blank"
            rel="noreferrer"
          >
            <LinkContainer>
              Docs
              <Icon icon="line-md:external-link-rounded" className="ml-1" />
            </LinkContainer>
          </a>
          <a href="https://github.com/p2-inc/" target="_blank" rel="noreferrer">
            <LinkContainer>
              Github
              <Icon icon="bi:github" className="ml-1" />
            </LinkContainer>
          </a>
          <a href="https://phasetwo.io/blog" target="_blank" rel="noreferrer">
            <LinkContainer>
              Blog
              <Icon icon="line-md:external-link-rounded" className="ml-1" />
            </LinkContainer>
          </a>
          <a href="mailto:support@phasetwo.io" target="_blank" rel="noreferrer">
            <LinkContainer>
              Contact
              <Icon
                icon="ic:outline-email"
                className="ml-1"
                style={{ width: "1.1em", height: "1.1em" }}
              />
            </LinkContainer>
          </a>
        </div>
      </div>
    </div>
  );
};
