<script lang="ts">
	import IconEmail from './icons/IconEmail.svelte';
	import IconExternalLink from './icons/IconExternalLink.svelte';
	import IconGithub from './icons/IconGithub.svelte';

	const links = [
		{ label: 'Docs', href: 'https://phasetwo.io/docs/introduction/', icon: IconExternalLink },
		{ label: 'Github', href: 'https://github.com/p2-inc/', icon: IconGithub },
		{ label: 'Blog', href: 'https://phasetwo.io/blog/', icon: IconExternalLink },
		{ label: 'Contact', href: 'mailto:support@phasetwo.io', icon: IconEmail }
	];
</script>

<footer class="sm:py-20">
	<div class="mx-auto max-w-3xl px-6 lg:px-8">
		<div class="-mx-6 grid grid-cols-2 gap-0.5 overflow-hidden sm:mx-0 sm:rounded-2xl">
			{#each links as link (link.label)}
				<a
					href={link.href}
					target="_blank"
					rel="noreferrer"
					class="flex items-center justify-center gap-1 bg-purple-500/10 p-8 text-xl font-semibold text-slate-600/80 sm:p-10"
				>
					{link.label}
					<link.icon />
				</a>
			{/each}
		</div>
	</div>
</footer>
