<script lang="ts">
	import type { Session } from '@auth/sveltekit';

	let { session }: { session: Session } = $props();

	const textareaClasses =
		'block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset';
</script>

<div class="mt-8 space-y-4 text-left">
	<div>
		<label for="access-token" class="mb-1 block text-sm font-semibold text-gray-900">
			Access token (decoded)
		</label>
		<textarea
			id="access-token"
			rows="12"
			readonly
			class={textareaClasses}
			value={JSON.stringify(session.accessTokenClaims ?? {}, null, 2)}></textarea>
	</div>
	<div>
		<label for="id-token" class="mb-1 block text-sm font-semibold text-gray-900">
			ID token (decoded)
		</label>
		<textarea
			id="id-token"
			rows="12"
			readonly
			class={textareaClasses}
			value={JSON.stringify(session.idTokenClaims ?? {}, null, 2)}></textarea>
	</div>
</div>
