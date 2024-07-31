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
  import { jwtDecode } from "jwt-decode";
  import { onMount } from "svelte";

  // Function to find keys by partial match
  function findKeysByPartialMatch(part: string): string[] {
    const keys = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.includes(part)) {
        keys.push(key);
      }
    }
    return keys;
  }

  function stringifyToken(token: string) {
    return JSON.stringify(jwtDecode(token), null, 2);
  }

  let idToken = "";
  let accessToken = "";
  let refreshToken = "";

  onMount(() => {
    let token;
    const tokenKeys = findKeysByPartialMatch("oidc.user:");
    if (tokenKeys.length > 0) {
      token = localStorage.getItem(tokenKeys[0]);
    }

    if (token) {
      try {
        const data = JSON.parse(token);
        console.log("🚀 ~ onMount ~ data:", data);
        accessToken = stringifyToken(data.access_token);
        idToken = stringifyToken(data.id_token);
        refreshToken = stringifyToken(data.refresh_token);
      } catch (error) {
        console.error("Error parsing token", error);
      }
    }
  });
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

      <div>
        <div class="mt-4 text-left">
          <div class="mt-2">
            <label
              for="accessToken"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Access Token
            </label>

            <textarea
              rows="6"
              name="accessToken"
              id="accessToken"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
              bind:value={accessToken}
            ></textarea>
          </div>
          <div class="mt-2">
            <label
              for="idToken"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Id Token
            </label>

            <textarea
              rows="6"
              name="idToken"
              id="idToken"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
              bind:value={idToken}
            ></textarea>
          </div>
          <div class="mt-2">
            <label
              for="refreshToken"
              class="block text-sm font-semibold leading-6 text-gray-900"
            >
              Refresh Token
            </label>

            <textarea
              rows="6"
              name="refreshToken"
              id="refreshToken"
              class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
              bind:value={refreshToken}
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  {:else}
    <div>
      <div class="mb-6 text-p2blue-700 text-2xl">Not authenticated.</div>
      <LoginButton />
    </div>
  {/if}
</div>
