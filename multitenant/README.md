# Multitenant

Update values in the following locations: 

* In `@multitenant/api-manager/src/lib/api-manager.ts` update `BASE_PATH` and `REALM` to your associated Keycloak instance and realm name. 
* In both `@multitenant/zoo/src/main.tsx` and `@multitenant/aquarium/src/main.tsx` update `client` to be your associated client from the Keycloak instance. 

## Run tasks

To run the dev server for your app, use:

```sh
npx nx serve zoo
```

To create a production bundle:

```sh
npx nx build zoo
```

To see all available targets to run for a project, run:

```sh
npx nx show project zoo
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add new projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

Use the plugin's generator to create new projects.

To generate a new application, use:

```sh
npx nx g @nx/react:app demo
```

To generate a new library, use:

```sh
npx nx g @nx/react:lib mylib
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.
