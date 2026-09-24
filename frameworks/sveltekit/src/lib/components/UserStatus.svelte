<script lang="ts">
	import type { Session } from '@auth/sveltekit';
	import TokenPanels from './TokenPanels.svelte';

	let { session }: { session: Session | null } = $props();

	const buttonClasses =
		'cursor-pointer rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600';
</script>

{#snippet loginForm()}
	<form method="POST" action="/signin">
		<input type="hidden" name="providerId" value="keycloak" />
		<input type="hidden" name="redirectTo" value="/" />
		<button type="submit" class={buttonClasses}>Log in</button>
	</form>
{/snippet}

<div>
	<div class="pb-8 text-xl italic">Your current status is:</div>
	{#if session?.error}
		<div class="mb-2 text-2xl text-p2blue-700">Authentication error.</div>
		<div class="mb-6">Your session expired. Please log in again.</div>
		{@render loginForm()}
	{:else if session}
		<div class="mb-2 text-2xl text-p2blue-700">Authenticated</div>
		<div class="mb-6 text-p2blue-700">
			<div>{session.user?.name}</div>
			<div>{session.user?.email}</div>
		</div>
		<form method="POST" action="/signout">
			<input type="hidden" name="redirectTo" value="/" />
			<button type="submit" class={buttonClasses}>Log out</button>
		</form>
		<TokenPanels {session} />
	{:else}
		<div class="mb-6 text-2xl text-p2blue-700">Not authenticated.</div>
		{@render loginForm()}
	{/if}
</div>
