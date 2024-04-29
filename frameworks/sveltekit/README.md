# Phase Two SvelteKit Example

## Getting Started

First, run the development server:

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
