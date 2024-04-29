<script lang="ts">
  import { signIn, signOut } from "@auth/sveltekit/client";
</script>

<button on:click={() => signIn("keycloak")}> Sign In </button>

<button on:click={() => signOut()}>Logged Out</button>
