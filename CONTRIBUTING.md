# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `main` branch kept in a stable state.
When submitting pull requests, please make sure to fork from and submit back to `main`.

Other processes and specifications that are in use in this repository are:

- [Semantic versioning](https://semver.org/)
- [Conventional commits](https://conventionalcommits.org/en/v1.0.0/) following the [@commitlint/config-conventional config](https://github.com/conventional-changelog/commitlint/tree/master/%40commitlint/config-conventional)
- [Prettier](https://prettier.io/) style guide

## Getting started

Ensure all prerequisites are installed (including any optional ones), as noted in the [prerequisites section of the readme file](./README.md#prerequisites).

With those in place, fork the repository, clone it, and then run `npm ci && npm run prepare` to install all dependencies.
Make a copy of `.env.template` in the root directory and rename it to `.env`, configuring the environment variables in the file as required.

### Development workflow

After cloning the repository and installing all the dependencies, there are several commands available for local development:

- `npm run build` - Runs esbuild to compile code into dist directory
- `npm run lint` - Runs [ESLint](https://eslint.org) over all support file types
- `npm run lint:prettier` - Runs [Prettier](https://prettier.io) over all supported file types
- `npm run test:unit` - Runs tests in src directory
- `npm test` - Runs all of the above linting and testing scripts together
- `npm run start:dev` - Starts a development server with live reload

### Production workflow

- `npm start` - Runs a production version. No live reload

## Documentation style

Documentation (both in markdown files and inline comments) should be written in **British English** where possible.

Titles and headings should use sentence-style capitalisation, where only the first letter of a sentence and proper nouns are capitalised.

## Pull request checklist

Before submitting a pull request back to the main repository, please ensure the following steps have been taken:

1. Pull request base branch is set to `main`. All pull requests should be forked from and merged back to `main`
2. Run `npm test` to check the code adheres to the defined formatting style, and that it passes tests
3. Run `npm run lint:fix` to automatically fix any ESLint errors
4. Run `npm run lint:prettier:fix` to automatically fix any Prettier errors
5. Run `npm run lint:licenses` if adding or updating production dependencies to check they use permissive licenses

Steps 2. and 5. are automatically run by a pre-commit hook added by [Husky](https://typicode.github.io/husky/#/).

## Issues

Please file issues [here](https://github.com/Fdawgs/docsmith/issues) and try to provide as much information in the template as possible/relevant.
