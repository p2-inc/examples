<script setup lang="ts">
import { jwtDecode } from "jwt-decode";
import type { User } from "oidc-client-ts";

const props = defineProps<{ user: User }>();

function decode(token: string | undefined) {
  return token ? JSON.stringify(jwtDecode(token), null, 2) : "";
}

const accessToken = computed(() => decode(props.user.access_token));
const idToken = computed(() => decode(props.user.id_token));

const textareaClasses =
  "block w-full rounded-md bg-purple-200/50 px-2 py-1.5 font-mono text-xs text-gray-900 ring-1 ring-gray-300 ring-inset";
</script>

<template>
  <div class="mt-8 space-y-4 text-left">
    <div>
      <label
        for="access-token"
        class="mb-1 block text-sm font-semibold text-gray-900"
      >
        Access token (decoded)
      </label>
      <textarea
        id="access-token"
        rows="12"
        readonly
        :class="textareaClasses"
        :value="accessToken"
      />
    </div>
    <div>
      <label
        for="id-token"
        class="mb-1 block text-sm font-semibold text-gray-900"
      >
        ID token (decoded)
      </label>
      <textarea
        id="id-token"
        rows="12"
        readonly
        :class="textareaClasses"
        :value="idToken"
      />
    </div>
  </div>
</template>
