<template>
  <div>
    <div class="mt-4 text-left">
      <div class="mt-2">
        <label htmlFor="accessToken" class="block text-sm font-semibold leading-6 text-gray-900">
          Access Token
        </label>

        <textarea
          rows="6"
          name="accessToken"
          id="accessToken"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
          :defaultValue="stringifyToken(user?.access_token)"
        ></textarea>
      </div>
      <div class="mt-2">
        <label htmlFor="idToken" class="block text-sm font-semibold leading-6 text-gray-900">
          Id Token
        </label>

        <textarea
          rows="6"
          name="idToken"
          id="idToken"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
          :defaultValue="stringifyToken(user?.id_token)"
        ></textarea>
      </div>
      <div class="mt-2">
        <label htmlFor="refreshToken" class="block text-sm font-semibold leading-6 text-gray-900">
          Refresh Token
        </label>

        <textarea
          rows="6"
          name="refreshToken"
          id="refreshToken"
          class="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 bg-purple-200/50"
          :defaultValue="stringifyToken(user?.refresh_token)"
        ></textarea>
      </div>
    </div>
  </div>
</template>

<script>
import { jwtDecode } from 'jwt-decode'

export default {
  name: 'TokenComponent',
  props: {
    user: Object
  },
  methods: {
    stringifyToken(token) {
      return JSON.stringify(jwtDecode(token), null, 2)
    }
  }
}
</script>
