<script setup lang="ts">
import type { KeycloakTokenParsed } from "keycloak-js";

const props = defineProps<{
  accessToken?: KeycloakTokenParsed;
  idToken?: KeycloakTokenParsed;
}>();

const accessTokenJson = computed(() =>
  JSON.stringify(props.accessToken ?? {}, null, 2),
);
const idTokenJson = computed(() =>
  JSON.stringify(props.idToken ?? {}, null, 2),
);

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
        :value="accessTokenJson"
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
        :value="idTokenJson"
      />
    </div>
  </div>
</template>
