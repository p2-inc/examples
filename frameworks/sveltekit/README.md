# Phase Two SvelteKit Example

## Getting Started

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `src/routes/+page.svelte`. The page auto-updates as you edit the file.

# Phase Two SvelteKit Example

Auth related items are in [auth.ts](./src/auth.ts), [signin](./src/routes/signin/+page.server.ts) and [signout](./src/routes/signout/+page.server.ts) files. This example leverages [@auth/sveltekit](https://github.com/nextauthjs/next-auth) to provide hook and HOC support.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

## In Production

To use the application in production, make sure to use the environment variables in [auth.ts](./src/auth.ts) file. Apart from the Keycloak variables, you need to set a `AUTH_SECRET` environment variable required by the library being used for the authentication.

Here's how you can generate the `AUTH_SECRET` correctly:

```bash
npx auth secret
```

and use the `AUTH_SECRET` variable in output to be set as the environment variable.