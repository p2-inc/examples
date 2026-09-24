<script lang="ts">
	import Footer from '$lib/components/Footer.svelte';
	import Header from '$lib/components/Header.svelte';
	import UserStatus from '$lib/components/UserStatus.svelte';

	let { data } = $props();
</script>

<div class="page-bg min-h-screen">
	<Header />
	<main class="py-8">
		<div class="mx-auto max-w-3xl px-6 text-center lg:px-8">
			<UserStatus session={data.session} />
		</div>
	</main>
	<Footer />
</div>
