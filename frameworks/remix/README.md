# Phase Two Remix Example

[View Deployed Sample](https://phasetwo-remix-example.vercel.app/)

## Getting Started

First, run the development server:

```bash
npm run dev -- --port 3000
# or
yarn dev -- --port 3000
# or
pnpm dev -- --port 3000
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/routes/_index.tsx`. The page auto-updates as you edit the file.

# Phase Two Remix Example

All Auth related items are in [auth.server.ts](./app/services/auth.server.ts). This example leverages [remix-auth](https://github.com/sergiodxa/remix-auth) and [remix-keycloak](https://github.com/marsmars0x01/remix-keycloak) to provide hook and HOC support.

## Available Scripts

In the project directory, you can run:

### `npm run dev -- --port 3000`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
