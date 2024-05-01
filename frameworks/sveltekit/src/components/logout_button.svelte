<script lang="ts">
  import { signOut } from "@auth/sveltekit/client";
  const classes =
    "rounded-md bg-indigo-600 px-2.5 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600";
</script>

<button class={classes} on:click={() => signOut()}> Sign Out </button>
