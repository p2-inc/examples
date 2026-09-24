import { EmailIcon, ExternalLinkIcon, GithubIcon } from "./icons.tsx";

const links = [
  {
    label: "Docs",
    href: "https://phasetwo.io/docs/introduction/",
    icon: <ExternalLinkIcon />,
  },
  { label: "Github", href: "https://github.com/p2-inc/", icon: <GithubIcon /> },
  {
    label: "Blog",
    href: "https://phasetwo.io/blog/",
    icon: <ExternalLinkIcon />,
  },
  { label: "Contact", href: "mailto:support@phasetwo.io", icon: <EmailIcon /> },
];

export function FooterLinks() {
  return (
    <footer className="sm:py-20">
      <div className="mx-auto max-w-3xl px-6 lg:px-8">
        <div className="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
          {links.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1 bg-purple-500/10 p-8 text-xl font-semibold text-slate-600/80 sm:p-10"
            >
              {label}
              {icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
