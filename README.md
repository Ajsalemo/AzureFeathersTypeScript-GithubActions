# AzureFeathersTypeScript-GithubActions

A basic feathers-cli generated application that's deployed using Github Actions. The changes below can also be applied if deploying through LocalGit, ZipDeploy or Azure DevOps pipelines.

This sample is deployed to Azure App Services - Linux Web Apps. To have this play properly with Linux Web Apps (Node Blessed Image) the `package.json` has been changed from what is initially generated by the `feathers-cli`.

Originally, the `feathers-cli` generated the following `package.json`:

```
    "test": "npm run lint && npm run compile && npm run mocha",
    "lint": "eslint src/. test/. --config .eslintrc.json --ext .ts --fix",
    "dev": "ts-node-dev --no-notify src/",
    "start": "npm run compile && node lib/",
    "mocha": "ts-mocha \"test/**/*.ts\" --recursive --exit",
    "compile": "shx rm -rf lib/ && tsc"
```
This has been changed to the following:

```
    "lint": "eslint src/. --config .eslintrc.json --ext .ts --fix",
    "dev": "ts-node-dev --no-notify src/",
    "build": "npm run compile",
    "start": "node lib/index.js",
    "compile": "shx rm -rf lib/ && tsc"
```

- `npm start` was changed to use `node lib/index.js` to target the compiled Javascript entrypoint under `lib/`.
- `npm build` now contains `npm run compile` - the default Github Actions .yml contains a `npm run build --if-present` which will make use of this script now to compile TypeScript to generate the `lib` folder and so the .yml doesn't need to be changed. Alternatively you can remove `--if-present`.

The above was done to align with the logic [here](https://github.com/microsoft/Oryx/blob/main/doc/runtimes/nodejs.md#run). If the above isn't changed, then when the Linux Web App container attempts to start, it'll call the unmodified `npm start` which will try to recompile TypeScript files *again* while the container is trying to start.

This creates a workflow that contains deployment install and build logic to the Github Actions .yml. 
