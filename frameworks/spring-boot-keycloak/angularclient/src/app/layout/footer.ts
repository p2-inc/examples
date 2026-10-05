import { NgComponentOutlet } from '@angular/common';
import { Component } from '@angular/core';
import { EmailIcon, ExternalLinkIcon, GithubIcon } from './icons';

@Component({
  selector: 'app-footer',
  imports: [NgComponentOutlet],
  template: `
    <footer class="sm:py-20">
      <div class="mx-auto max-w-3xl px-6 lg:px-8">
        <div class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
          @for (link of links; track link.label) {
            <a
              [href]="link.href"
              target="_blank"
              rel="noreferrer"
              class="flex items-center justify-center gap-1 bg-purple-500/10 p-8 text-xl font-semibold text-slate-600/80 sm:p-10"
            >
              {{ link.label }}
              <ng-container *ngComponentOutlet="link.icon" />
            </a>
          }
        </div>
      </div>
    </footer>
  `,
})
export class Footer {
  protected readonly links = [
    { label: 'Docs', href: 'https://phasetwo.io/docs/introduction/', icon: ExternalLinkIcon },
    { label: 'Github', href: 'https://github.com/p2-inc/', icon: GithubIcon },
    { label: 'Blog', href: 'https://phasetwo.io/blog/', icon: ExternalLinkIcon },
    { label: 'Contact', href: 'mailto:support@phasetwo.io', icon: EmailIcon },
  ];
}
