# Changelog

All notable changes to this project will be documented in this file.

### [2.2.3](https://www.github.com/Fdawgs/docsmith/compare/v2.2.2...v2.2.3) (2021-06-10)


### Bug Fixes

* **plugins:** return full serialization of  HTML document ([#219](https://www.github.com/Fdawgs/docsmith/issues/219)) ([f924996](https://www.github.com/Fdawgs/docsmith/commit/f92499654794aac52915ee200d4e74829bea220e))

### [2.2.2](https://www.github.com/Fdawgs/docsmith/compare/v2.2.1...v2.2.2) (2021-06-09)


### Dependencies

* **deps:** bump normalize-url from 4.5.0 to 4.5.1 ([7beaf5f](https://www.github.com/Fdawgs/docsmith/commit/7beaf5f2bacf7ced6ca592ce348a44b970e288d2))


### Improvements

* **plugins:** remove redundant use of `this` keyword ([3eb8931](https://www.github.com/Fdawgs/docsmith/commit/3eb8931b928960eb7399628de468aad73127226f))
* **server:** use helmet default csp directives ([bad981c](https://www.github.com/Fdawgs/docsmith/commit/bad981c31563c0ae4304fcd7c0037b77d5940e85))

### [2.2.1](https://www.github.com/Fdawgs/docsmith/compare/v2.2.0...v2.2.1) (2021-06-09)


### Bug Fixes

* **plugins:** await `Object.assign()` and `fixUtf8()` ([d3bdbc3](https://www.github.com/Fdawgs/docsmith/commit/d3bdbc303315b0475f685d607de3129059ae357a))
* **routes/pdf/html:** hardcoded `removealt` query param ([6e96a29](https://www.github.com/Fdawgs/docsmith/commit/6e96a29d624f10dfcbcfa200a6de8b5de5d9202a))

## [2.2.0](https://www.github.com/Fdawgs/docsmith/compare/v2.1.4...v2.2.0) (2021-06-08)


### Features

* **config:** add env variable for setting req body size limit ([53b97b8](https://www.github.com/Fdawgs/docsmith/commit/53b97b885e64df6869200bcef16db1a3e809cd13))


### Bug Fixes

* **plugins:** `outputencoding` query param use ([768161e](https://www.github.com/Fdawgs/docsmith/commit/768161ee6cdcf46f25d36c69db3fd0f25ae1aa63))

### [2.1.4](https://www.github.com/Fdawgs/docsmith/compare/v2.1.3...v2.1.4) (2021-06-08)


### Bug Fixes

* **config:** redact request authorization header from logs ([9300384](https://www.github.com/Fdawgs/docsmith/commit/9300384926e32962668edb0db7e8736d57cd6ed9))
* **server:** remove swagger from csp for all routes apart from doc route ([5be469d](https://www.github.com/Fdawgs/docsmith/commit/5be469df586c09185a6191036d8eefafb70382ad))
* **server:** set `frame-ancestors` csp to `'none'`; add `child-src` csp ([2d85a0f](https://www.github.com/Fdawgs/docsmith/commit/2d85a0ff9e49efa6820bbd70fd558095be059aeb))


### Documentation

* **readme:** flesh out intro section further ([97cbc09](https://www.github.com/Fdawgs/docsmith/commit/97cbc09e0b0deda27ee46e441f5fb59058c319ed))


### Dependencies

* update vulnerable dependencies ([f1297b9](https://www.github.com/Fdawgs/docsmith/commit/f1297b94049c5051c99adc939618d6ba56b3d261))

### [2.1.3](https://www.github.com/Fdawgs/docsmith/compare/v2.1.2...v2.1.3) (2021-06-07)


### Bug Fixes

* **plugins/tidy-css:** incomplete multi-character sanitization ([9abf965](https://www.github.com/Fdawgs/docsmith/commit/9abf9651e8ea40936595d9f23de4d7ecb2c6f46f))


### Documentation

* **readme:** revamp intro section ([#207](https://www.github.com/Fdawgs/docsmith/issues/207)) ([04265e1](https://www.github.com/Fdawgs/docsmith/commit/04265e11cd7da608a671e762dde622dceed9dcf2))


### Dependencies

* **deps-dev:** bump eslint from 7.27.0 to 7.28.0 ([8152f90](https://www.github.com/Fdawgs/docsmith/commit/8152f90e34ec9ec8b08fe55809bc5204037abf2c))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.2 to 35.1.3 ([964b374](https://www.github.com/Fdawgs/docsmith/commit/964b3742d3d424e9e0110fff6dfb501aada17ab4))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([96133ff](https://www.github.com/Fdawgs/docsmith/commit/96133ff724e612c1d559944d36743f4419767935))
* **deps-dev:** remove glob from dev list; already prod dep ([ee6b6ba](https://www.github.com/Fdawgs/docsmith/commit/ee6b6ba5f5f26df26070a26907522d5582075173))
* update vulnerable dependency ([b142a49](https://www.github.com/Fdawgs/docsmith/commit/b142a49db95bd8f81a2580caf8380f43607f98d5))

### [2.1.2](https://www.github.com/Fdawgs/docsmith/compare/v2.1.1...v2.1.2) (2021-06-03)


### Documentation

* **readme:** grammar and wordiness fixes ([d92af9c](https://www.github.com/Fdawgs/docsmith/commit/d92af9c5a75ad598039a168ae42514a66f999a4c))
* **readme:** grammar fix ([ef33bda](https://www.github.com/Fdawgs/docsmith/commit/ef33bda0f8bc6061cfb279a68e1bb721f1699133))
* **readme:** update contributing section ([208beac](https://www.github.com/Fdawgs/docsmith/commit/208beacd72f7a24d8e00461a9a3e708fb25fb97d))


### Miscellaneous

* **.env.template:** remove comment re docker and log files ([66ba536](https://www.github.com/Fdawgs/docsmith/commit/66ba53660cac5d4242d7cb8011dbf982319e6a8b))
* **dockerignore:** ignore all temp directories ([33495d4](https://www.github.com/Fdawgs/docsmith/commit/33495d49106874afc0dd552f48b6e20fbbab85bd))


### Continuous Integration

* remove redundant docker build job ([78e3abd](https://www.github.com/Fdawgs/docsmith/commit/78e3abd235f9a3f5617c1c0195ca603a104c3d60))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.3 to 2.23.4 ([9bc0cd7](https://www.github.com/Fdawgs/docsmith/commit/9bc0cd70b6cbb541dab64c2c280c6c4766f7ea9f))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.0.0 to 35.1.2 ([e0d7dd2](https://www.github.com/Fdawgs/docsmith/commit/e0d7dd28acb7e98e4f8efb63388a7a4250b4c058))
* **deps-dev:** bump jest from 27.0.1 to 27.0.3 ([fe2f6c7](https://www.github.com/Fdawgs/docsmith/commit/fe2f6c7da50e672bcf60d4a60aedacdf1ed1ffa9))
* **deps-dev:** bump jest from 27.0.3 to 27.0.4 ([c1a8d11](https://www.github.com/Fdawgs/docsmith/commit/c1a8d11effefde258d02b586a050041ffcdda313))
* **deps-dev:** bump pino-pretty from 5.0.0 to 5.0.1 ([8a0a640](https://www.github.com/Fdawgs/docsmith/commit/8a0a6407b488333c72db15cb63eaad76a34e0991))
* **deps-dev:** bump pino-pretty from 5.0.1 to 5.0.2 ([bce5af7](https://www.github.com/Fdawgs/docsmith/commit/bce5af7788c1e91739de135a173d85b07c214d6c))
* **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([97bbbb6](https://www.github.com/Fdawgs/docsmith/commit/97bbbb61d5c280354fd7d51fe57060450a88cfe6))
* **deps:** bump fastify from 3.16.2 to 3.17.0 ([ea6516b](https://www.github.com/Fdawgs/docsmith/commit/ea6516b2a4c4a69fbe472775e5ad639ab8258af0))
* **deps:** bump file-type from 16.4.0 to 16.5.0 ([f4d2dbf](https://www.github.com/Fdawgs/docsmith/commit/f4d2dbfe56d43a149c63ca3f17195fe79593b71c))
* **deps:** bump node-poppler from 4.0.0 to 4.1.0 ([5203ac5](https://www.github.com/Fdawgs/docsmith/commit/5203ac58272eeb88dcec7c5d96b6efb990a27f1e))
* **deps:** bump ws from 7.4.5 to 7.4.6 ([334cc18](https://www.github.com/Fdawgs/docsmith/commit/334cc1872b41673eb95ccc4256a85477f0a8dad7))
* **docker:** add missing dependencies and env variables ([fac4517](https://www.github.com/Fdawgs/docsmith/commit/fac4517eda854fb939ce6d0bd1fc588c8fb5fb4d))
* **docker:** clean list after install; ignore recommended packages ([61159cd](https://www.github.com/Fdawgs/docsmith/commit/61159cdde58fcd28960d976644b299cf36618649))
* **dockerignore:** add test and dev files ([573e477](https://www.github.com/Fdawgs/docsmith/commit/573e477dda5f04c84d4a9ece93ebf6ccffb983e4))
* **docker:** pin binary versions ([d237673](https://www.github.com/Fdawgs/docsmith/commit/d2376732d23073bd2b6ad1b1fa09c554eaefc17a))
* **docker:** update workdir; install curl ([338bf2d](https://www.github.com/Fdawgs/docsmith/commit/338bf2db1817d9a01db4d9dbaaed18336a487d94))
* **docker:** use native logging, healthcheck, restart and res handling ([23600da](https://www.github.com/Fdawgs/docsmith/commit/23600dac5f8dabd8505e2a27da89f146ea238e1c))
* **docker:** use smaller, more secure base image ([bf2f4e0](https://www.github.com/Fdawgs/docsmith/commit/bf2f4e05d1d368a759aac1b095e75447c73cbbb9))

### [2.1.1](https://www.github.com/Fdawgs/docsmith/compare/v2.1.0...v2.1.1) (2021-05-27)


### Miscellaneous

* **gitignore:** ignore all temp directories ([a418e02](https://www.github.com/Fdawgs/docsmith/commit/a418e02e8221b5b60f390cd246fcafc28c2ff0ca))
* **prettierignore:** ignore all temp directories ([0c373cd](https://www.github.com/Fdawgs/docsmith/commit/0c373cd102fb705ae8bdc3c4d2c621057e835495))
* remove resolved todo comments ([d0b5c92](https://www.github.com/Fdawgs/docsmith/commit/d0b5c92b2ca38d67acb8f137ffc983ace205f4b7))
* **test_resources:** standardize test file names ([3b6d16c](https://www.github.com/Fdawgs/docsmith/commit/3b6d16cce4be205bae9567869c66d0dfd79a73ec))


### Improvements

* **routes:** mimetype detection ([2ef53e0](https://www.github.com/Fdawgs/docsmith/commit/2ef53e09f55052bfaeb6386e3d95b1ded0020001))
* **routes:** mimetype detection payload return ([1db2c3a](https://www.github.com/Fdawgs/docsmith/commit/1db2c3aa886bfbc3d73e1db1289bf08b62a0e304))


### Continuous Integration

* **cd:** move perf optimizations and refactoring into same section ([b5e1b23](https://www.github.com/Fdawgs/docsmith/commit/b5e1b23341c52e834eefe6d4e2c5eab24b6bcd58))


### Dependencies

* **deps-dev:** bump jest from 27.0.0 to 27.0.1 ([e64fa9b](https://www.github.com/Fdawgs/docsmith/commit/e64fa9b636d89290b480d6006e4b63a39473adae))
* **deps-dev:** bump pino-pretty from 4.8.0 to 5.0.0 ([008d6e1](https://www.github.com/Fdawgs/docsmith/commit/008d6e1fbc41e76246d504373ed1013407fe9938))
* **deps:** bump fastify from 3.15.1 to 3.16.2 ([e926a09](https://www.github.com/Fdawgs/docsmith/commit/e926a09c274f3c1c4c580e6cf353249fa686b1de))

## [2.1.0](https://www.github.com/Fdawgs/docsmith/compare/v2.0.4...v2.1.0) (2021-05-25)


### Features

* **routes/rtf/html:** add rtf-to-html route ([#177](https://www.github.com/Fdawgs/docsmith/issues/177)) ([8b0fdd4](https://www.github.com/Fdawgs/docsmith/commit/8b0fdd4c32f032611ed48366974e878d02cc448a))
* **routes/rtf/txt:** add rtf-to-txt route  ([#179](https://www.github.com/Fdawgs/docsmith/issues/179)) ([0ad64bd](https://www.github.com/Fdawgs/docsmith/commit/0ad64bd23dd763bc8f027790d26bb149e0894bea))


### Miscellaneous

* **workflows:** remove `stale.yml` ([ae47b74](https://www.github.com/Fdawgs/docsmith/commit/ae47b74b2d191d161dcaed52ebcddd3d2014cd4b))

### [2.0.4](https://www.github.com/Fdawgs/docsmith/compare/v2.0.3...v2.0.4) (2021-05-25)


### Miscellaneous

* **docker-compose:** update `container_name` ([970f6b9](https://www.github.com/Fdawgs/docsmith/commit/970f6b92a6f6e0ad86963ad65b1fecb4aaf49337))
* **env:** add comments to clarify process load handling ([5313d90](https://www.github.com/Fdawgs/docsmith/commit/5313d90ece00f2764228c6ce3e527134abfa26ee))
* **env:** remove pre-filled  process load env values in template ([4cbd96f](https://www.github.com/Fdawgs/docsmith/commit/4cbd96f65831d7c501fc4e51220425b9c484f984))
* rename repo ([ee2a247](https://www.github.com/Fdawgs/docsmith/commit/ee2a247b904481c8273a5cc9a0979eab11cee53c))


### Dependencies

* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([c9c2afc](https://www.github.com/Fdawgs/docsmith/commit/c9c2afcb394839d1aa82014b53bfe2ded35340b6))
* **deps-dev:** bump eslint-plugin-import from 2.23.2 to 2.23.3 ([297021f](https://www.github.com/Fdawgs/docsmith/commit/297021fd51b2a3e4ef95345a96c4096c7f21ed28))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.8.2 to 35.0.0 ([311f05c](https://www.github.com/Fdawgs/docsmith/commit/311f05c12015e8b1dd9bdc90a564f0a56a7a1b2f))
* **deps-dev:** bump jest from 26.6.3 to 27.0.0 ([7926c95](https://www.github.com/Fdawgs/docsmith/commit/7926c9511c703a9e1ebc5f0deccdc6f391c1f380))
* **deps:** bump dotenv from 9.0.2 to 10.0.0 ([bab8464](https://www.github.com/Fdawgs/docsmith/commit/bab8464e051aa316a07d57d7c97b0ee67311383c))
* **deps:** bump jsdom from 16.5.3 to 16.6.0 ([12be151](https://www.github.com/Fdawgs/docsmith/commit/12be15132faf1d6876d23820463ce9b0bc53315a))

### [2.0.3](https://www.github.com/Fdawgs/docsmith/compare/v2.0.2...v2.0.3) (2021-05-21)


### Continuous Integration

* fix key usage in `action/setup-node` ([f8ccbe1](https://www.github.com/Fdawgs/docsmith/commit/f8ccbe108d36ab8d091836791fe1c77fcc5eb949))


### Miscellaneous

* **ci:** replace `node-version` key with shorter `node` ([#158](https://www.github.com/Fdawgs/docsmith/issues/158)) ([bf6ab0e](https://www.github.com/Fdawgs/docsmith/commit/bf6ab0e5fd82e21b48818ff90532903538bf18e2))
* **dockerfile:** consolidate consecutive `run` instructions ([#160](https://www.github.com/Fdawgs/docsmith/issues/160)) ([a4e6dd6](https://www.github.com/Fdawgs/docsmith/commit/a4e6dd68a6a1cbf5d94c0a7a9f22920ef486b74d))
* **plugins/pdf-to-html:** read direct from body buffer ([152224b](https://www.github.com/Fdawgs/docsmith/commit/152224bb24f0e21c202e8ae63e5028659b512050))
* **plugins/pdf-to-txt:** move tidyhtml dependency to route ([55536c3](https://www.github.com/Fdawgs/docsmith/commit/55536c369a3b919dffa9d4194f94ef403abfd347))
* **plugins/pdf-to-txt:** read direct from body buffer ([479f252](https://www.github.com/Fdawgs/docsmith/commit/479f2523c17b59f12c8dde1d0a9b1a7ac19bd9c7))
* **plugins/pdf-to-txt:** remove unused var ([8c04796](https://www.github.com/Fdawgs/docsmith/commit/8c04796377e825a5a5bac9c9f74a233a45efce37))
* **plugins:** remove redundant eslint comments ([ed65fad](https://www.github.com/Fdawgs/docsmith/commit/ed65fada237efc296db089f5e3ac4008f21ff3fd))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.4 ([5129b9c](https://www.github.com/Fdawgs/docsmith/commit/5129b9c85aef8e5996c4a9f173eda3925a554ce2))
* **deps-dev:** bump @commitlint/config-conventional ([fc3db2c](https://www.github.com/Fdawgs/docsmith/commit/fc3db2c4f52e7b369fe8c238d2ba62a28cff20e8))
* **deps-dev:** bump eslint-plugin-import from 2.22.1 to 2.23.2 ([3be6423](https://www.github.com/Fdawgs/docsmith/commit/3be6423b77080d1db334daefc4e1633b9eb58978))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.0.1 to 34.8.2 ([1b06127](https://www.github.com/Fdawgs/docsmith/commit/1b061273aa211c6061fe3b14be4e5791f234289c))
* **deps:** bump actions/stale from 3.0.18 to 3.0.19 ([5078e95](https://www.github.com/Fdawgs/docsmith/commit/5078e95ddbec40e48a22db62707e924354ce3d08))
* **deps:** bump node-poppler from v3.0.0 to v4.0.0 ([b259b94](https://www.github.com/Fdawgs/docsmith/commit/b259b9481d04d1abc02a2c63d3fcd7629de82814))
* **deps:** bump wagoid/commitlint-github-action from 3.1.3 to 3.1.4 ([0e70612](https://www.github.com/Fdawgs/docsmith/commit/0e70612d07c3128cf84e92e477c22a877afd54ad))

### [2.0.2](https://www.github.com/Fdawgs/docsmith/compare/v2.0.1...v2.0.2) (2021-05-11)


### Bug Fixes

* **config:** `LOG_LEVEL` env variable validation ([404568f](https://www.github.com/Fdawgs/docsmith/commit/404568f7b4234cd53c33f14c3bd264ff1ecfeb2e))


### Documentation

* **readme:** remove in-progress features from confirmed features list ([3cbc55c](https://www.github.com/Fdawgs/docsmith/commit/3cbc55c909f2746fc31ac003bff68d24acd5d334))


### Continuous Integration

* **link-check:** run once a week on monday ([5a08a45](https://www.github.com/Fdawgs/docsmith/commit/5a08a455a9c981702e395ad2a0323c0ecc4a3af7))


### Dependencies

* **deps-dev:** bump autocannon from 7.2.0 to 7.3.0 ([4497f48](https://www.github.com/Fdawgs/docsmith/commit/4497f48990a54108b90138a777f318bb22dc3a3d))
* **deps-dev:** bump eslint from 7.25.0 to 7.26.0 ([595cf33](https://www.github.com/Fdawgs/docsmith/commit/595cf33a16b8c5825a86cba8079b8b10b51edb73))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.0.0 to 34.0.1 ([8374837](https://www.github.com/Fdawgs/docsmith/commit/837483767fbab5a41b373f4bcade4f1700b0e74c))
* **deps-dev:** bump pino-pretty from 4.7.1 to 4.8.0 ([6e3c02d](https://www.github.com/Fdawgs/docsmith/commit/6e3c02d935a7b77b3df19c9344e1ac0eb1a91369))
* **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([#154](https://www.github.com/Fdawgs/docsmith/issues/154)) ([9d09ef3](https://www.github.com/Fdawgs/docsmith/commit/9d09ef32b56f448466371978d57b17d45972ff83))
* **deps:** bump brpaz/hadolint-action from 1.4.0 to 1.5.0 ([700b61a](https://www.github.com/Fdawgs/docsmith/commit/700b61a4565c8091bdabf37448e50051a04557e2))
* **deps:** bump dotenv from 8.2.0 to 9.0.2 ([8b8a2e7](https://www.github.com/Fdawgs/docsmith/commit/8b8a2e742b0036694f250a58dc054407aae35160))
* **deps:** bump fastify-cors from 6.0.0 to 6.0.1 ([dc50e48](https://www.github.com/Fdawgs/docsmith/commit/dc50e482dafb2967a9c63ce9f544979ecc07416a))
* **deps:** bump fastify-floc-off from 1.0.0 to 1.0.1 ([61ab850](https://www.github.com/Fdawgs/docsmith/commit/61ab8503ed85d9399393349c70a2aedf6396b565))
* **deps:** bump file-type from 16.3.0 to 16.4.0 ([d6ec7c1](https://www.github.com/Fdawgs/docsmith/commit/d6ec7c1812eec7a4553e5115ab7d7baf11157c49))
* **deps:** bump fluent-json-schema from 2.0.4 to 3.0.0 ([08d7a65](https://www.github.com/Fdawgs/docsmith/commit/08d7a655a2dc6de968ce8e5cfbdd4809a609b9da))
* **deps:** bump glob from 7.1.6 to 7.1.7 ([4d84537](https://www.github.com/Fdawgs/docsmith/commit/4d8453742f8fe150338c77dca83e664fdc67caec))
* **deps:** bump GoogleCloudPlatform/release-please-action ([19c969a](https://www.github.com/Fdawgs/docsmith/commit/19c969a68510ad73b6b93aac8e0fcf15c116ced7))
* **deps:** bump wagoid/commitlint-github-action from 3.1.0 to 3.1.3 ([02b517d](https://www.github.com/Fdawgs/docsmith/commit/02b517d6e89ce2417cb5c8826b6382ff6191d72f))

### [2.0.1](https://www.github.com/Fdawgs/docsmith/compare/v2.0.0...v2.0.1) (2021-05-04)


### Dependencies

* **deps:** bump fastify from 3.15.0 to 3.15.1 ([2bd34e3](https://www.github.com/Fdawgs/docsmith/commit/2bd34e39ad4e31f8f56fc582f72ff968e5be20fd))
* **deps:** bump GoogleCloudPlatform/release-please-action ([de4e042](https://www.github.com/Fdawgs/docsmith/commit/de4e042de480de97c036500f95527d7efbae138a))


### Documentation

* **readme:** compress duplicate setup steps into a single section ([#139](https://www.github.com/Fdawgs/docsmith/issues/139)) ([c9e8acb](https://www.github.com/Fdawgs/docsmith/commit/c9e8acb1be2efe8426e7348cf2e048eaea3490c5))

## [2.0.0](https://www.github.com/Fdawgs/docsmith/compare/v1.0.0...v2.0.0) (2021-04-30)


### ⚠ BREAKING CHANGES

* remove support for nodejs v10, as it is EOL as of 2021-04-30

### Features

* **config:** allow for rate and process limits to be user configured ([b90829e](https://www.github.com/Fdawgs/docsmith/commit/b90829e6ff6d3ab6fbd7f018d8110658b66054b0))
* **server:** add process-load/503 handling ([df5e17c](https://www.github.com/Fdawgs/docsmith/commit/df5e17c6cf04def7f7afc7a9e55b8b2c3dbd1950))
* **server:** add rate limiter ([f0f531a](https://www.github.com/Fdawgs/docsmith/commit/f0f531a3085233787ea7f20b2849b8d9eca5a2ff))
* **server:** disable google floc support ([1e630cd](https://www.github.com/Fdawgs/docsmith/commit/1e630cd88727bdb6d383cf9fd00159fa3eac8446))


### Bug Fixes

* **env:** add missing cors_allow_credentials variable ([3243de8](https://www.github.com/Fdawgs/docsmith/commit/3243de8b0bfb185476d7f7ed8507a664177a6b69))
* **routes:** hide options routes from swagger docs ([e939c6e](https://www.github.com/Fdawgs/docsmith/commit/e939c6e292e358c66dbed8a58ae80c517303a82b))


### Continuous Integration

* add nodejs v16 to unit test matrix ([afd12cb](https://www.github.com/Fdawgs/docsmith/commit/afd12cb03cd069386ae25dda6e514573d3fac522))
* do not run coveralls steps/jobs on forks ([1772604](https://www.github.com/Fdawgs/docsmith/commit/1772604e6abab87b680ff0257100156dc1ec8955))
* **link-check:** fix skip regex ([a550745](https://www.github.com/Fdawgs/docsmith/commit/a5507458bad35176c2c7331285c3c1eaffb426dd))
* **typoci:** add "pino" to excluded words ([1ad49f7](https://www.github.com/Fdawgs/docsmith/commit/1ad49f7f00f8e1fb7ecfac58c61c025ff6669cd8))


### Miscellaneous

* **env:** add whitespace ([9f54234](https://www.github.com/Fdawgs/docsmith/commit/9f5423473bcca2153d99772abedd280d6abdc6c6))
* remove support for nodejs v10 ([8160087](https://www.github.com/Fdawgs/docsmith/commit/8160087c3a99c277f1eee8001c84e8aeafce973c))


### Documentation

* grammar and readability fixes ([b5a5cb5](https://www.github.com/Fdawgs/docsmith/commit/b5a5cb541dd9abd5517d39b967d68329b9fd6fd2))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.5 to 7.2.0 ([84859b3](https://www.github.com/Fdawgs/docsmith/commit/84859b3418580663e7b33fbcfd4ae38396a9d13e))
* **deps-dev:** bump eslint from 7.23.0 to 7.25.0 ([f8aef5d](https://www.github.com/Fdawgs/docsmith/commit/f8aef5db994a73c9c257132415730561a4cf8735))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.3.0 ([89cd18d](https://www.github.com/Fdawgs/docsmith/commit/89cd18d5f5cc07a07dd72bb848e62ca0ea98a2dd))
* **deps-dev:** bump eslint-plugin-jest from 24.3.4 to 24.3.6 ([21b7774](https://www.github.com/Fdawgs/docsmith/commit/21b7774b04089581bcde8ea7742fefa246d10caa))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.3.0 to 33.0.0 ([67675e7](https://www.github.com/Fdawgs/docsmith/commit/67675e795ab2c87a2383df5cbe076e33b012df83))
* **deps-dev:** bump eslint-plugin-promise from 4.3.1 to 5.1.0 ([4fc40c4](https://www.github.com/Fdawgs/docsmith/commit/4fc40c47582eeeeab46724cf4add869d6b114fd8))
* **deps-dev:** bump faker from 5.5.2 to 5.5.3 ([90364df](https://www.github.com/Fdawgs/docsmith/commit/90364df838a892edd8c51e22db64b97ab6c906c4))
* **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([9da2f5c](https://www.github.com/Fdawgs/docsmith/commit/9da2f5c8eb283aa12f9be99e3d95f575f0a7c1b0))
* **deps:** bump actions/github-script from v3.1.1 to v4.0.2 ([f4c710d](https://www.github.com/Fdawgs/docsmith/commit/f4c710df1c1c1ec61201077f27d4138f9b77569c))
* **deps:** bump actions/upload-artifact from v2.2.2 to v2.2.3 ([e88d734](https://www.github.com/Fdawgs/docsmith/commit/e88d734606c9175116e3d4713c6605f94403f1b2))
* **deps:** bump brpaz/hadolint-action from v1.3.1 to v1.4.0 ([961f53f](https://www.github.com/Fdawgs/docsmith/commit/961f53f1e899b58c85450d4f765b9faeb8814b65))
* **deps:** bump fastify from 3.14.1 to 3.15.0 ([47cf69f](https://www.github.com/Fdawgs/docsmith/commit/47cf69f9dfba5b351e4ea34493d4979d171efa3e))
* **deps:** bump fastify-autoload from 3.6.0 to 3.7.1 ([a17afc1](https://www.github.com/Fdawgs/docsmith/commit/a17afc1298bbc4bdab938b0f6a21a3fbab04b3f2))
* **deps:** bump fastify-cors from 5.2.0 to 6.0.0 ([0867803](https://www.github.com/Fdawgs/docsmith/commit/08678035875737bc255451d8c1812e3f1e3f1e41))
* **deps:** bump fastify-disablecache from 1.0.6 to 2.0.0 ([7a4be40](https://www.github.com/Fdawgs/docsmith/commit/7a4be4039383705e1d0d347dc310dbcbd958916a))
* **deps:** bump fastify-swagger from 4.5.0 to 4.7.0 ([69168bb](https://www.github.com/Fdawgs/docsmith/commit/69168bbf1e459976014cfdcb9a876845a9e6a1ac))
* **deps:** bump GoogleCloudPlatform/release-please-action ([bd8b7d9](https://www.github.com/Fdawgs/docsmith/commit/bd8b7d9cdc1d9df973c527d6788a57c72edad55a))
* **deps:** bump jsdom from 16.5.2 to 16.5.3 ([fead6c2](https://www.github.com/Fdawgs/docsmith/commit/fead6c2197b438870ba5ac072dd8f40fa37a1585))
* **deps:** bump node-poppler from 2.4.1 to 3.0.0 ([22f815a](https://www.github.com/Fdawgs/docsmith/commit/22f815a383b8124645d8bd266e8df2c766a4a9ee))
* **deps:** bump node-unrtf from 1.1.1 to 2.0.0 ([8dc5099](https://www.github.com/Fdawgs/docsmith/commit/8dc50991f5cd36bfb186b672d7e8489a9b835157))
* **deps:** bump pino from 6.11.2 to 6.11.3 ([ccdc74c](https://www.github.com/Fdawgs/docsmith/commit/ccdc74c449c22592739ada5210e236a3c23cd28c))
* **deps:** bump typoci/spellcheck-action from v0.4.0 to v1.1.0 ([dcd73cf](https://www.github.com/Fdawgs/docsmith/commit/dcd73cf4902bcc4b3fa618962f2eb6dfdd8e9652))

## [1.0.0](https://www.github.com/Fdawgs/docsmith/compare/v0.1.0...v1.0.0) (2021-04-06)


### ⚠ BREAKING CHANGES

* `CORS_METHODS` env variable removed

### Features

* add support for cors preflight requests ([e97d974](https://www.github.com/Fdawgs/docsmith/commit/e97d9747034bc10f9a37743770d821b38d34f254))
* **config:** support `access-control-allow-credentials` cors header ([cc8a89c](https://www.github.com/Fdawgs/docsmith/commit/cc8a89cf6ac5209a8b1bf90ca92d3d87d1b9339c))
* **server:** use `strict-origin-when-cross-origin` referrer policy ([22b5311](https://www.github.com/Fdawgs/docsmith/commit/22b5311122ec2fb0306e46c605274d5f9f581f6b))


### Bug Fixes

* **config:** comma-delimited string support for cors origin value ([4e74ecd](https://www.github.com/Fdawgs/docsmith/commit/4e74ecdb25044fab8ba552aef9d8a63878867d22))
* **docker:** use node command over npm ([74c019d](https://www.github.com/Fdawgs/docsmith/commit/74c019d484384a7476c278f45cfc482484954503))


### Miscellaneous

* **env.template:** add note discouraging reflecting cors origin ([e6dcc90](https://www.github.com/Fdawgs/docsmith/commit/e6dcc9076867e3e176a86095397bcc3ff74fcd75))
* **server:** clarify on secure child context ([b61c870](https://www.github.com/Fdawgs/docsmith/commit/b61c87095f6aa065c850b968e5731ef85cd986f1))
* **server:** use new exposed CSP dir from `fastify-helmet` ([9fcdf75](https://www.github.com/Fdawgs/docsmith/commit/9fcdf75c410499f2add833a6563438e4f92f9987))


### Continuous Integration

* add cleanup-run job ([707c983](https://www.github.com/Fdawgs/docsmith/commit/707c9838129cde58c77c185eddab297465228861))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([fbf78ef](https://www.github.com/Fdawgs/docsmith/commit/fbf78ef41b130a8c7c3fa4dc332d568755dd9f6e))
* **deps-dev:** bump @commitlint/config-conventional ([b111594](https://www.github.com/Fdawgs/docsmith/commit/b111594da8e5339fe8d240b2d71c1be87c04089b))
* **deps-dev:** bump eslint-plugin-jest from 24.3.2 to 24.3.4 ([397e2d3](https://www.github.com/Fdawgs/docsmith/commit/397e2d349504b8a743c3fe9b6432cc89f58e600c))
* **deps-dev:** bump faker from 5.5.1 to 5.5.2 ([49993fc](https://www.github.com/Fdawgs/docsmith/commit/49993fc69dc42232bab067c997b3b6739b663693))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([99d3582](https://www.github.com/Fdawgs/docsmith/commit/99d35820a94bcfe5b0b7856c49a21eb92a069d36))
* **deps:** bump fastify-swagger from 4.4.2 to 4.5.0 ([0c6fae8](https://www.github.com/Fdawgs/docsmith/commit/0c6fae8ce37e912f4b1187f521c338c93677fcd0))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([35a6613](https://www.github.com/Fdawgs/docsmith/commit/35a661383d3227ea26136f356ede71319c7f4daa))

## [0.1.0](https://www.github.com/Fdawgs/docsmith/compare/v0.0.3...v0.1.0) (2021-03-30)


### Features

* **routes/pdf/html:** add schema ([57af27e](https://www.github.com/Fdawgs/docsmith/commit/57af27e95893a809ac114df87a9161edc5fff4aa))
* **routes/pdf/txt:** add pdf-to-txt route and plugin ([56fb784](https://www.github.com/Fdawgs/docsmith/commit/56fb784d69dae872e369220efe2b22305ea57bc1))


### Bug Fixes

* **routes/pdf/html:** options not passed to `tidyCss` function ([f0ba18d](https://www.github.com/Fdawgs/docsmith/commit/f0ba18dfff4d2a2360db443897d8e13ccb680c23))
* **routes/pdf/html:** remove body from schema validation ([a8e640a](https://www.github.com/Fdawgs/docsmith/commit/a8e640a7e4123ad0e97e7933ca43f72900176687))


### Continuous Integration

* **automerge:** move automerge job into new workflow ([400b525](https://www.github.com/Fdawgs/docsmith/commit/400b525c2bc6258d461496747f7dcb1bb9f66121))
* **ci:** ignore dependabot prs for commit message linting ([e6620d1](https://www.github.com/Fdawgs/docsmith/commit/e6620d191a614fb1742877fb5cb2ee4eb75b0957))
* **stale:** shorten workflow name ([4d392aa](https://www.github.com/Fdawgs/docsmith/commit/4d392aa1c470b9b115dbfe8d0eba2f61c34f4945))
* **workflows:** run only on push and pulls to master branch ([d8eae28](https://www.github.com/Fdawgs/docsmith/commit/d8eae2892377a9d25d1a52b92c91ba7ed8812c95))


### Dependencies

* bump dependencies ([42736d5](https://www.github.com/Fdawgs/docsmith/commit/42736d5ab7ab947435e4f1d4336d3d4525f75d1a))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([d051c24](https://www.github.com/Fdawgs/docsmith/commit/d051c242378709db742a3d2ae18bf06ecd4fb15b))
* **deps-dev:** bump eslint-plugin-jest from 24.2.1 to 24.3.2 ([3811902](https://www.github.com/Fdawgs/docsmith/commit/38119025437a8f90b3ca8b6c7594c1427a4d51f0))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([caae061](https://www.github.com/Fdawgs/docsmith/commit/caae061d5dc89a1ae1be6f3a43daaa58ad2b67e1))
* **deps-dev:** bump faker from 5.4.0 to 5.5.1 ([4f7fd4a](https://www.github.com/Fdawgs/docsmith/commit/4f7fd4a88c2740c5062bc89c7341b3573a4ffd46))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([44ba684](https://www.github.com/Fdawgs/docsmith/commit/44ba68491a528f5eaec726b56c18ad5141b80063))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([f2f5ce9](https://www.github.com/Fdawgs/docsmith/commit/f2f5ce96ebf88415a3aab912c1374ff8e2c8f906))
* **deps:** bump fastify from 3.14.0 to 3.14.1 ([4d7cc7c](https://www.github.com/Fdawgs/docsmith/commit/4d7cc7c9c73c0ac9dba15725000f21fe614c5a78))
* **deps:** bump fastify-disablecache from 1.0.5 to 1.0.6 ([e192d2c](https://www.github.com/Fdawgs/docsmith/commit/e192d2c54ae81953572a36b05e9e71b661e5b049))
* **deps:** bump fastify-helmet from 5.3.0 to 5.3.1 ([8fab790](https://www.github.com/Fdawgs/docsmith/commit/8fab790cf3f120f946df0a1a67c90cf0bd023ac5))
* **deps:** bump fastify-swagger from 4.4.1 to 4.4.2 ([79819b7](https://www.github.com/Fdawgs/docsmith/commit/79819b7c5df0314e1f51a5996be05cb40de8dd4d))
* **deps:** bump GoogleCloudPlatform/release-please-action ([61d0766](https://www.github.com/Fdawgs/docsmith/commit/61d0766737824b27d87daa1ec833b0763f66a7e5))
* **deps:** bump jsdom from 16.5.0 to 16.5.2 ([2d52f5a](https://www.github.com/Fdawgs/docsmith/commit/2d52f5a0e672e13d75337b2031fc30c5e6decadc))
* **deps:** bump node-poppler from 2.4.0 to 2.4.1 ([6b5e9b4](https://www.github.com/Fdawgs/docsmith/commit/6b5e9b49f03dc53ae25abd722502d7f7ada261cc))
* **deps:** bump node-unrtf from 1.1.0 to 1.1.1 ([f1479b8](https://www.github.com/Fdawgs/docsmith/commit/f1479b89c6bf421a8ef4cb10f4ec3d839a7dc3cc))
* **deps:** bump pino from 6.11.1 to 6.11.2 ([7fc184c](https://www.github.com/Fdawgs/docsmith/commit/7fc184c8f3918ac471492f1078801998238986e4))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([de7b33e](https://www.github.com/Fdawgs/docsmith/commit/de7b33e1c0dc6715e889bb1f1210c60767aaafe3))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([99e8247](https://www.github.com/Fdawgs/docsmith/commit/99e8247b4566aa46716fb22e8efe02d953ea0a32))
* **docker:** remove now optional `version` value ([1ffbfbe](https://www.github.com/Fdawgs/docsmith/commit/1ffbfbe1917a6cdecf2cf3935f06ebd84ad7f55c))


### Miscellaneous

* **config:** document purpose of `if...` statement ([ddee5be](https://www.github.com/Fdawgs/docsmith/commit/ddee5be0bf428030562730c3bf9c09a8fab5018a))
* **config:** move `pino-pretty` config out of script ([5ad9d1b](https://www.github.com/Fdawgs/docsmith/commit/5ad9d1b8608a2217761b5b4a5fcc9cae36e29336))
* **plugins/tidy-css:** update inaccurate description ([65b99cc](https://www.github.com/Fdawgs/docsmith/commit/65b99cc71119713ae3a589d317aece18071a5022))
* **plugins:** add querystring parsing ([ce7bfc5](https://www.github.com/Fdawgs/docsmith/commit/ce7bfc59a230d2b07ab2f48a34b8c243ed94f0e1))
* **prettierignore:** add yarn lock file ([6b45363](https://www.github.com/Fdawgs/docsmith/commit/6b45363fbfdb98dbd906feeea892a427916089d8))
* remove contraction usage in comments ([aa0cb08](https://www.github.com/Fdawgs/docsmith/commit/aa0cb08237e581fd6d2f48613be7bf4b8b97ed28))
* **routes/pdf/html:** replace `let` with `const` ([30b71db](https://www.github.com/Fdawgs/docsmith/commit/30b71dbf187e492c001a1665eb98f98adf243ee2))
* **tests:** standardise test file names ([ecbd01c](https://www.github.com/Fdawgs/docsmith/commit/ecbd01c099350e9869c56c56199e58356011abd8))
* **workflows:** rename ci and perf sections ([b316fab](https://www.github.com/Fdawgs/docsmith/commit/b316fab6d34ecb92b0f141a3eda1cb4ff57038ae))

### [0.0.3](https://www.github.com/Fdawgs/docsmith/compare/v0.0.2...v0.0.3) (2021-03-03)


### Documentation

* **readme:** fix broken link ([283583d](https://www.github.com/Fdawgs/docsmith/commit/283583d22b03f98573091490cf08292bfdbb2b6b))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([856c587](https://www.github.com/Fdawgs/docsmith/commit/856c58799c5057bddb71241ac0b469b5ddd6b9e8))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#51](https://www.github.com/Fdawgs/docsmith/issues/51)) ([ef625c2](https://www.github.com/Fdawgs/docsmith/commit/ef625c2c2910fd9a3143e7f9a7ff667d4ffbfa0a))
* **deps-dev:** bump @commitlint/config-conventional ([3347150](https://www.github.com/Fdawgs/docsmith/commit/3347150c0d54702cde50810aa473d74eb3df5753))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#52](https://www.github.com/Fdawgs/docsmith/issues/52)) ([b9e5971](https://www.github.com/Fdawgs/docsmith/commit/b9e59715316c8e87f694bf530f627d117fd0b76b))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([e75361c](https://www.github.com/Fdawgs/docsmith/commit/e75361c7783b024be267fd7f18333d05557d0b64))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.2 to 32.2.0 ([#49](https://www.github.com/Fdawgs/docsmith/issues/49)) ([d4b48ee](https://www.github.com/Fdawgs/docsmith/commit/d4b48eede00854589862671a6e2afda697c2dc1f))
* **deps-dev:** bump lodash from 4.17.20 to 4.17.21 ([#54](https://www.github.com/Fdawgs/docsmith/issues/54)) ([c34363d](https://www.github.com/Fdawgs/docsmith/commit/c34363de542f1bdd22beb60941dd2dcefdf5e19b))
* **deps:** bump fastify-autoload from 3.4.2 to 3.5.2 ([#53](https://www.github.com/Fdawgs/docsmith/issues/53)) ([e87fb6c](https://www.github.com/Fdawgs/docsmith/commit/e87fb6c2d72d490f7700714173cc4d90cbffe7db))
* **deps:** bump fluent-json-schema from 2.0.3 to 2.0.4 ([#50](https://www.github.com/Fdawgs/docsmith/issues/50)) ([86ad7e5](https://www.github.com/Fdawgs/docsmith/commit/86ad7e56bbf8272b3646f4f8b0915db87c40f343))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([9166abf](https://www.github.com/Fdawgs/docsmith/commit/9166abfbe3a65d904428d24d43458c70be6ca999))
* **deps:** specify minor and hotfix versions ([51bfda0](https://www.github.com/Fdawgs/docsmith/commit/51bfda0ef7814367b40f6c6c51149e95414e82d0))


### Miscellaneous

* add link check workflow ([1934a77](https://www.github.com/Fdawgs/docsmith/commit/1934a7739d5666c19dd5e53b0890584a8c88538e))
* automate release and changelog generation ([8e39a57](https://www.github.com/Fdawgs/docsmith/commit/8e39a579632b082a42f98745e0ad867565ebc9f2))
* **codeql:** remove autobuild action ([97da309](https://www.github.com/Fdawgs/docsmith/commit/97da3098222d9d2475bc836f1e61099b0db02b83))
* **linkcheck:** extend ignored urls ([00cc7a2](https://www.github.com/Fdawgs/docsmith/commit/00cc7a2d360f69c80202e0c080df299cc1c8cb85))
* **lint-check:** compress patterns ([d93527e](https://www.github.com/Fdawgs/docsmith/commit/d93527ed40a0954615e521ff416ba4aa8aede364))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#56](https://www.github.com/Fdawgs/docsmith/issues/56)) ([5dfdcc7](https://www.github.com/Fdawgs/docsmith/commit/5dfdcc7caf87f06c1940b273b8cc4388291a1f2c))
* replace stalebot with github action ([6307221](https://www.github.com/Fdawgs/docsmith/commit/6307221cf390dfddab5d0a308faadbda8a1c010d))
* require `commit-lint` job to pass before automerge ([d52c5e9](https://www.github.com/Fdawgs/docsmith/commit/d52c5e97bf8d02a597933c04534762c541728b6e))
* update repo name and links ([022c44c](https://www.github.com/Fdawgs/docsmith/commit/022c44c0dff50dabbea2d7ac198292af9c22924b))
* **vscode:** remove conflicting prettier ext setting ([6668a8b](https://www.github.com/Fdawgs/docsmith/commit/6668a8bff4f6df541a68988e14f3d459b403ede7))
* **workflows:** move release steps into `cd` workflow ([2c85cfe](https://www.github.com/Fdawgs/docsmith/commit/2c85cfebe4badfcf1e53d2798f65866c00adb5f7))
* **workflows:** remove redundant comments ([6fa604c](https://www.github.com/Fdawgs/docsmith/commit/6fa604c123cf9bbc842c58aa6c0ae4ec70803454))
* **workflows:** rename spellcheck workflow ([dcd27cf](https://www.github.com/Fdawgs/docsmith/commit/dcd27cf0adc718b71dfd4bb3a8b4e517921e9538))
* **workflows:** tidy node-version syntax ([ad3128d](https://www.github.com/Fdawgs/docsmith/commit/ad3128d3f4cdb94427fb0c29b90ecb15c7d95715))

### [0.0.2](https://www.github.com/Fdawgs/docsmith/compare/v0.0.1...v0.0.2) (2021-02-18)

-   docs: shorten links ([a02f9f6](https://github.com/Fdawgs/docsmith/commit/a02f9f6))
-   docs(contributing): add documentation style ([3a42706](https://github.com/Fdawgs/docsmith/commit/3a42706))
-   docs(readme): add ignore scripts arg ([8b08fed](https://github.com/Fdawgs/docsmith/commit/8b08fed))
-   build(deps-dev): add husky for git hook handling ([1821d58](https://github.com/Fdawgs/docsmith/commit/1821d58))
-   build(deps-dev): bump autocannon from 7.0.3 to 7.0.4 (#40) ([02a6605](https://github.com/Fdawgs/docsmith/commit/02a6605)), closes [#40](https://github.com/Fdawgs/docsmith/issues/40)
-   build(deps-dev): bump eslint from 7.19.0 to 7.20.0 (#36) ([c57f1b6](https://github.com/Fdawgs/docsmith/commit/c57f1b6)), closes [#36](https://github.com/Fdawgs/docsmith/issues/36)
-   build(deps-dev): bump eslint-plugin-jest from 24.1.3 to 24.1.5 (#41) ([f9d32e3](https://github.com/Fdawgs/docsmith/commit/f9d32e3)), closes [#41](https://github.com/Fdawgs/docsmith/issues/41)
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.6.0 to 32.0.2 (#42) ([ff5a089](https://github.com/Fdawgs/docsmith/commit/ff5a089)), closes [#42](https://github.com/Fdawgs/docsmith/issues/42)
-   build(deps-dev): bump eslint-plugin-promise from 4.2.1 to 4.3.1 (#30) ([35bcaba](https://github.com/Fdawgs/docsmith/commit/35bcaba)), closes [#30](https://github.com/Fdawgs/docsmith/issues/30)
-   build(deps-dev): bump faker from 5.2.0 to 5.4.0 (#34) ([6aec6cb](https://github.com/Fdawgs/docsmith/commit/6aec6cb)), closes [#34](https://github.com/Fdawgs/docsmith/issues/34)
-   build(deps-dev): bump pino-pretty from 4.4.0 to 4.5.0 ([a4a96b8](https://github.com/Fdawgs/docsmith/commit/a4a96b8))
-   build(deps-dev): pin husky major version ([d8d0978](https://github.com/Fdawgs/docsmith/commit/d8d0978))
-   build(deps): bump actions/cache from v2 to v2.1.4 (#26) ([d5a4712](https://github.com/Fdawgs/docsmith/commit/d5a4712)), closes [#26](https://github.com/Fdawgs/docsmith/issues/26)
-   build(deps): bump env-schema from 2.0.1 to 2.1.0 (#37) ([6848454](https://github.com/Fdawgs/docsmith/commit/6848454)), closes [#37](https://github.com/Fdawgs/docsmith/issues/37)
-   build(deps): bump fastify from 3.11.0 to 3.12.0 (#29) ([b1d774b](https://github.com/Fdawgs/docsmith/commit/b1d774b)), closes [#29](https://github.com/Fdawgs/docsmith/issues/29)
-   build(deps): bump fastify-bearer-auth from 5.0.2 to 5.1.0 (#31) ([49114f4](https://github.com/Fdawgs/docsmith/commit/49114f4)), closes [#31](https://github.com/Fdawgs/docsmith/issues/31)
-   build(deps): bump fastify-disablecache from 1.0.3 to 1.0.4 (#28) ([77fa32f](https://github.com/Fdawgs/docsmith/commit/77fa32f)), closes [#28](https://github.com/Fdawgs/docsmith/issues/28)
-   build(deps): bump fastify-swagger from 4.0.1 to 4.3.1 (#35) ([f036727](https://github.com/Fdawgs/docsmith/commit/f036727)), closes [#35](https://github.com/Fdawgs/docsmith/issues/35)
-   build(deps): bump node-poppler from 2.2.0 to 2.2.1 (#32) ([fe21146](https://github.com/Fdawgs/docsmith/commit/fe21146)), closes [#32](https://github.com/Fdawgs/docsmith/issues/32)
-   build(deps): bump pino from 6.11.0 to 6.11.1 (#33) ([d5af6ff](https://github.com/Fdawgs/docsmith/commit/d5af6ff)), closes [#33](https://github.com/Fdawgs/docsmith/issues/33)
-   build(deps): bump wagoid/commitlint-github-action from v2.0.3 to v2.2.4 (#43) ([3de0718](https://github.com/Fdawgs/docsmith/commit/3de0718)), closes [#43](https://github.com/Fdawgs/docsmith/issues/43)
-   chore: add bsd to list of allowed licenses ([c031ba9](https://github.com/Fdawgs/docsmith/commit/c031ba9))
-   chore: add documentation style link to pr template ([e47b7f6](https://github.com/Fdawgs/docsmith/commit/e47b7f6))
-   chore(scripts): ignore dependency with broken license value ([6162005](https://github.com/Fdawgs/docsmith/commit/6162005))
-   chore(vscode): add `redhat.vscode-yaml` as recommended extension ([bfd2ca5](https://github.com/Fdawgs/docsmith/commit/bfd2ca5))
-   chore(vscode): add `updateImportsOnFileMove` setting ([920c35b](https://github.com/Fdawgs/docsmith/commit/920c35b))
-   chore(vscode): add workspace settings and extensions ([7e87ab9](https://github.com/Fdawgs/docsmith/commit/7e87ab9))
-   ci: add commit-lint job ([7030396](https://github.com/Fdawgs/docsmith/commit/7030396))
-   ci: replace typo ci app with action ([2afa517](https://github.com/Fdawgs/docsmith/commit/2afa517))
-   ci(dependabot): ignore husky updates ([1a70ed0](https://github.com/Fdawgs/docsmith/commit/1a70ed0))
-   style(readme): add linebreaks between badges ([8c3231c](https://github.com/Fdawgs/docsmith/commit/8c3231c))

### 0.0.1 (2021-02-08)

-   chore: add basic route ([179cac8](https://github.com/Fdawgs/docsmith/commit/179cac8))
-   chore: add config and template files ([42f6f20](https://github.com/Fdawgs/docsmith/commit/42f6f20))
-   chore: add encoding to config; add packages etc ([b5cfd8a](https://github.com/Fdawgs/docsmith/commit/b5cfd8a))
-   chore: add operationid to healthcheck route schema ([f066230](https://github.com/Fdawgs/docsmith/commit/f066230))
-   chore: add pull request template ([ceff283](https://github.com/Fdawgs/docsmith/commit/ceff283))
-   chore: fix repo description ([7353f96](https://github.com/Fdawgs/docsmith/commit/7353f96))
-   chore: set allowed list of licenses ([7c3f26e](https://github.com/Fdawgs/docsmith/commit/7c3f26e))
-   chore: stop excess coverage files being generated ([ab2ae1f](https://github.com/Fdawgs/docsmith/commit/ab2ae1f))
-   chore(package): add homepage and bug urls ([7cd4af8](https://github.com/Fdawgs/docsmith/commit/7cd4af8))
-   chore(pm2): use repo name for pm2 instance name ([35e07ca](https://github.com/Fdawgs/docsmith/commit/35e07ca))
-   style: capitalise headings ([18a0f9f](https://github.com/Fdawgs/docsmith/commit/18a0f9f))
-   style(scripts): rename `jest-coverage` to `jest:coverage` ([dd5aef8](https://github.com/Fdawgs/docsmith/commit/dd5aef8))
-   style(tests): use apa header style for describe name params ([be3f9a2](https://github.com/Fdawgs/docsmith/commit/be3f9a2))
-   feat: add env template and env config parser ([3be2a31](https://github.com/Fdawgs/docsmith/commit/3be2a31))
-   feat(config): allow configurable cors headers ([ccd29fe](https://github.com/Fdawgs/docsmith/commit/ccd29fe))
-   feat(plugins): add `embedhtmlimages` decorator plugin ([573513d](https://github.com/Fdawgs/docsmith/commit/573513d))
-   feat(plugins): add `pdftohtml` pre-handler plugin ([bcca135](https://github.com/Fdawgs/docsmith/commit/bcca135))
-   feat(plugins): add `tidycss` decorator plugin ([0866e35](https://github.com/Fdawgs/docsmith/commit/0866e35))
-   feat(plugins): add `tidyhtml` decorator plugin ([b2ea48e](https://github.com/Fdawgs/docsmith/commit/b2ea48e))
-   feat(routes): add healthcheck route ([f49894b](https://github.com/Fdawgs/docsmith/commit/f49894b))
-   feat(src): add app and server ([0a68a6d](https://github.com/Fdawgs/docsmith/commit/0a68a6d))
-   test(plugins/embed-html-images): add check for non-embedded images ([b96f97d](https://github.com/Fdawgs/docsmith/commit/b96f97d))
-   fix(config): stop rotatinglogstream flooding stdout ([f6debe0](https://github.com/Fdawgs/docsmith/commit/f6debe0))
-   fix(plugins/pdf-to-html): add win1252 value fixer ([d2445e1](https://github.com/Fdawgs/docsmith/commit/d2445e1))
-   fix(routes/healthcheck): eslint warnings ([14b897f](https://github.com/Fdawgs/docsmith/commit/14b897f))
-   refactor(config): update openapi docs from v2.\*.\* to v3.\*.\* ([9936aec](https://github.com/Fdawgs/docsmith/commit/9936aec))
-   refactor(server): use default helmet referrer policy ([ef384a4](https://github.com/Fdawgs/docsmith/commit/ef384a4))
-   ci: add ci workflow ([000cc8c](https://github.com/Fdawgs/docsmith/commit/000cc8c))
-   ci: add codeql-analysis workflow ([098a3ea](https://github.com/Fdawgs/docsmith/commit/098a3ea))
-   ci: add linux and macos installs ([f4e92c9](https://github.com/Fdawgs/docsmith/commit/f4e92c9))
-   ci(typo-ci): add `ydh` to list of excluded words ([97f6f5d](https://github.com/Fdawgs/docsmith/commit/97f6f5d))
-   docs: bump coc from v1.4.0 to v2.0.0 ([798d906](https://github.com/Fdawgs/docsmith/commit/798d906))
-   docs: update contact email ([871ba6d](https://github.com/Fdawgs/docsmith/commit/871ba6d))
-   docs(readme): add deployment steps ([e9d2d14](https://github.com/Fdawgs/docsmith/commit/e9d2d14))
-   docs(readme): fix spacing ([ace2613](https://github.com/Fdawgs/docsmith/commit/ace2613))
-   docs(readme): remove superfluous text in pm2 install instructions ([95883eb](https://github.com/Fdawgs/docsmith/commit/95883eb))
-   build: remove `yarn` as package manager, revert to `npm` ([a418176](https://github.com/Fdawgs/docsmith/commit/a418176))
-   build(deps-dev): bump autocannon from 7.0.1 to 7.0.3 ([abceee7](https://github.com/Fdawgs/docsmith/commit/abceee7))
-   build(deps-dev): bump eslint from 7.18.0 to 7.19.0 ([a1e60a5](https://github.com/Fdawgs/docsmith/commit/a1e60a5))
-   build(deps-dev): bump eslint-config-prettier from 7.1.0 to 7.2.0 ([6ce2ffd](https://github.com/Fdawgs/docsmith/commit/6ce2ffd))
-   build(deps-dev): bump eslint-plugin-jsdoc from 31.0.6 to 31.6.0 ([e22df68](https://github.com/Fdawgs/docsmith/commit/e22df68))
-   build(deps-dev): bump faker from 5.1.0 to 5.2.0 ([424f7f9](https://github.com/Fdawgs/docsmith/commit/424f7f9))
-   build(deps-dev): bump pino-pretty from 4.3.0 to 4.4.0 ([ab04849](https://github.com/Fdawgs/docsmith/commit/ab04849))
-   build(deps-dev): remove coveralls, replaced by github action ([518d14f](https://github.com/Fdawgs/docsmith/commit/518d14f))
-   build(deps): bump fastify from 3.10.1 to 3.11.0 ([55b787a](https://github.com/Fdawgs/docsmith/commit/55b787a))
-   build(deps): bump fastify-autoload from 3.4.0 to 3.4.2 ([b9f01cf](https://github.com/Fdawgs/docsmith/commit/b9f01cf))
-   build(deps): bump fastify-cors from 5.1.0 to 5.2.0 ([5849e66](https://github.com/Fdawgs/docsmith/commit/5849e66))
-   build(deps): bump fastify-disablecache from 1.0.1 to 1.0.3 ([e6fdd92](https://github.com/Fdawgs/docsmith/commit/e6fdd92))
-   build(deps): bump fastify-helmet from 5.1.0 to 5.2.0 ([c7855d1](https://github.com/Fdawgs/docsmith/commit/c7855d1))
-   build(deps): bump fastify-swagger from 3.5.0 to 4.0.1 ([2d0ec53](https://github.com/Fdawgs/docsmith/commit/2d0ec53))
-   build(deps): bump helmet from 4.3.1 to 4.4.1 ([85a952f](https://github.com/Fdawgs/docsmith/commit/85a952f))
-   build(deps): bump node-poppler from 2.1.2 to 2.2.0 ([b8ff673](https://github.com/Fdawgs/docsmith/commit/b8ff673))
-   build(deps): bump node-unrtf from 1.0.6 to 1.0.7 ([7f0ab3c](https://github.com/Fdawgs/docsmith/commit/7f0ab3c))
-   build(docker): add basic docker-compose and dockerfile ([b2c7375](https://github.com/Fdawgs/docsmith/commit/b2c7375))
-   Initial commit ([499f286](https://github.com/Fdawgs/docsmith/commit/499f286))
