# Contributing

Contributions are welcome and any help that can be offered is greatly appreciated.
Please take a moment to read the entire contributing guide.

This repository uses the [Feature Branch Workflow](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow),
meaning that development should take place in `feat/` branches, with the `master` branch kept in a stable state.
When you submit pull requests, please make sure to fork from and submit back to `master`.

Other processes and specifications that are in use in this repository are:

-   [Semantic versioning](https://semver.org/)
-   [Conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) following the @commitlint/config-conventional config
-   [Prettier](https://prettier.io/) style guide

## Getting Started

As noted in the prerequisites section of the readme file, this project requires that you have Node.js installed.

With those in place, you can fork the repository, clone it, and then run `npm install` to install all development dependencies.
Make a copy of `.env.template` in the root directory and rename it to `.env`, configuring the environment variables as required.

### Development Workflow

After cloning and installing all the dependencies, there are several commands available for local development:

-   `npm run lint` - Lints everything in src directory
-   `npm run jest` - Runs Jest over all tests in src directory
-   `npm test` - Runs `npm run lint` and `npm run jest` together
-   `npm run start:dev` - Starts a development server with live reload, available on `localhost:8204` unless you specify your own port

### Production Workflow

-   `npm start` - Runs a production version. No live reload.

## Documentation Style

Documentation (both in markdown files and inline comments) should be written in **British English** where possible.

Titles and headings should adhere to the [Associated Press (AP)](https://www.apstylebook.com/) style:

-   Capitalise words with three or more letters
-   Capitalise the first and the last word
-   Capitalise nouns, pronouns, adjectives, verbs, adverbs, and subordinate conjunctions
-   Lowercase articles (a, an, the), coordinating conjunctions, and prepositions
-   Capitalise words with four or more letters (including conjunctions and prepositions)

## Pull Request Checklist

Prior to submitting a pull request back to the main repository, please make sure you have completed the following steps:

1. Pull request base branch is set to `master`. All pull requests should be forked from and merged back to `master`
2. Run `npm test` to check the code adheres to the defined style and that it passes the Jest tests
3. Run `npm run lint:prettier` to run the Prettier code formatter over the code

## Issues

Please file your issues [here](https://github.com/Fdawgs/docsmith/issues) and try to provide as much information in the template as possible/relevant.
