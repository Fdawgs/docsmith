# Changelog

All notable changes to this project will be documented in this file.

### [1.0.1](https://www.github.com/Fdawgs/doccon/compare/v1.0.0...v1.0.1) (2021-04-14)


### Continuous Integration

* do not run coveralls steps/jobs on forks ([1772604](https://www.github.com/Fdawgs/doccon/commit/1772604e6abab87b680ff0257100156dc1ec8955))
* **link-check:** fix skip regex ([a550745](https://www.github.com/Fdawgs/doccon/commit/a5507458bad35176c2c7331285c3c1eaffb426dd))

## [1.0.0](https://www.github.com/Fdawgs/doccon/compare/v0.1.0...v1.0.0) (2021-04-06)


### ⚠ BREAKING CHANGES

* `CORS_METHODS` env variable removed

### Features

* add support for cors preflight requests ([e97d974](https://www.github.com/Fdawgs/doccon/commit/e97d9747034bc10f9a37743770d821b38d34f254))
* **config:** support `access-control-allow-credentials` cors header ([cc8a89c](https://www.github.com/Fdawgs/doccon/commit/cc8a89cf6ac5209a8b1bf90ca92d3d87d1b9339c))
* **server:** use `strict-origin-when-cross-origin` referrer policy ([22b5311](https://www.github.com/Fdawgs/doccon/commit/22b5311122ec2fb0306e46c605274d5f9f581f6b))


### Bug Fixes

* **config:** comma-delimited string support for cors origin value ([4e74ecd](https://www.github.com/Fdawgs/doccon/commit/4e74ecdb25044fab8ba552aef9d8a63878867d22))
* **docker:** use node command over npm ([74c019d](https://www.github.com/Fdawgs/doccon/commit/74c019d484384a7476c278f45cfc482484954503))


### Miscellaneous

* **env.template:** add note discouraging reflecting cors origin ([e6dcc90](https://www.github.com/Fdawgs/doccon/commit/e6dcc9076867e3e176a86095397bcc3ff74fcd75))
* **server:** clarify on secure child context ([b61c870](https://www.github.com/Fdawgs/doccon/commit/b61c87095f6aa065c850b968e5731ef85cd986f1))
* **server:** use new exposed CSP dir from `fastify-helmet` ([9fcdf75](https://www.github.com/Fdawgs/doccon/commit/9fcdf75c410499f2add833a6563438e4f92f9987))


### Continuous Integration

* add cleanup-run job ([707c983](https://www.github.com/Fdawgs/doccon/commit/707c9838129cde58c77c185eddab297465228861))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([fbf78ef](https://www.github.com/Fdawgs/doccon/commit/fbf78ef41b130a8c7c3fa4dc332d568755dd9f6e))
* **deps-dev:** bump @commitlint/config-conventional ([b111594](https://www.github.com/Fdawgs/doccon/commit/b111594da8e5339fe8d240b2d71c1be87c04089b))
* **deps-dev:** bump eslint-plugin-jest from 24.3.2 to 24.3.4 ([397e2d3](https://www.github.com/Fdawgs/doccon/commit/397e2d349504b8a743c3fe9b6432cc89f58e600c))
* **deps-dev:** bump faker from 5.5.1 to 5.5.2 ([49993fc](https://www.github.com/Fdawgs/doccon/commit/49993fc69dc42232bab067c997b3b6739b663693))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([99d3582](https://www.github.com/Fdawgs/doccon/commit/99d35820a94bcfe5b0b7856c49a21eb92a069d36))
* **deps:** bump fastify-swagger from 4.4.2 to 4.5.0 ([0c6fae8](https://www.github.com/Fdawgs/doccon/commit/0c6fae8ce37e912f4b1187f521c338c93677fcd0))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([35a6613](https://www.github.com/Fdawgs/doccon/commit/35a661383d3227ea26136f356ede71319c7f4daa))

## [0.1.0](https://www.github.com/Fdawgs/doccon/compare/v0.0.3...v0.1.0) (2021-03-30)


### Features

* **routes/pdf/html:** add schema ([57af27e](https://www.github.com/Fdawgs/doccon/commit/57af27e95893a809ac114df87a9161edc5fff4aa))
* **routes/pdf/txt:** add pdf-to-txt route and plugin ([56fb784](https://www.github.com/Fdawgs/doccon/commit/56fb784d69dae872e369220efe2b22305ea57bc1))


### Bug Fixes

* **routes/pdf/html:** options not passed to `tidyCss` function ([f0ba18d](https://www.github.com/Fdawgs/doccon/commit/f0ba18dfff4d2a2360db443897d8e13ccb680c23))
* **routes/pdf/html:** remove body from schema validation ([a8e640a](https://www.github.com/Fdawgs/doccon/commit/a8e640a7e4123ad0e97e7933ca43f72900176687))


### Continuous Integration

* **automerge:** move automerge job into new workflow ([400b525](https://www.github.com/Fdawgs/doccon/commit/400b525c2bc6258d461496747f7dcb1bb9f66121))
* **ci:** ignore dependabot prs for commit message linting ([e6620d1](https://www.github.com/Fdawgs/doccon/commit/e6620d191a614fb1742877fb5cb2ee4eb75b0957))
* **stale:** shorten workflow name ([4d392aa](https://www.github.com/Fdawgs/doccon/commit/4d392aa1c470b9b115dbfe8d0eba2f61c34f4945))
* **workflows:** run only on push and pulls to master branch ([d8eae28](https://www.github.com/Fdawgs/doccon/commit/d8eae2892377a9d25d1a52b92c91ba7ed8812c95))


### Dependencies

* bump dependencies ([42736d5](https://www.github.com/Fdawgs/doccon/commit/42736d5ab7ab947435e4f1d4336d3d4525f75d1a))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([d051c24](https://www.github.com/Fdawgs/doccon/commit/d051c242378709db742a3d2ae18bf06ecd4fb15b))
* **deps-dev:** bump eslint-plugin-jest from 24.2.1 to 24.3.2 ([3811902](https://www.github.com/Fdawgs/doccon/commit/38119025437a8f90b3ca8b6c7594c1427a4d51f0))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([caae061](https://www.github.com/Fdawgs/doccon/commit/caae061d5dc89a1ae1be6f3a43daaa58ad2b67e1))
* **deps-dev:** bump faker from 5.4.0 to 5.5.1 ([4f7fd4a](https://www.github.com/Fdawgs/doccon/commit/4f7fd4a88c2740c5062bc89c7341b3573a4ffd46))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([44ba684](https://www.github.com/Fdawgs/doccon/commit/44ba68491a528f5eaec726b56c18ad5141b80063))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([f2f5ce9](https://www.github.com/Fdawgs/doccon/commit/f2f5ce96ebf88415a3aab912c1374ff8e2c8f906))
* **deps:** bump fastify from 3.14.0 to 3.14.1 ([4d7cc7c](https://www.github.com/Fdawgs/doccon/commit/4d7cc7c9c73c0ac9dba15725000f21fe614c5a78))
* **deps:** bump fastify-disablecache from 1.0.5 to 1.0.6 ([e192d2c](https://www.github.com/Fdawgs/doccon/commit/e192d2c54ae81953572a36b05e9e71b661e5b049))
* **deps:** bump fastify-helmet from 5.3.0 to 5.3.1 ([8fab790](https://www.github.com/Fdawgs/doccon/commit/8fab790cf3f120f946df0a1a67c90cf0bd023ac5))
* **deps:** bump fastify-swagger from 4.4.1 to 4.4.2 ([79819b7](https://www.github.com/Fdawgs/doccon/commit/79819b7c5df0314e1f51a5996be05cb40de8dd4d))
* **deps:** bump GoogleCloudPlatform/release-please-action ([61d0766](https://www.github.com/Fdawgs/doccon/commit/61d0766737824b27d87daa1ec833b0763f66a7e5))
* **deps:** bump jsdom from 16.5.0 to 16.5.2 ([2d52f5a](https://www.github.com/Fdawgs/doccon/commit/2d52f5a0e672e13d75337b2031fc30c5e6decadc))
* **deps:** bump node-poppler from 2.4.0 to 2.4.1 ([6b5e9b4](https://www.github.com/Fdawgs/doccon/commit/6b5e9b49f03dc53ae25abd722502d7f7ada261cc))
* **deps:** bump node-unrtf from 1.1.0 to 1.1.1 ([f1479b8](https://www.github.com/Fdawgs/doccon/commit/f1479b89c6bf421a8ef4cb10f4ec3d839a7dc3cc))
* **deps:** bump pino from 6.11.1 to 6.11.2 ([7fc184c](https://www.github.com/Fdawgs/doccon/commit/7fc184c8f3918ac471492f1078801998238986e4))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([de7b33e](https://www.github.com/Fdawgs/doccon/commit/de7b33e1c0dc6715e889bb1f1210c60767aaafe3))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([99e8247](https://www.github.com/Fdawgs/doccon/commit/99e8247b4566aa46716fb22e8efe02d953ea0a32))
* **docker:** remove now optional `version` value ([1ffbfbe](https://www.github.com/Fdawgs/doccon/commit/1ffbfbe1917a6cdecf2cf3935f06ebd84ad7f55c))


### Miscellaneous

* **config:** document purpose of `if...` statement ([ddee5be](https://www.github.com/Fdawgs/doccon/commit/ddee5be0bf428030562730c3bf9c09a8fab5018a))
* **config:** move `pino-pretty` config out of script ([5ad9d1b](https://www.github.com/Fdawgs/doccon/commit/5ad9d1b8608a2217761b5b4a5fcc9cae36e29336))
* **plugins/tidy-css:** update inaccurate description ([65b99cc](https://www.github.com/Fdawgs/doccon/commit/65b99cc71119713ae3a589d317aece18071a5022))
* **plugins:** add querystring parsing ([ce7bfc5](https://www.github.com/Fdawgs/doccon/commit/ce7bfc59a230d2b07ab2f48a34b8c243ed94f0e1))
* **prettierignore:** add yarn lock file ([6b45363](https://www.github.com/Fdawgs/doccon/commit/6b45363fbfdb98dbd906feeea892a427916089d8))
* remove contraction usage in comments ([aa0cb08](https://www.github.com/Fdawgs/doccon/commit/aa0cb08237e581fd6d2f48613be7bf4b8b97ed28))
* **routes/pdf/html:** replace `let` with `const` ([30b71db](https://www.github.com/Fdawgs/doccon/commit/30b71dbf187e492c001a1665eb98f98adf243ee2))
* **tests:** standardise test file names ([ecbd01c](https://www.github.com/Fdawgs/doccon/commit/ecbd01c099350e9869c56c56199e58356011abd8))
* **workflows:** rename ci and perf sections ([b316fab](https://www.github.com/Fdawgs/doccon/commit/b316fab6d34ecb92b0f141a3eda1cb4ff57038ae))

### [0.0.3](https://www.github.com/Fdawgs/doccon/compare/v0.0.2...v0.0.3) (2021-03-03)


### Documentation

* **readme:** fix broken link ([283583d](https://www.github.com/Fdawgs/doccon/commit/283583d22b03f98573091490cf08292bfdbb2b6b))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([856c587](https://www.github.com/Fdawgs/doccon/commit/856c58799c5057bddb71241ac0b469b5ddd6b9e8))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#51](https://www.github.com/Fdawgs/doccon/issues/51)) ([ef625c2](https://www.github.com/Fdawgs/doccon/commit/ef625c2c2910fd9a3143e7f9a7ff667d4ffbfa0a))
* **deps-dev:** bump @commitlint/config-conventional ([3347150](https://www.github.com/Fdawgs/doccon/commit/3347150c0d54702cde50810aa473d74eb3df5753))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#52](https://www.github.com/Fdawgs/doccon/issues/52)) ([b9e5971](https://www.github.com/Fdawgs/doccon/commit/b9e59715316c8e87f694bf530f627d117fd0b76b))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([e75361c](https://www.github.com/Fdawgs/doccon/commit/e75361c7783b024be267fd7f18333d05557d0b64))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.2 to 32.2.0 ([#49](https://www.github.com/Fdawgs/doccon/issues/49)) ([d4b48ee](https://www.github.com/Fdawgs/doccon/commit/d4b48eede00854589862671a6e2afda697c2dc1f))
* **deps-dev:** bump lodash from 4.17.20 to 4.17.21 ([#54](https://www.github.com/Fdawgs/doccon/issues/54)) ([c34363d](https://www.github.com/Fdawgs/doccon/commit/c34363de542f1bdd22beb60941dd2dcefdf5e19b))
* **deps:** bump fastify-autoload from 3.4.2 to 3.5.2 ([#53](https://www.github.com/Fdawgs/doccon/issues/53)) ([e87fb6c](https://www.github.com/Fdawgs/doccon/commit/e87fb6c2d72d490f7700714173cc4d90cbffe7db))
* **deps:** bump fluent-json-schema from 2.0.3 to 2.0.4 ([#50](https://www.github.com/Fdawgs/doccon/issues/50)) ([86ad7e5](https://www.github.com/Fdawgs/doccon/commit/86ad7e56bbf8272b3646f4f8b0915db87c40f343))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([9166abf](https://www.github.com/Fdawgs/doccon/commit/9166abfbe3a65d904428d24d43458c70be6ca999))
* **deps:** specify minor and hotfix versions ([51bfda0](https://www.github.com/Fdawgs/doccon/commit/51bfda0ef7814367b40f6c6c51149e95414e82d0))


### Miscellaneous

* add link check workflow ([1934a77](https://www.github.com/Fdawgs/doccon/commit/1934a7739d5666c19dd5e53b0890584a8c88538e))
* automate release and changelog generation ([8e39a57](https://www.github.com/Fdawgs/doccon/commit/8e39a579632b082a42f98745e0ad867565ebc9f2))
* **codeql:** remove autobuild action ([97da309](https://www.github.com/Fdawgs/doccon/commit/97da3098222d9d2475bc836f1e61099b0db02b83))
* **linkcheck:** extend ignored urls ([00cc7a2](https://www.github.com/Fdawgs/doccon/commit/00cc7a2d360f69c80202e0c080df299cc1c8cb85))
* **lint-check:** compress patterns ([d93527e](https://www.github.com/Fdawgs/doccon/commit/d93527ed40a0954615e521ff416ba4aa8aede364))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#56](https://www.github.com/Fdawgs/doccon/issues/56)) ([5dfdcc7](https://www.github.com/Fdawgs/doccon/commit/5dfdcc7caf87f06c1940b273b8cc4388291a1f2c))
* replace stalebot with github action ([6307221](https://www.github.com/Fdawgs/doccon/commit/6307221cf390dfddab5d0a308faadbda8a1c010d))
* require `commit-lint` job to pass before automerge ([d52c5e9](https://www.github.com/Fdawgs/doccon/commit/d52c5e97bf8d02a597933c04534762c541728b6e))
* update repo name and links ([022c44c](https://www.github.com/Fdawgs/doccon/commit/022c44c0dff50dabbea2d7ac198292af9c22924b))
* **vscode:** remove conflicting prettier ext setting ([6668a8b](https://www.github.com/Fdawgs/doccon/commit/6668a8bff4f6df541a68988e14f3d459b403ede7))
* **workflows:** move release steps into `cd` workflow ([2c85cfe](https://www.github.com/Fdawgs/doccon/commit/2c85cfebe4badfcf1e53d2798f65866c00adb5f7))
* **workflows:** remove redundant comments ([6fa604c](https://www.github.com/Fdawgs/doccon/commit/6fa604c123cf9bbc842c58aa6c0ae4ec70803454))
* **workflows:** rename spellcheck workflow ([dcd27cf](https://www.github.com/Fdawgs/doccon/commit/dcd27cf0adc718b71dfd4bb3a8b4e517921e9538))
* **workflows:** tidy node-version syntax ([ad3128d](https://www.github.com/Fdawgs/doccon/commit/ad3128d3f4cdb94427fb0c29b90ecb15c7d95715))

### [0.0.2](https://www.github.com/Fdawgs/doccon/compare/v0.0.1...v0.0.2) (2021-02-18)

-   docs: shorten links ([a02f9f6](https://github.com/Fdawgs/doccon/commit/a02f9f6))
-   docs(contributing): add documentation style ([3a42706](https://github.com/Fdawgs/doccon/commit/3a42706))
-   docs(readme): add ignore scripts arg ([8b08fed](https://github.com/Fdawgs/doccon/commit/8b08fed))
-   build(deps-dev): add husky for git hook handling ([1821d58](https://github.com/Fdawgs/doccon/commit/1821d58))
-   build(deps-dev): bump autocannon from 7.0.3 to 7.0.4 (#40) ([02a6605](https://github.com/Fdawgs/doccon/commit/02a6605)), closes [#40](https://github.com/Fdawgs/doccon/issues/40)
-   build(deps-dev): bump eslint from 7.19.0 to 7.20.0 (#36) ([c57f1b6](https://github.com/Fdawgs/doccon/commit/c57f1b6)), closes [#36](https://github.com/Fdawgs/doccon/issues/36)
-   build(deps-dev): bump eslint-plugin-jest from 24.1.3 to 24.1.5 (#41) ([f9d32e3](https://github.com/Fdawgs/doccon/commit/f9d32e3)), closes [#41](https://github.com/Fdawgs/doccon/issues/41)
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.6.0 to 32.0.2 (#42) ([ff5a089](https://github.com/Fdawgs/doccon/commit/ff5a089)), closes [#42](https://github.com/Fdawgs/doccon/issues/42)
-   build(deps-dev): bump eslint-plugin-promise from 4.2.1 to 4.3.1 (#30) ([35bcaba](https://github.com/Fdawgs/doccon/commit/35bcaba)), closes [#30](https://github.com/Fdawgs/doccon/issues/30)
-   build(deps-dev): bump faker from 5.2.0 to 5.4.0 (#34) ([6aec6cb](https://github.com/Fdawgs/doccon/commit/6aec6cb)), closes [#34](https://github.com/Fdawgs/doccon/issues/34)
-   build(deps-dev): bump pino-pretty from 4.4.0 to 4.5.0 ([a4a96b8](https://github.com/Fdawgs/doccon/commit/a4a96b8))
-   build(deps-dev): pin husky major version ([d8d0978](https://github.com/Fdawgs/doccon/commit/d8d0978))
-   build(deps): bump actions/cache from v2 to v2.1.4 (#26) ([d5a4712](https://github.com/Fdawgs/doccon/commit/d5a4712)), closes [#26](https://github.com/Fdawgs/doccon/issues/26)
-   build(deps): bump env-schema from 2.0.1 to 2.1.0 (#37) ([6848454](https://github.com/Fdawgs/doccon/commit/6848454)), closes [#37](https://github.com/Fdawgs/doccon/issues/37)
-   build(deps): bump fastify from 3.11.0 to 3.12.0 (#29) ([b1d774b](https://github.com/Fdawgs/doccon/commit/b1d774b)), closes [#29](https://github.com/Fdawgs/doccon/issues/29)
-   build(deps): bump fastify-bearer-auth from 5.0.2 to 5.1.0 (#31) ([49114f4](https://github.com/Fdawgs/doccon/commit/49114f4)), closes [#31](https://github.com/Fdawgs/doccon/issues/31)
-   build(deps): bump fastify-disablecache from 1.0.3 to 1.0.4 (#28) ([77fa32f](https://github.com/Fdawgs/doccon/commit/77fa32f)), closes [#28](https://github.com/Fdawgs/doccon/issues/28)
-   build(deps): bump fastify-swagger from 4.0.1 to 4.3.1 (#35) ([f036727](https://github.com/Fdawgs/doccon/commit/f036727)), closes [#35](https://github.com/Fdawgs/doccon/issues/35)
-   build(deps): bump node-poppler from 2.2.0 to 2.2.1 (#32) ([fe21146](https://github.com/Fdawgs/doccon/commit/fe21146)), closes [#32](https://github.com/Fdawgs/doccon/issues/32)
-   build(deps): bump pino from 6.11.0 to 6.11.1 (#33) ([d5af6ff](https://github.com/Fdawgs/doccon/commit/d5af6ff)), closes [#33](https://github.com/Fdawgs/doccon/issues/33)
-   build(deps): bump wagoid/commitlint-github-action from v2.0.3 to v2.2.4 (#43) ([3de0718](https://github.com/Fdawgs/doccon/commit/3de0718)), closes [#43](https://github.com/Fdawgs/doccon/issues/43)
-   chore: add bsd to list of allowed licenses ([c031ba9](https://github.com/Fdawgs/doccon/commit/c031ba9))
-   chore: add documentation style link to pr template ([e47b7f6](https://github.com/Fdawgs/doccon/commit/e47b7f6))
-   chore(scripts): ignore dependency with broken license value ([6162005](https://github.com/Fdawgs/doccon/commit/6162005))
-   chore(vscode): add `redhat.vscode-yaml` as recommended extension ([bfd2ca5](https://github.com/Fdawgs/doccon/commit/bfd2ca5))
-   chore(vscode): add `updateImportsOnFileMove` setting ([920c35b](https://github.com/Fdawgs/doccon/commit/920c35b))
-   chore(vscode): add workspace settings and extensions ([7e87ab9](https://github.com/Fdawgs/doccon/commit/7e87ab9))
-   ci: add commit-lint job ([7030396](https://github.com/Fdawgs/doccon/commit/7030396))
-   ci: replace typo ci app with action ([2afa517](https://github.com/Fdawgs/doccon/commit/2afa517))
-   ci(dependabot): ignore husky updates ([1a70ed0](https://github.com/Fdawgs/doccon/commit/1a70ed0))
-   style(readme): add linebreaks between badges ([8c3231c](https://github.com/Fdawgs/doccon/commit/8c3231c))

### 0.0.1 (2021-02-08)

-   chore: add basic route ([179cac8](https://github.com/Fdawgs/doccon/commit/179cac8))
-   chore: add config and template files ([42f6f20](https://github.com/Fdawgs/doccon/commit/42f6f20))
-   chore: add encoding to config; add packages etc ([b5cfd8a](https://github.com/Fdawgs/doccon/commit/b5cfd8a))
-   chore: add operationid to healthcheck route schema ([f066230](https://github.com/Fdawgs/doccon/commit/f066230))
-   chore: add pull request template ([ceff283](https://github.com/Fdawgs/doccon/commit/ceff283))
-   chore: fix repo description ([7353f96](https://github.com/Fdawgs/doccon/commit/7353f96))
-   chore: set allowed list of licenses ([7c3f26e](https://github.com/Fdawgs/doccon/commit/7c3f26e))
-   chore: stop excess coverage files being generated ([ab2ae1f](https://github.com/Fdawgs/doccon/commit/ab2ae1f))
-   chore(package): add homepage and bug urls ([7cd4af8](https://github.com/Fdawgs/doccon/commit/7cd4af8))
-   chore(pm2): use repo name for pm2 instance name ([35e07ca](https://github.com/Fdawgs/doccon/commit/35e07ca))
-   style: capitalise headings ([18a0f9f](https://github.com/Fdawgs/doccon/commit/18a0f9f))
-   style(scripts): rename `jest-coverage` to `jest:coverage` ([dd5aef8](https://github.com/Fdawgs/doccon/commit/dd5aef8))
-   style(tests): use apa header style for describe name params ([be3f9a2](https://github.com/Fdawgs/doccon/commit/be3f9a2))
-   feat: add env template and env config parser ([3be2a31](https://github.com/Fdawgs/doccon/commit/3be2a31))
-   feat(config): allow configurable cors headers ([ccd29fe](https://github.com/Fdawgs/doccon/commit/ccd29fe))
-   feat(plugins): add `embedhtmlimages` decorator plugin ([573513d](https://github.com/Fdawgs/doccon/commit/573513d))
-   feat(plugins): add `pdftohtml` pre-handler plugin ([bcca135](https://github.com/Fdawgs/doccon/commit/bcca135))
-   feat(plugins): add `tidycss` decorator plugin ([0866e35](https://github.com/Fdawgs/doccon/commit/0866e35))
-   feat(plugins): add `tidyhtml` decorator plugin ([b2ea48e](https://github.com/Fdawgs/doccon/commit/b2ea48e))
-   feat(routes): add healthcheck route ([f49894b](https://github.com/Fdawgs/doccon/commit/f49894b))
-   feat(src): add app and server ([0a68a6d](https://github.com/Fdawgs/doccon/commit/0a68a6d))
-   test(plugins/embed-html-images): add check for non-embedded images ([b96f97d](https://github.com/Fdawgs/doccon/commit/b96f97d))
-   fix(config): stop rotatinglogstream flooding stdout ([f6debe0](https://github.com/Fdawgs/doccon/commit/f6debe0))
-   fix(plugins/pdf-to-html): add win1252 value fixer ([d2445e1](https://github.com/Fdawgs/doccon/commit/d2445e1))
-   fix(routes/healthcheck): eslint warnings ([14b897f](https://github.com/Fdawgs/doccon/commit/14b897f))
-   refactor(config): update openapi docs from v2.\*.\* to v3.\*.\* ([9936aec](https://github.com/Fdawgs/doccon/commit/9936aec))
-   refactor(server): use default helmet referrer policy ([ef384a4](https://github.com/Fdawgs/doccon/commit/ef384a4))
-   ci: add ci workflow ([000cc8c](https://github.com/Fdawgs/doccon/commit/000cc8c))
-   ci: add codeql-analysis workflow ([098a3ea](https://github.com/Fdawgs/doccon/commit/098a3ea))
-   ci: add linux and macos installs ([f4e92c9](https://github.com/Fdawgs/doccon/commit/f4e92c9))
-   ci(typo-ci): add `ydh` to list of excluded words ([97f6f5d](https://github.com/Fdawgs/doccon/commit/97f6f5d))
-   docs: bump coc from v1.4.0 to v2.0.0 ([798d906](https://github.com/Fdawgs/doccon/commit/798d906))
-   docs: update contact email ([871ba6d](https://github.com/Fdawgs/doccon/commit/871ba6d))
-   docs(readme): add deployment steps ([e9d2d14](https://github.com/Fdawgs/doccon/commit/e9d2d14))
-   docs(readme): fix spacing ([ace2613](https://github.com/Fdawgs/doccon/commit/ace2613))
-   docs(readme): remove superfluous text in pm2 install instructions ([95883eb](https://github.com/Fdawgs/doccon/commit/95883eb))
-   build: remove `yarn` as package manager, revert to `npm` ([a418176](https://github.com/Fdawgs/doccon/commit/a418176))
-   build(deps-dev): bump autocannon from 7.0.1 to 7.0.3 ([abceee7](https://github.com/Fdawgs/doccon/commit/abceee7))
-   build(deps-dev): bump eslint from 7.18.0 to 7.19.0 ([a1e60a5](https://github.com/Fdawgs/doccon/commit/a1e60a5))
-   build(deps-dev): bump eslint-config-prettier from 7.1.0 to 7.2.0 ([6ce2ffd](https://github.com/Fdawgs/doccon/commit/6ce2ffd))
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.0.6 to 31.6.0 ([e22df68](https://github.com/Fdawgs/doccon/commit/e22df68))
-   build(deps-dev): bump faker from 5.1.0 to 5.2.0 ([424f7f9](https://github.com/Fdawgs/doccon/commit/424f7f9))
-   build(deps-dev): bump pino-pretty from 4.3.0 to 4.4.0 ([ab04849](https://github.com/Fdawgs/doccon/commit/ab04849))
-   build(deps-dev): remove coveralls, replaced by github action ([518d14f](https://github.com/Fdawgs/doccon/commit/518d14f))
-   build(deps): bump fastify from 3.10.1 to 3.11.0 ([55b787a](https://github.com/Fdawgs/doccon/commit/55b787a))
-   build(deps): bump fastify-autoload from 3.4.0 to 3.4.2 ([b9f01cf](https://github.com/Fdawgs/doccon/commit/b9f01cf))
-   build(deps): bump fastify-cors from 5.1.0 to 5.2.0 ([5849e66](https://github.com/Fdawgs/doccon/commit/5849e66))
-   build(deps): bump fastify-disablecache from 1.0.1 to 1.0.3 ([e6fdd92](https://github.com/Fdawgs/doccon/commit/e6fdd92))
-   build(deps): bump fastify-helmet from 5.1.0 to 5.2.0 ([c7855d1](https://github.com/Fdawgs/doccon/commit/c7855d1))
-   build(deps): bump fastify-swagger from 3.5.0 to 4.0.1 ([2d0ec53](https://github.com/Fdawgs/doccon/commit/2d0ec53))
-   build(deps): bump helmet from 4.3.1 to 4.4.1 ([85a952f](https://github.com/Fdawgs/doccon/commit/85a952f))
-   build(deps): bump node-poppler from 2.1.2 to 2.2.0 ([b8ff673](https://github.com/Fdawgs/doccon/commit/b8ff673))
-   build(deps): bump node-unrtf from 1.0.6 to 1.0.7 ([7f0ab3c](https://github.com/Fdawgs/doccon/commit/7f0ab3c))
-   build(docker): add basic docker-compose and dockerfile ([b2c7375](https://github.com/Fdawgs/doccon/commit/b2c7375))
-   Initial commit ([499f286](https://github.com/Fdawgs/doccon/commit/499f286))
