<script lang="ts">
  interface User {
    status: boolean;
    user?: {
      name?: string;
      email?: string;
    };
  }

  export let data: User;

  import LoginButton from "./login_button.svelte";
  import LogoutButton from "./logout_button.svelte";
</script>

<div>
  <div class="text-xl pb-8 italic">Your current status is:</div>
  {#if data.status}
    <div>
      <div class="mb-2 text-p2blue-700 text-2xl">Authenticated</div>
      <div class="mb-6 text-p2blue-700 text-md">
        <div>{data.user?.email}</div>
        <div>{data.user?.name}</div>
      </div>
      <LogoutButton />
    </div>
  {:else}
    <div>
      <div class="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
      <LoginButton />
    </div>
  {/if}
</div>
