# ui-shared

The page the Zoo and Aquarium apps share. It follows the look of the other Phase Two examples.

- `AppLayout`: the background picture, the Phase Two logo, a header with the React and GitHub icons (linking to this example on GitHub) and the app name, and the footer.
- `Organizations`: loads the logged-in user's organizations through [`api-manager`](../api-manager) and shows one card per organization with its roles. Each card says whether the organization gives access to the current app, that is whether the user has the app's role (`zoo` or `aquarium`) in it.
- `Button`, `FooterLinks` and the inline SVG icons.

Tailwind CSS only scans the Vite root, the app folder, for class names. The apps' stylesheets (`apps/*/src/styles.css`) add this folder with `@source`, so the classes used here end up in their CSS.

Run its tests with `pnpm nx test ui-shared`.
