# Changelog

All notable changes to this project will be documented in this file.

## [11.0.0](https://github.com/Fdawgs/docsmith/compare/v10.3.0...v11.0.0) (2023-06-24)


### ⚠ BREAKING CHANGES

* outputEncoding param removed from pdf/html and pdf/txt routes
* **routes:** `/dotx/txt` route removed, use `/docx/txt` instead
* **routes:** `/dotx/html` route removed, use `/docx/html` instead
* **routes:** `/dot/txt` route removed, use `/doc/txt` instead

### Features

* **routes:** add docm and dotm support to docx/html route ([#1521](https://github.com/Fdawgs/docsmith/issues/1521)) ([4e12c9d](https://github.com/Fdawgs/docsmith/commit/4e12c9dfffac15624b331415c8d8ffda105a2a3c))
* **routes:** add docm and dotm support to docx/txt route ([#1523](https://github.com/Fdawgs/docsmith/issues/1523)) ([fc0665b](https://github.com/Fdawgs/docsmith/commit/fc0665b9391858dbee9d75acc2a82414bc89d52e))


### Bug fixes

* **plugins/tidy-html:** do not throw if innerhtml missing ([7465016](https://github.com/Fdawgs/docsmith/commit/7465016ac9fbc467cc9167fdaddcfdd8f3f7822d))
* **routes/docs:** stop all redoc files from being served ([d90c65a](https://github.com/Fdawgs/docsmith/commit/d90c65a43e1b773c211e025f1ec110db41587220))


### Improvements

* **plugins/pdf-to-html:** less verbose html node removal ([7b44fac](https://github.com/Fdawgs/docsmith/commit/7b44face1cbf4664a23153543843bfc2079306a1))
* **plugins/pdf-to-txt:** remove optional chaining for first level property ([5023c8c](https://github.com/Fdawgs/docsmith/commit/5023c8c0c7f5fe91f1f3589a86fdcd7e501f6242))
* **plugins:** use recursive option with `fs.mkdir()` ([df98f25](https://github.com/Fdawgs/docsmith/commit/df98f25ab9cee06f997de0ba55c2f5590f028659))
* remove `outputEncoding` param for pdf routes ([#1524](https://github.com/Fdawgs/docsmith/issues/1524)) ([cda68b4](https://github.com/Fdawgs/docsmith/commit/cda68b46d92119d607f1361736f85f43b9e264c3))
* **routes:** add dot support to doc/txt route ([#1520](https://github.com/Fdawgs/docsmith/issues/1520)) ([e1b0ad1](https://github.com/Fdawgs/docsmith/commit/e1b0ad1e64f0fd2504084558532984ff1cc6a199))
* **server:** remove redundant `await` ([49a2d74](https://github.com/Fdawgs/docsmith/commit/49a2d74fb43cdec5fed8862d9717ca19d1e21a46))


### Continuous integration

* **dependabot:** ignore fix-utf8 esm versions ([38edf5e](https://github.com/Fdawgs/docsmith/commit/38edf5ee18c5a816427549df37500b48092845af))
* **deps:** bump coverallsapp/github-action from 2.1.2 to 2.2.0 ([#1537](https://github.com/Fdawgs/docsmith/issues/1537)) ([d0ab2dc](https://github.com/Fdawgs/docsmith/commit/d0ab2dcccf28d2cccef10f2765e10a4937248ed8))


### Miscellaneous

* **.env.template:** punctuation fixes ([7bb13ed](https://github.com/Fdawgs/docsmith/commit/7bb13edee3e0e98ce6cf4786c1ba02b4d57d95d3))
* **.eslintrc:** enable additional jest plugin rules ([b6d58e9](https://github.com/Fdawgs/docsmith/commit/b6d58e9258b7eae88bb67748bcb4ae1417cd8420))
* **.eslintrc:** enable additional jsdoc plugin rules ([94a3806](https://github.com/Fdawgs/docsmith/commit/94a380634ebdf2772e08dd68e2f85562871e705f))
* **.eslintrc:** only use jest plugin to lint test-related files ([c23fb41](https://github.com/Fdawgs/docsmith/commit/c23fb41412762dc3839b2bc4d89f1e48dc8ea39c))
* enable fluent-json-schema type definitions ([43d08fc](https://github.com/Fdawgs/docsmith/commit/43d08fc7f0afe363558699b280f9d512c4d58096))
* import fastify type for server jsdoc params ([1353778](https://github.com/Fdawgs/docsmith/commit/1353778ebb72a0f0071a404b6c7818a64a299d92))
* **package:** remove global jest mock config values ([#1534](https://github.com/Fdawgs/docsmith/issues/1534)) ([cee9430](https://github.com/Fdawgs/docsmith/commit/cee9430b795d00a95c2222ef1a231262283b99b6))
* **package:** set jest coverage threshold ([580faa3](https://github.com/Fdawgs/docsmith/commit/580faa3d5e049f6762618861ee20e39ca2c936a4))
* **plugins:** update inaccurate jsdoc param defaults ([62b725f](https://github.com/Fdawgs/docsmith/commit/62b725fd4bdd5e5819456851686e5725697772e7))
* return types don't support promise rejection values ([87f55c7](https://github.com/Fdawgs/docsmith/commit/87f55c7bc3882255de271608b3b2febb89f0854e))


### Dependencies

* **deps-dev:** bump eslint from 8.41.0 to 8.42.0 ([#1530](https://github.com/Fdawgs/docsmith/issues/1530)) ([704841f](https://github.com/Fdawgs/docsmith/commit/704841f1a4a31a863807ac19cfb9a0d7cd78654f))
* **deps-dev:** bump eslint from 8.42.0 to 8.43.0 ([#1538](https://github.com/Fdawgs/docsmith/issues/1538)) ([80410ef](https://github.com/Fdawgs/docsmith/commit/80410ef22a496a2bace71dc888442ec7fda9290c))
* **deps-dev:** bump eslint-plugin-jest from 27.2.1 to 27.2.2 ([#1546](https://github.com/Fdawgs/docsmith/issues/1546)) ([a9fbd06](https://github.com/Fdawgs/docsmith/commit/a9fbd066fa3e749f03e2a4d429fb0222f1884d8b))
* **deps-dev:** bump eslint-plugin-jsdoc from 45.0.0 to 46.1.0 ([#1526](https://github.com/Fdawgs/docsmith/issues/1526)) ([17862c3](https://github.com/Fdawgs/docsmith/commit/17862c32732cca42167ed53d48b805be72b88173))
* **deps-dev:** bump eslint-plugin-jsdoc from 46.1.0 to 46.2.0 ([#1532](https://github.com/Fdawgs/docsmith/issues/1532)) ([e98bcea](https://github.com/Fdawgs/docsmith/commit/e98bceaca1483fb7b70c3cd6e08f1b80d1800f47))
* **deps-dev:** bump eslint-plugin-jsdoc from 46.2.0 to 46.2.6 ([#1541](https://github.com/Fdawgs/docsmith/issues/1541)) ([dd11618](https://github.com/Fdawgs/docsmith/commit/dd11618870c2219a858e0ae73e012a92590f0945))
* **deps-dev:** bump playwright from 1.34.3 to 1.35.1 ([#1540](https://github.com/Fdawgs/docsmith/issues/1540)) ([6b6db16](https://github.com/Fdawgs/docsmith/commit/6b6db16233d6030ac77d06b98b04f4d56fd4d3c7))
* **deps:** bump @fastify/accepts from 4.1.0 to 4.2.0 ([#1547](https://github.com/Fdawgs/docsmith/issues/1547)) ([49e1c24](https://github.com/Fdawgs/docsmith/commit/49e1c24031183f50670b01a32b47f7061ebeb004))
* **deps:** bump @fastify/rate-limit from 8.0.0 to 8.0.1 ([#1539](https://github.com/Fdawgs/docsmith/issues/1539)) ([efe556f](https://github.com/Fdawgs/docsmith/commit/efe556f9e3256c5367e2900a4405990fcce0245c))
* **deps:** bump @fastify/swagger from 8.5.1 to 8.6.0 ([#1543](https://github.com/Fdawgs/docsmith/issues/1543)) ([895749f](https://github.com/Fdawgs/docsmith/commit/895749f0db2cf045481db4c583e1c09ad5e43f41))
* **deps:** bump dotenv from 16.1.0 to 16.1.3 ([#1525](https://github.com/Fdawgs/docsmith/issues/1525)) ([3849bca](https://github.com/Fdawgs/docsmith/commit/3849bca96051bd80ddf07795e9428c8772f405a0))
* **deps:** bump dotenv from 16.1.3 to 16.3.1 ([#1545](https://github.com/Fdawgs/docsmith/issues/1545)) ([7dc0e20](https://github.com/Fdawgs/docsmith/commit/7dc0e20015de10174d833c23a1b8eb8918691e9c))
* **deps:** bump fastify from 4.17.0 to 4.18.0 ([#1542](https://github.com/Fdawgs/docsmith/issues/1542)) ([af836c0](https://github.com/Fdawgs/docsmith/commit/af836c080272e2071cbe01e38f3b4bd4b1001e39))
* **deps:** bump fastify-disablecache from 3.1.2 to 3.1.3 ([#1552](https://github.com/Fdawgs/docsmith/issues/1552)) ([57533b8](https://github.com/Fdawgs/docsmith/commit/57533b867c2a2c3be1fb63c59fbca15c94b5dc84))
* **deps:** bump fastify-floc-off from 2.1.2 to 2.1.3 ([#1550](https://github.com/Fdawgs/docsmith/issues/1550)) ([b93e51c](https://github.com/Fdawgs/docsmith/commit/b93e51c2678f4962f5241b0789593a8aa02caaf5))
* **deps:** bump fastify-json-to-xml from 1.1.3 to 1.1.4 ([#1554](https://github.com/Fdawgs/docsmith/issues/1554)) ([606bc48](https://github.com/Fdawgs/docsmith/commit/606bc48b140c279dd3b0fcced583f07485e01c79))
* **deps:** bump fix-utf8 from 1.1.2 to 1.2.1 ([0c72da8](https://github.com/Fdawgs/docsmith/commit/0c72da871ad9a4b15b039bfd15322f055dbc9ce4))
* **deps:** bump glob from 10.2.6 to 10.3.0 ([#1544](https://github.com/Fdawgs/docsmith/issues/1544)) ([b793261](https://github.com/Fdawgs/docsmith/commit/b7932618a08466f57875237e28a36181299106cd))
* **deps:** bump node-poppler from 6.2.3 to 6.2.4 ([#1529](https://github.com/Fdawgs/docsmith/issues/1529)) ([1187f87](https://github.com/Fdawgs/docsmith/commit/1187f87316444a14a6602606c4da0fb04598fa35))
* **deps:** bump node-poppler from 6.2.4 to 6.2.5 ([#1553](https://github.com/Fdawgs/docsmith/issues/1553)) ([74e4ffa](https://github.com/Fdawgs/docsmith/commit/74e4ffa755950505598cb58d97bdbb8e9856f8d4))
* **deps:** bump node-unrtf from 3.1.3 to 3.1.4 ([#1531](https://github.com/Fdawgs/docsmith/issues/1531)) ([ffeac3f](https://github.com/Fdawgs/docsmith/commit/ffeac3fcb8668c0f30818c8bd9cb6626a0c25adc))
* **deps:** bump node-unrtf from 3.1.4 to 3.1.5 ([#1551](https://github.com/Fdawgs/docsmith/issues/1551)) ([e7c3af9](https://github.com/Fdawgs/docsmith/commit/e7c3af9f7958d1db03e54d3cd17763e3344fc816))
* **deps:** bump tesseract.js from 4.0.6 to 4.1.0 ([#1533](https://github.com/Fdawgs/docsmith/issues/1533)) ([69988e0](https://github.com/Fdawgs/docsmith/commit/69988e0a79e330b84fc66d1c2e55509fdb41d405))
* **deps:** bump tesseract.js from 4.1.0 to 4.1.1 ([#1548](https://github.com/Fdawgs/docsmith/issues/1548)) ([51803dd](https://github.com/Fdawgs/docsmith/commit/51803dd222c419d7babaa1f1d1cc70655f45e881))

## [10.3.0](https://github.com/Fdawgs/docsmith/compare/v10.2.1...v10.3.0) (2023-05-30)


### Features

* **routes:** add dot-to-txt and dotx-to-txt routes ([#1511](https://github.com/Fdawgs/docsmith/issues/1511)) ([d30d9b3](https://github.com/Fdawgs/docsmith/commit/d30d9b3baaa3b01e60d2fbf6f5f29b828457478f))
* **routes:** add dotx-to-html route ([dbf8734](https://github.com/Fdawgs/docsmith/commit/dbf8734feb7546941d25fd387926fd1ef76a4544))


### Bug fixes

* **routes/dotx/txt:** body content ([71f5fdc](https://github.com/Fdawgs/docsmith/commit/71f5fdca79293c60f76661b5e4277d12c30a6e18))


### Improvements

* **app:** use `force` option to ignore enoent exceptions ([b547ee5](https://github.com/Fdawgs/docsmith/commit/b547ee539c73e94520c14aac9a921d66ec9cba07))
* **routes:** use consumes array from schemas ([2ebc8f6](https://github.com/Fdawgs/docsmith/commit/2ebc8f66e88d312a471bf6cd562fbbcebf2adfe4))


### Documentation

* **readme:** change conversion list to table ([45a2317](https://github.com/Fdawgs/docsmith/commit/45a2317ad1d2b1f8ea0c2996f206273117249009))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.6.3 to 17.6.5 ([#1518](https://github.com/Fdawgs/docsmith/issues/1518)) ([7358ca1](https://github.com/Fdawgs/docsmith/commit/7358ca198fad3204b78cd101c244b52439ea6510))
* **deps-dev:** bump @commitlint/config-conventional ([#1516](https://github.com/Fdawgs/docsmith/issues/1516)) ([cfa7e96](https://github.com/Fdawgs/docsmith/commit/cfa7e96008e4264118333b8f9fdad4c61fded35d))
* **deps-dev:** bump eslint-plugin-jsdoc from 44.2.7 to 45.0.0 ([#1517](https://github.com/Fdawgs/docsmith/issues/1517)) ([7164e00](https://github.com/Fdawgs/docsmith/commit/7164e00da99df9bf942762592f6d857b6d8d9e22))
* **deps:** bump dotenv from 16.0.3 to 16.1.0 ([#1515](https://github.com/Fdawgs/docsmith/issues/1515)) ([5c871cb](https://github.com/Fdawgs/docsmith/commit/5c871cb55360830d6269a3a52f5d6987aaf04616))
* **deps:** bump mammoth from 1.5.1 to 1.6.0 ([#1519](https://github.com/Fdawgs/docsmith/issues/1519)) ([cb81c47](https://github.com/Fdawgs/docsmith/commit/cb81c471dcc1f8e389101a27469eb0d96c394de7))

## [10.2.1](https://github.com/Fdawgs/docsmith/compare/v10.2.0...v10.2.1) (2023-05-27)


### Miscellaneous

* fix inline comment style ([f75d177](https://github.com/Fdawgs/docsmith/commit/f75d17799d5938d4bc556eb42fde00a832916b72))
* use nouns for leading word in function description tags ([#1494](https://github.com/Fdawgs/docsmith/issues/1494)) ([dcee4b5](https://github.com/Fdawgs/docsmith/commit/dcee4b5eb2e2f21be9f4190e7971fdbd92907f43))


### Improvements

* **plugins:** merge doc-to-txt and docx-to-txt plugins ([04f8455](https://github.com/Fdawgs/docsmith/commit/04f845521c1340d1b91628cef96fa39c35f8bae6))
* **server:** remove outdated sensible plugin option ([9f857e7](https://github.com/Fdawgs/docsmith/commit/9f857e74f40dd441dfe900060c41593bd8f9182c))
* **server:** remove redundant `await` ([#1491](https://github.com/Fdawgs/docsmith/issues/1491)) ([01ba28e](https://github.com/Fdawgs/docsmith/commit/01ba28e12246f5703fcee1a8919f4487df58d62f))


### Bug fixes

* **plugins/doc-to-txt:** remove excess whitespace in header and footer ([ef6f065](https://github.com/Fdawgs/docsmith/commit/ef6f065bb325173e4493054a977698615d2389a3))
* **plugins/docx-to-html:** remove excess whitespace in header and footer ([#1492](https://github.com/Fdawgs/docsmith/issues/1492)) ([4371e9a](https://github.com/Fdawgs/docsmith/commit/4371e9a30115a1d5716330a861b2b566b37df099))
* **server:** handle arrays when pruning csp headers ([c7415a0](https://github.com/Fdawgs/docsmith/commit/c7415a04aed44854530aeca838345df2d59f8f07))
* **server:** stop routes from accepting default text and json requests ([#1489](https://github.com/Fdawgs/docsmith/issues/1489)) ([e89a563](https://github.com/Fdawgs/docsmith/commit/e89a56343a963faac3ee44bb0fe7de0a84f803cd))


### Dependencies

* **deps-dev:** bump esbuild-plugin-glob from 2.2.1 to 2.2.2 ([d6e98c6](https://github.com/Fdawgs/docsmith/commit/d6e98c6216c8a1e957f443ca90e9bdbf86d93afc))
* **deps-dev:** bump eslint-plugin-jsdoc from 44.2.4 to 44.2.7 ([#1497](https://github.com/Fdawgs/docsmith/issues/1497)) ([799ffcb](https://github.com/Fdawgs/docsmith/commit/799ffcb89d230df0cc81872fef165c1bfd6ec4a1))
* **deps-dev:** bump playwright from 1.34.0 to 1.34.3 ([#1498](https://github.com/Fdawgs/docsmith/issues/1498)) ([437cae6](https://github.com/Fdawgs/docsmith/commit/437cae6fb691809ececcbc8b32aefbd8aac45071))
* **deps:** bump @fastify/compress from 6.3.0 to 6.4.0 ([#1500](https://github.com/Fdawgs/docsmith/issues/1500)) ([2f119a2](https://github.com/Fdawgs/docsmith/commit/2f119a2844ec8f136a88c43fdf27d05d666d06ca))
* **deps:** bump @fastify/cors from 8.2.1 to 8.3.0 ([#1501](https://github.com/Fdawgs/docsmith/issues/1501)) ([fb7e708](https://github.com/Fdawgs/docsmith/commit/fb7e708872862d3a0a60084430116840638ba2e2))
* **deps:** bump @fastify/static from 6.10.1 to 6.10.2 ([#1496](https://github.com/Fdawgs/docsmith/issues/1496)) ([e25f598](https://github.com/Fdawgs/docsmith/commit/e25f5982e2780c19d090a8cc10873c282231376d))
* **deps:** bump @fastify/swagger from 8.4.0 to 8.5.1 ([#1502](https://github.com/Fdawgs/docsmith/issues/1502)) ([c9bd24a](https://github.com/Fdawgs/docsmith/commit/c9bd24a93581239aa21f7ca460b3e75f01077c0b))
* **deps:** bump fastify-json-to-xml from 1.1.2 to 1.1.3 ([#1504](https://github.com/Fdawgs/docsmith/issues/1504)) ([9ee2e8d](https://github.com/Fdawgs/docsmith/commit/9ee2e8d91ce590b33a25f45181394a3c63ccd1d0))
* **deps:** bump glob from 10.2.5 to 10.2.6 ([#1499](https://github.com/Fdawgs/docsmith/issues/1499)) ([0be1205](https://github.com/Fdawgs/docsmith/commit/0be120554f5c8988597f6012b1aa7922fabbf330))
* **deps:** bump jsdom from 22.0.0 to 22.1.0 ([#1503](https://github.com/Fdawgs/docsmith/issues/1503)) ([8e89692](https://github.com/Fdawgs/docsmith/commit/8e896922f2e3f77b584c03c4062f0b8d92073577))
* **deps:** bump transistive dependencies ([d64c2d3](https://github.com/Fdawgs/docsmith/commit/d64c2d303d64ba63f4c8f58573eb9f7289c64c44))

## [10.2.0](https://github.com/Fdawgs/docsmith/compare/v10.1.1...v10.2.0) (2023-05-20)


### Features

* **routes:** add html-to-txt route ([#1478](https://github.com/Fdawgs/docsmith/issues/1478)) ([41be9ce](https://github.com/Fdawgs/docsmith/commit/41be9cea3b5303835e4f743d17ffd1432a8613ec))


### Dependencies

* **deps-dev:** bump eslint from 8.40.0 to 8.41.0 ([#1480](https://github.com/Fdawgs/docsmith/issues/1480)) ([0ed76de](https://github.com/Fdawgs/docsmith/commit/0ed76deee4685633b7aea9b2a088f98fe116345e))
* **deps-dev:** bump eslint-plugin-jsdoc from 44.2.3 to 44.2.4 ([#1481](https://github.com/Fdawgs/docsmith/issues/1481)) ([a3eacb5](https://github.com/Fdawgs/docsmith/commit/a3eacb5313116d7384432990807b0756157ece4d))
* **deps-dev:** bump playwright from 1.33.0 to 1.34.0 ([#1486](https://github.com/Fdawgs/docsmith/issues/1486)) ([c23b1ba](https://github.com/Fdawgs/docsmith/commit/c23b1baf6f663287b6120b5ee0336e8a4b0667b7))
* **deps:** bump @fastify/compress from 6.2.1 to 6.3.0 ([#1482](https://github.com/Fdawgs/docsmith/issues/1482)) ([cb32c23](https://github.com/Fdawgs/docsmith/commit/cb32c2358b17bb1a174f29c2cbb780d50df3f345))
* **deps:** bump @fastify/swagger from 8.3.1 to 8.4.0 ([#1485](https://github.com/Fdawgs/docsmith/issues/1485)) ([2464882](https://github.com/Fdawgs/docsmith/commit/246488262d20d87b23384de2a045710331a3aa18))
* **deps:** bump glob from 10.2.3 to 10.2.5 ([#1483](https://github.com/Fdawgs/docsmith/issues/1483)) ([2529c5e](https://github.com/Fdawgs/docsmith/commit/2529c5e80c1adcf1f9f45dab7d0260caf76c7ff4))
* **deps:** bump tesseract.js from 4.0.5 to 4.0.6 ([#1484](https://github.com/Fdawgs/docsmith/issues/1484)) ([71ed415](https://github.com/Fdawgs/docsmith/commit/71ed4157dd6ecf5319fc75245088b859b6008309))


### Bug fixes

* **routes/rtf/txt:** cleaner resulting txt ([#1487](https://github.com/Fdawgs/docsmith/issues/1487)) ([33594c7](https://github.com/Fdawgs/docsmith/commit/33594c74e7970e23dee9d34160fe9d4fe33a6853))

## [10.1.1](https://github.com/Fdawgs/docsmith/compare/v10.1.0...v10.1.1) (2023-05-13)


### Bug fixes

* **plugins/docx-to-html:** add header and footer to response payload ([0d2e0a3](https://github.com/Fdawgs/docsmith/commit/0d2e0a35670ceccb989ec5dd3fc1378c033c49f9))
* **plugins/docx-to-txt:** add header and footer to response payload ([e0b8519](https://github.com/Fdawgs/docsmith/commit/e0b8519458b3c02068e8fd552d4f19e9e38d070b))


### Miscellaneous

* **.vscode:** add debugger launch config ([#1472](https://github.com/Fdawgs/docsmith/issues/1472)) ([f3d4677](https://github.com/Fdawgs/docsmith/commit/f3d4677ee25bd091f6935ca534eafad748f9e40e))


### Dependencies

* **deps-dev:** bump esbuild from 0.17.18 to 0.17.19 ([#1477](https://github.com/Fdawgs/docsmith/issues/1477)) ([3d4e143](https://github.com/Fdawgs/docsmith/commit/3d4e1438f56a6fdfeee510fafe5e0264eb61ec36))
* **deps-dev:** bump eslint-plugin-jsdoc from 44.0.0 to 44.2.3 ([#1476](https://github.com/Fdawgs/docsmith/issues/1476)) ([f62c100](https://github.com/Fdawgs/docsmith/commit/f62c100d94e284a253ed20ea7113747c98025393))
* **deps:** bump glob from 10.2.2 to 10.2.3 ([#1475](https://github.com/Fdawgs/docsmith/issues/1475)) ([04ea0aa](https://github.com/Fdawgs/docsmith/commit/04ea0aae82d88730c31bafe29aee32a54a501e4a))
* **deps:** bump node-poppler from 6.2.2 to 6.2.3 ([#1473](https://github.com/Fdawgs/docsmith/issues/1473)) ([21301a5](https://github.com/Fdawgs/docsmith/commit/21301a53d901a334d3a7c6734205b5e792a9edb3))
* **deps:** bump node-unrtf from 3.1.2 to 3.1.3 ([#1474](https://github.com/Fdawgs/docsmith/issues/1474)) ([99ba936](https://github.com/Fdawgs/docsmith/commit/99ba936be79f47f44f64036ecd3318be13369fcc))

## [10.1.0](https://github.com/Fdawgs/docsmith/compare/v10.0.15...v10.1.0) (2023-05-08)


### Features

* **routes:** add doc-to-txt route ([#1445](https://github.com/Fdawgs/docsmith/issues/1445)) ([66a7739](https://github.com/Fdawgs/docsmith/commit/66a7739ad8a1aa4dd8e499fabe8965aac2cc5ab3))


### Continuous integration

* **ci:** add node 20 to test matrix ([#1452](https://github.com/Fdawgs/docsmith/issues/1452)) ([1746e7c](https://github.com/Fdawgs/docsmith/commit/1746e7cbec7bc975411c3b197adb670e8a87e0e7))


### Dependencies

* **deps-dev:** bump eslint from 8.39.0 to 8.40.0 ([#1456](https://github.com/Fdawgs/docsmith/issues/1456)) ([6a0bf7f](https://github.com/Fdawgs/docsmith/commit/6a0bf7f32b65cb68bea8752b03f4483e3681613a))
* **deps-dev:** bump eslint-plugin-jsdoc from 43.1.1 to 44.0.0 ([#1458](https://github.com/Fdawgs/docsmith/issues/1458)) ([baeefa6](https://github.com/Fdawgs/docsmith/commit/baeefa619e156829b4e2b252bde7d3b2bd5c8d41))
* **deps:** bump @fastify/helmet from 10.1.0 to 10.1.1 ([#1459](https://github.com/Fdawgs/docsmith/issues/1459)) ([fa4de26](https://github.com/Fdawgs/docsmith/commit/fa4de26a0e7126bd4dc6411f092a602d6f4e45a0))
* **deps:** bump pino from 8.12.1 to 8.14.1 ([#1457](https://github.com/Fdawgs/docsmith/issues/1457)) ([4b36540](https://github.com/Fdawgs/docsmith/commit/4b365404b5fec34bbbd677a73f2cc8980a8ce221))
* **deps:** bump transistive dependencies ([#1462](https://github.com/Fdawgs/docsmith/issues/1462)) ([b9efd46](https://github.com/Fdawgs/docsmith/commit/b9efd4654eb2bdf4a3a70f334851d6f15e08b882))

## [10.0.15](https://github.com/Fdawgs/docsmith/compare/v10.0.14...v10.0.15) (2023-05-05)


### Continuous integration

* **cd:** remove dev dependencies from package-lock.json ([#1413](https://github.com/Fdawgs/docsmith/issues/1413)) ([fcb4ec3](https://github.com/Fdawgs/docsmith/commit/fcb4ec319c70a105ac183c5457520ed8a48c7de4))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.6.1 to 17.6.3 ([#1450](https://github.com/Fdawgs/docsmith/issues/1450)) ([23c0751](https://github.com/Fdawgs/docsmith/commit/23c0751255427ff9d7fe37f9fb9ed33a0801742c))
* **deps-dev:** bump @commitlint/config-conventional ([#1448](https://github.com/Fdawgs/docsmith/issues/1448)) ([08d9ae1](https://github.com/Fdawgs/docsmith/commit/08d9ae17f313ef17d6f2585ec73cbe45c8f5b6cc))
* **deps-dev:** bump autocannon from 7.10.0 to 7.11.0 ([#1446](https://github.com/Fdawgs/docsmith/issues/1446)) ([d8e4322](https://github.com/Fdawgs/docsmith/commit/d8e4322ccde35cc6d953c06db4f9e3094240c32b))
* **deps-dev:** bump eslint-plugin-jsdoc from 43.0.7 to 43.1.1 ([#1443](https://github.com/Fdawgs/docsmith/issues/1443)) ([2158a63](https://github.com/Fdawgs/docsmith/commit/2158a6318c16caf73f685282df705bd83fe7b065))
* **deps-dev:** bump playwright from 1.32.3 to 1.33.0 ([#1442](https://github.com/Fdawgs/docsmith/issues/1442)) ([da0c818](https://github.com/Fdawgs/docsmith/commit/da0c81843c79b0da3579107d54427922986a4871))
* **deps:** bump fastify from 4.15.0 to 4.17.0 ([#1441](https://github.com/Fdawgs/docsmith/issues/1441)) ([e03d9b3](https://github.com/Fdawgs/docsmith/commit/e03d9b31afc293f1cfba6103d40d5745bb34838b))
* **deps:** bump jsdom from 21.1.1 to 22.0.0 ([#1449](https://github.com/Fdawgs/docsmith/issues/1449)) ([454b63f](https://github.com/Fdawgs/docsmith/commit/454b63fe8e7ba186d7a9e46568d902102a14eda5))
* **deps:** bump pino from 8.11.0 to 8.12.1 ([#1451](https://github.com/Fdawgs/docsmith/issues/1451)) ([3454b38](https://github.com/Fdawgs/docsmith/commit/3454b3834f1b64874f4a6fd67e390a1ad15d114e))
* **deps:** bump tesseract.js from 4.0.3 to 4.0.4 ([#1444](https://github.com/Fdawgs/docsmith/issues/1444)) ([ab760d7](https://github.com/Fdawgs/docsmith/commit/ab760d70a702f9579b284f16935c3de276cfbd20))
* **deps:** bump tesseract.js from 4.0.4 to 4.0.5 ([#1447](https://github.com/Fdawgs/docsmith/issues/1447)) ([e71e060](https://github.com/Fdawgs/docsmith/commit/e71e0600c04bbc1b60f67880678b865c1978d6e6))
* **deps:** bump yaml from 2.2.1 to 2.2.2 ([#1438](https://github.com/Fdawgs/docsmith/issues/1438)) ([b51854a](https://github.com/Fdawgs/docsmith/commit/b51854a4b090c4b4ebfa0f4cf6db3c4c7bf9bb1d))

## [10.0.14](https://github.com/Fdawgs/docsmith/compare/v10.0.13...v10.0.14) (2023-04-24)


### Improvements

* **plugins:** replace `RegExp.test()` with `String.includes()` ([#1418](https://github.com/Fdawgs/docsmith/issues/1418)) ([031848b](https://github.com/Fdawgs/docsmith/commit/031848bae0732f74828ab1d307e45cea0914af0e))
* **server:** replace json parse stringify with `structuredClone()` ([#1419](https://github.com/Fdawgs/docsmith/issues/1419)) ([06c1814](https://github.com/Fdawgs/docsmith/commit/06c1814f3ac96a9b5453adf100b3e2ee800f40eb))


### Documentation

* **readme:** correct name ([b70b961](https://github.com/Fdawgs/docsmith/commit/b70b9613e70dacaede72542c37c5cc103af225f9))


### Continuous integration

* **deps:** bump coverallsapp/github-action from 2.0.0 to 2.1.2 ([#1421](https://github.com/Fdawgs/docsmith/issues/1421)) ([3942d9a](https://github.com/Fdawgs/docsmith/commit/3942d9a0b2da3f34f5da5e039e4a5db601a821ee))
* **deps:** bump peter-evans/create-pull-request from 4 to 5 ([#1422](https://github.com/Fdawgs/docsmith/issues/1422)) ([e2e171e](https://github.com/Fdawgs/docsmith/commit/e2e171efa4c729a10801444c78a9a3811efb6824))


### Miscellaneous

* **scripts/license-checker:** resolve eslint jsdoc warning ([92bb5e1](https://github.com/Fdawgs/docsmith/commit/92bb5e1e0fe1d251cfb237f0a3cb85ba7a84bcde))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.5.1 to 17.6.1 ([#1434](https://github.com/Fdawgs/docsmith/issues/1434)) ([4c0c01d](https://github.com/Fdawgs/docsmith/commit/4c0c01d148656f776c02919558a175c9236ffb32))
* **deps-dev:** bump @commitlint/config-conventional ([#1423](https://github.com/Fdawgs/docsmith/issues/1423)) ([61a8829](https://github.com/Fdawgs/docsmith/commit/61a88298d66ecfcd1b480e29881ee3e4c578563d))
* **deps-dev:** bump esbuild from 0.17.15 to 0.17.18 ([570955d](https://github.com/Fdawgs/docsmith/commit/570955db09970327ec4b499b93600568cfdec7a8))
* **deps-dev:** bump eslint from 8.37.0 to 8.39.0 ([#1425](https://github.com/Fdawgs/docsmith/issues/1425)) ([f6b3e00](https://github.com/Fdawgs/docsmith/commit/f6b3e00ddbb019a9f1e27bd82d5ab4aa7bc0f52f))
* **deps-dev:** bump eslint-plugin-jsdoc from 40.1.1 to 43.0.7 ([#1433](https://github.com/Fdawgs/docsmith/issues/1433)) ([40ff288](https://github.com/Fdawgs/docsmith/commit/40ff288da04057db3d144a2c9b6c89ffa1022daa))
* **deps-dev:** bump playwright from 1.32.2 to 1.32.3 ([#1427](https://github.com/Fdawgs/docsmith/issues/1427)) ([70a459e](https://github.com/Fdawgs/docsmith/commit/70a459eaf1a3f0956444eb4b1d6ae554bd3927d8))
* **deps-dev:** bump prettier from 2.8.7 to 2.8.8 ([#1432](https://github.com/Fdawgs/docsmith/issues/1432)) ([64535b6](https://github.com/Fdawgs/docsmith/commit/64535b6890591ee65621a14fe046e4136f9491cf))
* **deps:** bump @fastify/static from 6.10.0 to 6.10.1 ([#1429](https://github.com/Fdawgs/docsmith/issues/1429)) ([5b9f1b4](https://github.com/Fdawgs/docsmith/commit/5b9f1b4c570af4169f1418e4df8eb798dd372f60))
* **deps:** bump fastify-disablecache from 3.1.1 to 3.1.2 ([#1428](https://github.com/Fdawgs/docsmith/issues/1428)) ([3e55db3](https://github.com/Fdawgs/docsmith/commit/3e55db37f0b3626b867031021690c08d612e3b6c))
* **deps:** bump fastify-floc-off from 2.1.1 to 2.1.2 ([#1426](https://github.com/Fdawgs/docsmith/issues/1426)) ([5d7a043](https://github.com/Fdawgs/docsmith/commit/5d7a043dee453ecd222eeb794b4c19d80cd09248))
* **deps:** bump fastify-json-to-xml from 1.1.1 to 1.1.2 ([#1431](https://github.com/Fdawgs/docsmith/issues/1431)) ([aea51fd](https://github.com/Fdawgs/docsmith/commit/aea51fd37220bf6adb6fdeceb846f74a550b9101))
* **deps:** bump glob from 9.3.4 to 10.2.2 ([#1436](https://github.com/Fdawgs/docsmith/issues/1436)) ([e696bdd](https://github.com/Fdawgs/docsmith/commit/e696bdd6325866583da493abebc2e35c94eee239))
* **deps:** bump html-minifier-terser from 7.1.0 to 7.2.0 ([#1430](https://github.com/Fdawgs/docsmith/issues/1430)) ([8b72fc3](https://github.com/Fdawgs/docsmith/commit/8b72fc3c1fef890c4ad599575d66a059f141b2dd))
* **deps:** bump node-poppler from 6.2.1 to 6.2.2 ([#1424](https://github.com/Fdawgs/docsmith/issues/1424)) ([12696f7](https://github.com/Fdawgs/docsmith/commit/12696f7c657f421234a9e97cbd2e3a43b387a23a))
* **deps:** bump node-unrtf from 3.1.1 to 3.1.2 ([#1435](https://github.com/Fdawgs/docsmith/issues/1435)) ([54f8166](https://github.com/Fdawgs/docsmith/commit/54f8166773e1e5abbeae9a8353af758524f20a7f))
* **deps:** bump transistive dependencies ([439555c](https://github.com/Fdawgs/docsmith/commit/439555cea1d4817bf4566e9d38ed1d283fdb3c38))
* **docker:** remove htmltidy2 win32 and macos binaries ([#1415](https://github.com/Fdawgs/docsmith/issues/1415)) ([93a3bae](https://github.com/Fdawgs/docsmith/commit/93a3baeef0bd9e03315418f5e0da149ff27997a6))
* **docker:** remove htmltidy2 win64 binaries ([#1417](https://github.com/Fdawgs/docsmith/issues/1417)) ([6dbd911](https://github.com/Fdawgs/docsmith/commit/6dbd911f7939bd1144f2d2bbc365117fd3c14ccf))

## [10.0.13](https://github.com/Fdawgs/docsmith/compare/v10.0.12...v10.0.13) (2023-04-04)


### Bug fixes

* **config:** missing CORS_ORIGIN env variable throws error ([#1385](https://github.com/Fdawgs/docsmith/issues/1385)) ([dc34603](https://github.com/Fdawgs/docsmith/commit/dc34603083b0c89091693c458d2e494b912796d7))
* **plugins/pdf-to-txt:** set meta and title for html results ([#1380](https://github.com/Fdawgs/docsmith/issues/1380)) ([391637e](https://github.com/Fdawgs/docsmith/commit/391637e269a0b93625429bb4200f1082f5526831))


### Improvements

* **config:** ensure `_ARRAY` env variables match array patterns ([#1398](https://github.com/Fdawgs/docsmith/issues/1398)) ([9af2553](https://github.com/Fdawgs/docsmith/commit/9af2553fcc1d412dcc79534f2eb0a5403a2ff704))
* remove redundant multi line regex flags ([#1386](https://github.com/Fdawgs/docsmith/issues/1386)) ([2ac4e74](https://github.com/Fdawgs/docsmith/commit/2ac4e74924b375b3809f4401a2dff9fc8beb1652))


### Documentation

* **contributing:** note `build` script ([172f7ea](https://github.com/Fdawgs/docsmith/commit/172f7ea87d6063453e3b16ca53abb2afdcaa86a0))
* **readme:** add logo ([#1367](https://github.com/Fdawgs/docsmith/issues/1367)) ([e9e236e](https://github.com/Fdawgs/docsmith/commit/e9e236e54a7e5f437ac95d23e845fd3a736d279c))
* **readme:** update yeovil district hospital link ([#1368](https://github.com/Fdawgs/docsmith/issues/1368)) ([e2071b1](https://github.com/Fdawgs/docsmith/commit/e2071b11bb304e55b14170603b367488e6dde7a2))


### Miscellaneous

* **.prettierrc:** enable `arrowParens` option ([#1396](https://github.com/Fdawgs/docsmith/issues/1396)) ([9c9bb88](https://github.com/Fdawgs/docsmith/commit/9c9bb88f883c46706e68f142a208f7318dadd972))
* **config:** missing curly braces after `if` statement ([3711ef6](https://github.com/Fdawgs/docsmith/commit/3711ef6ce24705d320a059ba31e93c9925680ddb))
* **plugins/pdf-to-html:** correct inline comment ([915c239](https://github.com/Fdawgs/docsmith/commit/915c23917d31cceee1543934fda9116630a6e6ee))
* **plugins/tidy-css:** grammar fix for inline comment ([c5ca3d9](https://github.com/Fdawgs/docsmith/commit/c5ca3d93c4d2df223f389421af591d17e321c995))
* **routes:** improve description of `backgroundColor` param ([#1400](https://github.com/Fdawgs/docsmith/issues/1400)) ([1021536](https://github.com/Fdawgs/docsmith/commit/1021536fc16b02be59c9be4b0879fc3b0163f56c))
* **utils/core-count:** remove redundant eslint comment ([#1394](https://github.com/Fdawgs/docsmith/issues/1394)) ([139f232](https://github.com/Fdawgs/docsmith/commit/139f2326975314c11f1484007b6c4cff0f379b77))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.5.0 to 17.5.1 ([#1388](https://github.com/Fdawgs/docsmith/issues/1388)) ([8d87491](https://github.com/Fdawgs/docsmith/commit/8d87491f198d82fcccac80cfe843ab65729a2429))
* **deps-dev:** bump esbuild from 0.17.10 to 0.17.15 ([#1411](https://github.com/Fdawgs/docsmith/issues/1411)) ([d50a415](https://github.com/Fdawgs/docsmith/commit/d50a415e8a023c6bfc766ef29d416edbcab4fe57))
* **deps-dev:** bump eslint from 8.36.0 to 8.37.0 ([#1387](https://github.com/Fdawgs/docsmith/issues/1387)) ([5ad4646](https://github.com/Fdawgs/docsmith/commit/5ad464615c9248fc94d449786f0785466c61feeb))
* **deps-dev:** bump eslint-plugin-jsdoc from 40.1.0 to 40.1.1 ([#1391](https://github.com/Fdawgs/docsmith/issues/1391)) ([b900da7](https://github.com/Fdawgs/docsmith/commit/b900da71b039b1e103ee994f3eaf94b22312933a))
* **deps-dev:** bump playwright from 1.32.1 to 1.32.2 ([#1408](https://github.com/Fdawgs/docsmith/issues/1408)) ([92b0aaf](https://github.com/Fdawgs/docsmith/commit/92b0aafe584605aa7e84d662fb9084170d6a8731))
* **deps:** bump @fastify/static from 6.9.0 to 6.10.0 ([#1409](https://github.com/Fdawgs/docsmith/issues/1409)) ([6e2f792](https://github.com/Fdawgs/docsmith/commit/6e2f792bb9bb90138aec17ed45d6b9908e39dfa1))
* **deps:** bump fastify-disablecache from 3.1.0 to 3.1.1 ([#1407](https://github.com/Fdawgs/docsmith/issues/1407)) ([c0ee3a9](https://github.com/Fdawgs/docsmith/commit/c0ee3a9cf95995716d94d9259e65da7c5c168157))
* **deps:** bump fastify-floc-off from 2.1.0 to 2.1.1 ([#1389](https://github.com/Fdawgs/docsmith/issues/1389)) ([c706288](https://github.com/Fdawgs/docsmith/commit/c7062883d841d223c35e01dbb4ae281116fcf13c))
* **deps:** bump fastify-json-to-xml from 1.1.0 to 1.1.1 ([#1392](https://github.com/Fdawgs/docsmith/issues/1392)) ([86f4107](https://github.com/Fdawgs/docsmith/commit/86f41077fb591a56f749a79bdd1addad0ec86f36))
* **deps:** bump glob from 9.3.2 to 9.3.4 ([#1410](https://github.com/Fdawgs/docsmith/issues/1410)) ([e12f7d2](https://github.com/Fdawgs/docsmith/commit/e12f7d2b2c61d65f8c144ed938bd8aa8a603fe0a))
* **deps:** bump node-poppler from 6.2.0 to 6.2.1 ([#1406](https://github.com/Fdawgs/docsmith/issues/1406)) ([87371da](https://github.com/Fdawgs/docsmith/commit/87371dafba8bc3c869531dc117bfbfa8447c1beb))
* **deps:** bump node-unrtf from 3.1.0 to 3.1.1 ([#1393](https://github.com/Fdawgs/docsmith/issues/1393)) ([a316506](https://github.com/Fdawgs/docsmith/commit/a31650694389e0d02073f8ae29dd4e7003d1c848))
* **deps:** bump tesseract.js from 4.0.2 to 4.0.3 ([#1390](https://github.com/Fdawgs/docsmith/issues/1390)) ([dc3a087](https://github.com/Fdawgs/docsmith/commit/dc3a087fc361e98fc94005347c1051a882082aff))
* **deps:** bump transistive dependencies ([#1412](https://github.com/Fdawgs/docsmith/issues/1412)) ([7389fa0](https://github.com/Fdawgs/docsmith/commit/7389fa0d85df6a2df1e643669f3a0e97f0936f8a))

## [10.0.12](https://github.com/Fdawgs/docsmith/compare/v10.0.11...v10.0.12) (2023-03-27)


### Documentation

* **contributing:** add link to conventional config ([#1352](https://github.com/Fdawgs/docsmith/issues/1352)) ([02db613](https://github.com/Fdawgs/docsmith/commit/02db6133a07dc18b86f5c897b9113eafb237a9c6))


### Continuous integration

* **dependabot:** change commit message prefix for gh actions to `ci` ([#1351](https://github.com/Fdawgs/docsmith/issues/1351)) ([aaa6c5b](https://github.com/Fdawgs/docsmith/commit/aaa6c5bc2a993473b800e3f6cd026051371c4eff))
* **dependabot:** correct property type ([#1361](https://github.com/Fdawgs/docsmith/issues/1361)) ([42a4790](https://github.com/Fdawgs/docsmith/commit/42a47904d35c6c0332f80fad07f431990a203999))
* **dependabot:** ignore esm major versions ([#1350](https://github.com/Fdawgs/docsmith/issues/1350)) ([b965bc1](https://github.com/Fdawgs/docsmith/commit/b965bc1d1eda1acde9bd653aecba920046cf5bd6))


### Miscellaneous

* **plugins/pdf-to-html:** add comment re poppler title handling ([#1362](https://github.com/Fdawgs/docsmith/issues/1362)) ([8300d4b](https://github.com/Fdawgs/docsmith/commit/8300d4b84e33c40dee53796b488129086b6dffd3))


### Bug fixes

* **plugins/pdf-to-txt:** charset and content can't be altered with ocr ([#1369](https://github.com/Fdawgs/docsmith/issues/1369)) ([5550aa2](https://github.com/Fdawgs/docsmith/commit/5550aa2773a58186abb38a73cd0597880fdcedab))
* **plugins/rtf-to-html:** add content-type meta element to html ([61523a0](https://github.com/Fdawgs/docsmith/commit/61523a0c21931e932064b2098664b54f6b26b234))
* **routes/pdf/txt:** remove `listEncodingOptions` qs param ([#1354](https://github.com/Fdawgs/docsmith/issues/1354)) ([3eb0d71](https://github.com/Fdawgs/docsmith/commit/3eb0d71c93e22365cb1d657cfed95de8a856e4e7))
* **routes/pdf:** limit `outputEncoding` qs params to poppler charsets ([#1353](https://github.com/Fdawgs/docsmith/issues/1353)) ([92500d6](https://github.com/Fdawgs/docsmith/commit/92500d6b04f35cd510b1f7ea04742c751af44cc1))
* **routes/rtf:** declare charset for rtf documents ([e287a15](https://github.com/Fdawgs/docsmith/commit/e287a15e3e3c9211d1a321a5ad5b9393b895b222))


### Improvements

* **plugins/docx-to-html:** move meta element to first thing in head ([#1371](https://github.com/Fdawgs/docsmith/issues/1371)) ([ca7da79](https://github.com/Fdawgs/docsmith/commit/ca7da798c43719a61c21698ee1b89f18f47c18b8))
* **plugins/docx-to-html:** only fix utf-8 chars in converted body ([#1370](https://github.com/Fdawgs/docsmith/issues/1370)) ([847a8e1](https://github.com/Fdawgs/docsmith/commit/847a8e1819eccd79e116521fb2958966657f641e))
* **plugins/pdf-to-html:** move meta element to first child in head ([#1372](https://github.com/Fdawgs/docsmith/issues/1372)) ([7b691a5](https://github.com/Fdawgs/docsmith/commit/7b691a5c64476c8d4ada50c27c79e472b793f5f7))
* **plugins/rtf-to-html:** ensure charset is first child in head ([#1373](https://github.com/Fdawgs/docsmith/issues/1373)) ([f37dcf9](https://github.com/Fdawgs/docsmith/commit/f37dcf9b11da3fe6bd57d66215560915d28b48f0))
* **plugins/tidy-css:** replace `appendChild` with `append` ([#1365](https://github.com/Fdawgs/docsmith/issues/1365)) ([b2af657](https://github.com/Fdawgs/docsmith/commit/b2af65795e69b51b02b2c1e4b26ebdd71212758a))
* **routes:** use optional chaining for file type result object ([#1366](https://github.com/Fdawgs/docsmith/issues/1366)) ([c69f82b](https://github.com/Fdawgs/docsmith/commit/c69f82b4e3c82345825e5d901f9847f349c686ae))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.4 to 17.5.0 ([#1357](https://github.com/Fdawgs/docsmith/issues/1357)) ([e2376ec](https://github.com/Fdawgs/docsmith/commit/e2376ec820c3cc18ec80345683aeaebdea5d484b))
* **deps-dev:** bump nodemon from 2.0.21 to 2.0.22 ([#1358](https://github.com/Fdawgs/docsmith/issues/1358)) ([70b06a0](https://github.com/Fdawgs/docsmith/commit/70b06a0a8d86b2a0cbb260d3c3abdb4f1275a3c1))
* **deps-dev:** bump playwright from 1.31.2 to 1.32.0 ([#1359](https://github.com/Fdawgs/docsmith/issues/1359)) ([5edb5d6](https://github.com/Fdawgs/docsmith/commit/5edb5d6c2e05dce5a40400020b33f7784cdcc2a8))
* **deps-dev:** bump playwright from 1.32.0 to 1.32.1 ([#1376](https://github.com/Fdawgs/docsmith/issues/1376)) ([4d4bce9](https://github.com/Fdawgs/docsmith/commit/4d4bce9da7cfad2723613a2171eb35c347d4a8cf))
* **deps-dev:** bump prettier from 2.8.6 to 2.8.7 ([#1374](https://github.com/Fdawgs/docsmith/issues/1374)) ([ee61208](https://github.com/Fdawgs/docsmith/commit/ee61208d475b79481412ff5c62c1c5b81040905e))
* **deps:** bump @fastify/compress from 6.2.0 to 6.2.1 ([#1375](https://github.com/Fdawgs/docsmith/issues/1375)) ([2c84bf8](https://github.com/Fdawgs/docsmith/commit/2c84bf86e5ac84bc78b291c9b677560766420770))
* **deps:** bump glob from 9.3.1 to 9.3.2 ([#1355](https://github.com/Fdawgs/docsmith/issues/1355)) ([71640eb](https://github.com/Fdawgs/docsmith/commit/71640eb17c635aa62e171f2cecb8827e2d175b4b))
* **deps:** bump html-to-text from 9.0.4 to 9.0.5 ([#1356](https://github.com/Fdawgs/docsmith/issues/1356)) ([2b05df2](https://github.com/Fdawgs/docsmith/commit/2b05df21b4a17c309688112138e681afd877fe34))

## [10.0.11](https://github.com/Fdawgs/docsmith/compare/v10.0.10...v10.0.11) (2023-03-21)


### Improvements

* remove optional chaining for first level properties ([#1338](https://github.com/Fdawgs/docsmith/issues/1338)) ([1b14dc7](https://github.com/Fdawgs/docsmith/commit/1b14dc7784f60db7d04294f7fea311521031b738))


### Bug fixes

* **plugins/pdf-to-html:** `docLocation.html` filename ([1d02c00](https://github.com/Fdawgs/docsmith/commit/1d02c00f6e4f5f1972657a76494063a755d429b2))
* **plugins/rtf-to-html:** restrict temp file permissions ([#1339](https://github.com/Fdawgs/docsmith/issues/1339)) ([fa32bbc](https://github.com/Fdawgs/docsmith/commit/fa32bbc4f92318fb815fe145448d9d3410af65c6))
* **server:** premature closes crashing server ([3f623f0](https://github.com/Fdawgs/docsmith/commit/3f623f0397df78701422fb9771dce5137c785c95))


### Miscellaneous

* **plugins/tidy-css:** correct inline comment location ([665ea00](https://github.com/Fdawgs/docsmith/commit/665ea00a42ea42754e646ceb2d6f7c1da99f11a0))
* **plugins/tidy-css:** use ternary operator over if...else statement ([2f06fdb](https://github.com/Fdawgs/docsmith/commit/2f06fdb6ee90d4e0f26d61dae135431dc529d3f9))
* **plugins:** add inline comment for `docLocation` object purpose ([28e196a](https://github.com/Fdawgs/docsmith/commit/28e196a03e0409364d5605ca8c538ed97a9f7f5d))
* **routes:** update schema inline comment re injection attacks ([#1341](https://github.com/Fdawgs/docsmith/issues/1341)) ([a1f99d0](https://github.com/Fdawgs/docsmith/commit/a1f99d01724b6d85ae14a41ca7f75758c78b5125))
* **scripts:** move esbuild to script dir ([#1334](https://github.com/Fdawgs/docsmith/issues/1334)) ([54ded95](https://github.com/Fdawgs/docsmith/commit/54ded9553a261f5b6507f31e166a4a5b390daca4))
* **scripts:** remove redundant export ([bca682c](https://github.com/Fdawgs/docsmith/commit/bca682c637e7e0e609110f74838a1fda5a2a7663))
* **scripts:** sort eslint comments alphabetically ([71e6cf3](https://github.com/Fdawgs/docsmith/commit/71e6cf3ecc98b1102ca213361ef125d1129dc01a))
* **scripts:** use js script to check licenses ([#1331](https://github.com/Fdawgs/docsmith/issues/1331)) ([85a2ff1](https://github.com/Fdawgs/docsmith/commit/85a2ff1c158a398a4236d88473c2622d9852ae36))
* **server:** inline comment re internal server error handling ([d5d579f](https://github.com/Fdawgs/docsmith/commit/d5d579f8c707bc49c62bf05d44c11d88b55ebed2))


### Dependencies

* **deps-dev:** bump eslint-config-prettier from 8.7.0 to 8.8.0 ([#1349](https://github.com/Fdawgs/docsmith/issues/1349)) ([3fd863c](https://github.com/Fdawgs/docsmith/commit/3fd863c25af2c2d8a0309c675090ca9be35ceb30))
* **deps-dev:** bump eslint-plugin-jsdoc from 40.0.2 to 40.1.0 ([#1348](https://github.com/Fdawgs/docsmith/issues/1348)) ([9796730](https://github.com/Fdawgs/docsmith/commit/9796730451c437b925b5f146d3c5c055b34e85ee))
* **deps-dev:** bump prettier from 2.8.4 to 2.8.6 ([#1345](https://github.com/Fdawgs/docsmith/issues/1345)) ([9adeb98](https://github.com/Fdawgs/docsmith/commit/9adeb98154ff962b4b68252a57f19008beffc57f))
* **deps:** bump @fastify/cors from 8.2.0 to 8.2.1 ([#1344](https://github.com/Fdawgs/docsmith/issues/1344)) ([7984019](https://github.com/Fdawgs/docsmith/commit/7984019b1e521709e2447d144a968768b229492c))
* **deps:** bump coverallsapp/github-action from 1.2.4 to 2.0.0 ([#1343](https://github.com/Fdawgs/docsmith/issues/1343)) ([810f276](https://github.com/Fdawgs/docsmith/commit/810f27604cbc2408450d7560d4fe884b259bc579))
* **deps:** bump fastify from 4.14.1 to 4.15.0 ([#1347](https://github.com/Fdawgs/docsmith/issues/1347)) ([510d8e0](https://github.com/Fdawgs/docsmith/commit/510d8e0a5100a662e798e1e9ee8e4d5352c8cf42))
* **deps:** bump glob from 9.2.1 to 9.3.1 ([#1346](https://github.com/Fdawgs/docsmith/issues/1346)) ([8cf26b0](https://github.com/Fdawgs/docsmith/commit/8cf26b0206f746f87cc84726ae562a518d4096fa))
* **deps:** bump webpack from 5.75.0 to 5.76.1 ([#1332](https://github.com/Fdawgs/docsmith/issues/1332)) ([046868c](https://github.com/Fdawgs/docsmith/commit/046868cd92e064386d96648127ed2073ceff94f5))

## [10.0.10](https://github.com/Fdawgs/docsmith/compare/v10.0.9...v10.0.10) (2023-03-14)


### Documentation

* **readme:** replace nhs digital mention with nhs england ([61650c8](https://github.com/Fdawgs/docsmith/commit/61650c8b8290fa309b2863bc7aa958fdb7d85efb))


### Miscellaneous

* ignore bun lockfile ([#1308](https://github.com/Fdawgs/docsmith/issues/1308)) ([fe37840](https://github.com/Fdawgs/docsmith/commit/fe378405ed490a347842bea33b1f646a4eb0bff1))
* **package:** add funding url ([f953f5b](https://github.com/Fdawgs/docsmith/commit/f953f5bc8fb3b525adab223f21bb3d9bbaef7224))
* **plugins/rtf-to-html:** remove trailing punctuation mark ([170e00d](https://github.com/Fdawgs/docsmith/commit/170e00dca4bdc3a0f899a6702655dac35ee7a7eb))
* **routes/admin/healthcheck:** sentence case of tags ([#1321](https://github.com/Fdawgs/docsmith/issues/1321)) ([8d02b89](https://github.com/Fdawgs/docsmith/commit/8d02b89168e1723911b6d56daf88ce2b9d120bbe))


### Improvements

* **plugins/image-to-txt:** return worker ([#1315](https://github.com/Fdawgs/docsmith/issues/1315)) ([d858b4c](https://github.com/Fdawgs/docsmith/commit/d858b4c0de1e469f886935dc647ce0eb2be3ef0f))
* **plugins/tidy-css:** remove useless var reassignment ([#1318](https://github.com/Fdawgs/docsmith/issues/1318)) ([2b6897e](https://github.com/Fdawgs/docsmith/commit/2b6897e08013a1f4eaa4edda472373ab8615da17))
* **plugins/tidy-html:** remove `else` blocks after throw ([#1322](https://github.com/Fdawgs/docsmith/issues/1322)) ([b1af9bd](https://github.com/Fdawgs/docsmith/commit/b1af9bd7fd3440dcb69ff49bd0098ed3d5f99659))
* **plugins/tidy-html:** remove unused var assignment ([5369a6b](https://github.com/Fdawgs/docsmith/commit/5369a6b7ff4d08f2d53825333c0f2828f64d8207))
* **plugins:** remove unused exception variables ([4fcdf75](https://github.com/Fdawgs/docsmith/commit/4fcdf757107e70f6156e832b0498e13db20aac75))
* **plugins:** use `array.from()` mapfn to stop intermediate array init ([95ac3b3](https://github.com/Fdawgs/docsmith/commit/95ac3b36859f555143f41108c87e1dd5c119b2ea))
* remove unnecessary `else` blocks after throws ([#1317](https://github.com/Fdawgs/docsmith/issues/1317)) ([e79699e](https://github.com/Fdawgs/docsmith/commit/e79699e681a276c86ad47a80d97d35479973a2c9))


### Dependencies

* **deps-dev:** bump eslint from 8.35.0 to 8.36.0 ([#1329](https://github.com/Fdawgs/docsmith/issues/1329)) ([d432de1](https://github.com/Fdawgs/docsmith/commit/d432de18e6c7906370b92bc833f83423da7350d6))
* **deps-dev:** bump eslint-config-prettier from 8.6.0 to 8.7.0 ([#1328](https://github.com/Fdawgs/docsmith/issues/1328)) ([06e4a2e](https://github.com/Fdawgs/docsmith/commit/06e4a2ebe0d15f984efaa9e0e045896abc388600))
* **deps-dev:** bump eslint-plugin-jsdoc from 40.0.1 to 40.0.2 ([#1330](https://github.com/Fdawgs/docsmith/issues/1330)) ([cddcf56](https://github.com/Fdawgs/docsmith/commit/cddcf56f2593fdf77add1d868a3f279ba8b3f807))
* **deps-dev:** bump jest from 29.4.3 to 29.5.0 ([#1327](https://github.com/Fdawgs/docsmith/issues/1327)) ([9c2254a](https://github.com/Fdawgs/docsmith/commit/9c2254a7e92dc43a1114f12ac7c64ca7f73d1bfc))
* **deps-dev:** bump pino-pretty from 9.4.0 to 10.0.0 ([#1324](https://github.com/Fdawgs/docsmith/issues/1324)) ([f594fc8](https://github.com/Fdawgs/docsmith/commit/f594fc8020f8d53aea429f08ccb942e94fadf66c))
* **deps:** bump fastify from 4.14.0 to 4.14.1 ([#1325](https://github.com/Fdawgs/docsmith/issues/1325)) ([fa8ffeb](https://github.com/Fdawgs/docsmith/commit/fa8ffeb86497036af182f63fe21ee72d8da71a74))
* **deps:** bump glob from 9.1.0 to 9.2.1 ([#1303](https://github.com/Fdawgs/docsmith/issues/1303)) ([b473e01](https://github.com/Fdawgs/docsmith/commit/b473e01bdb1cf75786fd3390e1619e780c174d0f))
* **deps:** bump htmltidy2 from 1.0.1 to 1.1.1 ([#1326](https://github.com/Fdawgs/docsmith/issues/1326)) ([245dbca](https://github.com/Fdawgs/docsmith/commit/245dbca48680c4cfc6f5353b5ee766b23c06455d))
* **deps:** bump jsdom from 21.1.0 to 21.1.1 ([#1323](https://github.com/Fdawgs/docsmith/issues/1323)) ([81b3a60](https://github.com/Fdawgs/docsmith/commit/81b3a6022c152767656c5617a7d4ca04b37bc1c5))

## [10.0.9](https://github.com/Fdawgs/docsmith/compare/v10.0.8...v10.0.9) (2023-03-03)


### Miscellaneous

* clarify why images are removed from rtf-to-html results ([#1295](https://github.com/Fdawgs/docsmith/issues/1295)) ([0ef7262](https://github.com/Fdawgs/docsmith/commit/0ef7262dd307b403bcacd000059e46eafc8e7059))
* **plugins/tidy-html:** add default to jsdoc param ([#1298](https://github.com/Fdawgs/docsmith/issues/1298)) ([50bb545](https://github.com/Fdawgs/docsmith/commit/50bb545d6adc32d125772006eb37ec5638e5ec10))


### Improvements

* **plugins/rtf-to-html:** remove redundant `await` ([#1294](https://github.com/Fdawgs/docsmith/issues/1294)) ([7582b22](https://github.com/Fdawgs/docsmith/commit/7582b22f2be16358bd7bafee3c45ae2b81538337))
* **plugins:** allow temp file prefixes to be configured ([#1299](https://github.com/Fdawgs/docsmith/issues/1299)) ([dde4fef](https://github.com/Fdawgs/docsmith/commit/dde4fefe0d324f433d8aef5584f65bf4b3f6a771))
* **routes/rtf/html:** remove embedding of html images ([#1288](https://github.com/Fdawgs/docsmith/issues/1288)) ([da7b329](https://github.com/Fdawgs/docsmith/commit/da7b329c1fa42f7900229400e8bf60f7d0914471))


### Bug fixes

* **plugins/rtf-to-html:** hyperlinks being removed ([#1300](https://github.com/Fdawgs/docsmith/issues/1300)) ([00bc9e1](https://github.com/Fdawgs/docsmith/commit/00bc9e12246cfca5eefba3a829ad152644dc02c4))
* **plugins/rtf-to-html:** rtf images dumped into cwd ([#1287](https://github.com/Fdawgs/docsmith/issues/1287)) ([d089f68](https://github.com/Fdawgs/docsmith/commit/d089f681a2a959676c037438809fb14ef3ab1fe9))
* **routes/rtf/txt:** rtf images dumped into cwd ([#1297](https://github.com/Fdawgs/docsmith/issues/1297)) ([20144e8](https://github.com/Fdawgs/docsmith/commit/20144e865a3bb74734b3dd0cf1e8655da05abee2))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 40.0.0 to 40.0.1 ([#1307](https://github.com/Fdawgs/docsmith/issues/1307)) ([5aa6b4b](https://github.com/Fdawgs/docsmith/commit/5aa6b4b3054ff24f55894fc7d4d889f1d1653dbc))
* **deps-dev:** bump nodemon from 2.0.20 to 2.0.21 ([#1304](https://github.com/Fdawgs/docsmith/issues/1304)) ([02d6b9a](https://github.com/Fdawgs/docsmith/commit/02d6b9a673dc80379e9ae86d0f491754d29b5f05))
* **deps-dev:** bump playwright from 1.31.1 to 1.31.2 ([#1305](https://github.com/Fdawgs/docsmith/issues/1305)) ([3296baf](https://github.com/Fdawgs/docsmith/commit/3296baff57447ad07c63e07206eab4a94fd14154))
* **deps:** bump @fastify/rate-limit from 7.6.0 to 8.0.0 ([#1302](https://github.com/Fdawgs/docsmith/issues/1302)) ([a2a1c72](https://github.com/Fdawgs/docsmith/commit/a2a1c722e9ea3f7c12501462df272f7260b606c3))
* **deps:** bump coverallsapp/github-action from 1.2.3 to 1.2.4 ([#1301](https://github.com/Fdawgs/docsmith/issues/1301)) ([4eab7fa](https://github.com/Fdawgs/docsmith/commit/4eab7fa099388d2ba3103e2e6ea86d6a88f21558))
* **deps:** bump fastify from 4.13.0 to 4.14.0 ([#1306](https://github.com/Fdawgs/docsmith/issues/1306)) ([d11be58](https://github.com/Fdawgs/docsmith/commit/d11be581cabe3ac6b48d392cf259f6a09f97176e))

## [10.0.8](https://github.com/Fdawgs/docsmith/compare/v10.0.7...v10.0.8) (2023-03-01)


### Miscellaneous

* **routes/docs:** use correct terminology for openapi definitions ([#1276](https://github.com/Fdawgs/docsmith/issues/1276)) ([08e302a](https://github.com/Fdawgs/docsmith/commit/08e302af8dbd31f5905ba260a7f864b57884934d))


### Improvements

* **routes/docs:** defer non-critical css ([#1272](https://github.com/Fdawgs/docsmith/issues/1272)) ([f2d35e4](https://github.com/Fdawgs/docsmith/commit/f2d35e4f5d3e8ad8f3a4ea1e9fdae368dc9fea75))
* use glob promise api ([2ccbe5b](https://github.com/Fdawgs/docsmith/commit/2ccbe5bfde4126369c0c553b3f11a89bd8490d90))


### Dependencies

* **deps-dev:** bump esbuild from 0.17.5 to 0.17.10 ([#1285](https://github.com/Fdawgs/docsmith/issues/1285)) ([152d757](https://github.com/Fdawgs/docsmith/commit/152d757342b09fc24038537434aa441dc9cf8f0f))
* **deps-dev:** bump eslint from 8.34.0 to 8.35.0 ([#1282](https://github.com/Fdawgs/docsmith/issues/1282)) ([8ffe212](https://github.com/Fdawgs/docsmith/commit/8ffe2129a62071e928e4ea1cdf63a8263b3a6e2c))
* **deps-dev:** bump pino-pretty from 9.3.0 to 9.4.0 ([#1280](https://github.com/Fdawgs/docsmith/issues/1280)) ([b1d90b6](https://github.com/Fdawgs/docsmith/commit/b1d90b6337c27c9e47508117fb6f1af13ffe708a))
* **deps-dev:** bump playwright from 1.31.0 to 1.31.1 ([#1283](https://github.com/Fdawgs/docsmith/issues/1283)) ([26641f8](https://github.com/Fdawgs/docsmith/commit/26641f8e33e0f21894ca72b7343dacc0370c5888))
* **deps:** bump coverallsapp/github-action from 1.1.3 to 1.2.3 ([#1278](https://github.com/Fdawgs/docsmith/issues/1278)) ([3f25595](https://github.com/Fdawgs/docsmith/commit/3f2559587d18a148213411b678ab9da89ce567e5))
* **deps:** bump glob from 8.1.0 to 9.1.0 ([35638a2](https://github.com/Fdawgs/docsmith/commit/35638a2ccb3e15f21d150e84fc59cfe06e435db0))
* **deps:** bump pino from 8.10.0 to 8.11.0 ([#1281](https://github.com/Fdawgs/docsmith/issues/1281)) ([e92df9a](https://github.com/Fdawgs/docsmith/commit/e92df9ae4530593f3eb57329c42bd47cf5fa2185))
* **deps:** bump transistive dependencies ([#1286](https://github.com/Fdawgs/docsmith/issues/1286)) ([c8f3c57](https://github.com/Fdawgs/docsmith/commit/c8f3c5719aebf86190756f9c4ceed6b3f2fbbcfd))

## [10.0.7](https://github.com/Fdawgs/docsmith/compare/v10.0.6...v10.0.7) (2023-02-22)


### Documentation

* **images:** update api documentation screenshot ([c8b30d3](https://github.com/Fdawgs/docsmith/commit/c8b30d359e7cfce52360dffa6479d1177ca43d6c))


### Improvements

* **plugins:** replace `Object.assign()` with spread syntax ([#1258](https://github.com/Fdawgs/docsmith/issues/1258)) ([9634321](https://github.com/Fdawgs/docsmith/commit/96343218208321b4593d60aff8b7dc65772360e4))


### Miscellaneous

* correct jsdoc param types ([c55e710](https://github.com/Fdawgs/docsmith/commit/c55e7107cb13cd8143897eeba8b7b3f5ebfb966d))
* prefix unused params with underscores ([902364d](https://github.com/Fdawgs/docsmith/commit/902364db0b2ffe329b7b4b8f702b0e22ef087e20))


### Bug fixes

* **config:** misleading thrown error message ([93b8f3a](https://github.com/Fdawgs/docsmith/commit/93b8f3a994f18ca7b245f3981037fc2ee99179ca))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.3 to 17.4.4 ([#1270](https://github.com/Fdawgs/docsmith/issues/1270)) ([7048c23](https://github.com/Fdawgs/docsmith/commit/7048c233479faad88b19f708548e0279a0a744a0))
* **deps-dev:** bump @commitlint/config-conventional ([#1262](https://github.com/Fdawgs/docsmith/issues/1262)) ([d4ac884](https://github.com/Fdawgs/docsmith/commit/d4ac884749e294cf00ec51a1fab471eb7f9cd059))
* **deps-dev:** bump jest from 29.4.2 to 29.4.3 ([#1263](https://github.com/Fdawgs/docsmith/issues/1263)) ([608cad3](https://github.com/Fdawgs/docsmith/commit/608cad3bc05f3902114674622b2247b0310badd2))
* **deps-dev:** bump pino-pretty from 9.2.0 to 9.3.0 ([#1264](https://github.com/Fdawgs/docsmith/issues/1264)) ([fe505ce](https://github.com/Fdawgs/docsmith/commit/fe505ceb4b428f2cc455637e249669d4b95b36f3))
* **deps-dev:** bump playwright from 1.30.0 to 1.31.0 ([#1267](https://github.com/Fdawgs/docsmith/issues/1267)) ([cd15d4a](https://github.com/Fdawgs/docsmith/commit/cd15d4a2fe2c50fa6a4d2dda21990bf2144bb56a))
* **deps:** bump fastify-disablecache from 3.0.6 to 3.1.0 ([#1266](https://github.com/Fdawgs/docsmith/issues/1266)) ([33f1b7b](https://github.com/Fdawgs/docsmith/commit/33f1b7bf486c6677ef1f163abde9ac1533466641))
* **deps:** bump fastify-floc-off from 2.0.6 to 2.1.0 ([#1261](https://github.com/Fdawgs/docsmith/issues/1261)) ([b588238](https://github.com/Fdawgs/docsmith/commit/b588238661a4f105e8af54fffdedce1e66c857d1))
* **deps:** bump fastify-json-to-xml from 1.0.2 to 1.1.0 ([#1265](https://github.com/Fdawgs/docsmith/issues/1265)) ([6e13dd0](https://github.com/Fdawgs/docsmith/commit/6e13dd0dc23b93ee17328a0a99d6e18983e1b664))
* **deps:** bump fluent-json-schema from 4.0.0 to 4.1.0 ([#1260](https://github.com/Fdawgs/docsmith/issues/1260)) ([b666e2a](https://github.com/Fdawgs/docsmith/commit/b666e2a822520d0518de0d6a159a76c5b33f490e))
* **deps:** bump node-poppler from 6.1.2 to 6.2.0 ([#1268](https://github.com/Fdawgs/docsmith/issues/1268)) ([0d82d5b](https://github.com/Fdawgs/docsmith/commit/0d82d5bd48ef2b5d12570703ff6ca16b91563df8))
* **deps:** bump node-unrtf from 3.0.6 to 3.1.0 ([#1269](https://github.com/Fdawgs/docsmith/issues/1269)) ([7053a8b](https://github.com/Fdawgs/docsmith/commit/7053a8b0885c31ab4619cfb39b2040c7773b0fa0))

## [10.0.6](https://github.com/Fdawgs/docsmith/compare/v10.0.5...v10.0.6) (2023-02-15)


### Documentation

* **readme:** use more inclusive language ([3ec2517](https://github.com/Fdawgs/docsmith/commit/3ec2517dd780f9a64a45d63cfc52d41481edde44))


### Continuous integration

* **cd:** use sentence case for changelog headings ([306a5ca](https://github.com/Fdawgs/docsmith/commit/306a5ca7956d9cbb86c41278da9e7d4ed0274cd2))


### Miscellaneous

* rename master branch to main ([#1244](https://github.com/Fdawgs/docsmith/issues/1244)) ([c321044](https://github.com/Fdawgs/docsmith/commit/c32104473e814910783f136bab354827478e2519))
* use sentence case over ap style for titles and headings ([3a59481](https://github.com/Fdawgs/docsmith/commit/3a59481a3b0a71ea56c206dbb0f66b6148726d60))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.2 to 17.4.3 ([#1250](https://github.com/Fdawgs/docsmith/issues/1250)) ([1096c0c](https://github.com/Fdawgs/docsmith/commit/1096c0ccc448b06f8df07d70403454471a7f1b03))
* **deps-dev:** bump @commitlint/config-conventional ([#1239](https://github.com/Fdawgs/docsmith/issues/1239)) ([e2998a2](https://github.com/Fdawgs/docsmith/commit/e2998a2dca6e8c6ae8dbbded2394ba7d428169b2))
* **deps-dev:** bump eslint from 8.33.0 to 8.34.0 ([#1243](https://github.com/Fdawgs/docsmith/issues/1243)) ([f0df018](https://github.com/Fdawgs/docsmith/commit/f0df018042b4ed3bc8978e3b0255023912bf3746))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.7.5 to 40.0.0 ([#1248](https://github.com/Fdawgs/docsmith/issues/1248)) ([83ba493](https://github.com/Fdawgs/docsmith/commit/83ba493c50c4f4a9ab948d41ba5bfaeac3edd11d))
* **deps-dev:** bump eslint-plugin-security from 1.7.0 to 1.7.1 ([#1242](https://github.com/Fdawgs/docsmith/issues/1242)) ([2252413](https://github.com/Fdawgs/docsmith/commit/22524131cc28f813303c446489bc4d78bdc7f664))
* **deps-dev:** bump jest from 29.4.1 to 29.4.2 ([#1253](https://github.com/Fdawgs/docsmith/issues/1253)) ([30e3f17](https://github.com/Fdawgs/docsmith/commit/30e3f175c670d6ac690929bc8749b926e864d017))
* **deps-dev:** bump pino-pretty from 9.1.1 to 9.2.0 ([#1238](https://github.com/Fdawgs/docsmith/issues/1238)) ([cee5a23](https://github.com/Fdawgs/docsmith/commit/cee5a235856bc28c6dad350b467af0da2f3fc154))
* **deps-dev:** bump prettier from 2.8.3 to 2.8.4 ([#1247](https://github.com/Fdawgs/docsmith/issues/1247)) ([7b6f1d5](https://github.com/Fdawgs/docsmith/commit/7b6f1d5c54edee270187fe456b1d47bde773d3b4))
* **deps:** bump @fastify/static from 6.8.0 to 6.9.0 ([#1241](https://github.com/Fdawgs/docsmith/issues/1241)) ([a4fb428](https://github.com/Fdawgs/docsmith/commit/a4fb42885cd1ecaaccb1c0a21942b2d8f2af7222))
* **deps:** bump @fastify/swagger from 8.3.0 to 8.3.1 ([#1246](https://github.com/Fdawgs/docsmith/issues/1246)) ([12ffeb9](https://github.com/Fdawgs/docsmith/commit/12ffeb9b9d522f30e9547a47e38939dc144a2228))
* **deps:** bump fastify from 4.12.0 to 4.13.0 ([#1236](https://github.com/Fdawgs/docsmith/issues/1236)) ([1f99437](https://github.com/Fdawgs/docsmith/commit/1f9943778ca4c9176e5f1e303c51f6dc114f2624))
* **deps:** bump fastify-disablecache from 3.0.5 to 3.0.6 ([#1237](https://github.com/Fdawgs/docsmith/issues/1237)) ([4685a2b](https://github.com/Fdawgs/docsmith/commit/4685a2bdf7464f6fbfea44c365e72490ff2b74c5))
* **deps:** bump fastify-floc-off from 2.0.5 to 2.0.6 ([#1245](https://github.com/Fdawgs/docsmith/issues/1245)) ([e4b3001](https://github.com/Fdawgs/docsmith/commit/e4b30019514b6274784bc90bb4d89ac3a3543967))
* **deps:** bump fastify-json-to-xml from 1.0.0 to 1.0.2 ([#1235](https://github.com/Fdawgs/docsmith/issues/1235)) ([eff4cb3](https://github.com/Fdawgs/docsmith/commit/eff4cb3edf9456152f8a6d95067379ff075e59c2))
* **deps:** bump htmltidy2 from 1.0.0 to 1.0.1 ([#1252](https://github.com/Fdawgs/docsmith/issues/1252)) ([bcc7006](https://github.com/Fdawgs/docsmith/commit/bcc70067acbde79b58e5e9511fab33907e3d74a9))
* **deps:** bump language-tags from 1.0.7 to 1.0.8 ([#1255](https://github.com/Fdawgs/docsmith/issues/1255)) ([7a2b979](https://github.com/Fdawgs/docsmith/commit/7a2b9796158eac9f1763718eb8638cadc4cca520))
* **deps:** bump node-poppler from 6.1.1 to 6.1.2 ([#1251](https://github.com/Fdawgs/docsmith/issues/1251)) ([647fcf2](https://github.com/Fdawgs/docsmith/commit/647fcf26956ce177846ccc4093a6b75ed7d1439c))
* **deps:** bump node-unrtf from 3.0.5 to 3.0.6 ([#1254](https://github.com/Fdawgs/docsmith/issues/1254)) ([317ab80](https://github.com/Fdawgs/docsmith/commit/317ab807c9a000f17c3131c383677810396d00e5))
* **deps:** bump pino from 8.8.0 to 8.10.0 ([#1240](https://github.com/Fdawgs/docsmith/issues/1240)) ([d071177](https://github.com/Fdawgs/docsmith/commit/d07117759d27718b4a279e972b25a44554fedb5b))

## [10.0.5](https://github.com/Fdawgs/docsmith/compare/v10.0.4...v10.0.5) (2023-02-08)


### Bug fixes

* **routes:** only add 401 response to schema when auth enabled ([#1231](https://github.com/Fdawgs/docsmith/issues/1231)) ([7ee87e8](https://github.com/Fdawgs/docsmith/commit/7ee87e8ecb99d36b6b4c624422104e41ca52703a))


### Dependencies

* **.dockerignore:** add dist temp dir ([c64c86b](https://github.com/Fdawgs/docsmith/commit/c64c86b6f43a95dd883b8945f352539d9abfa5c7))
* **docker:** create temp dir in correct parent dir ([9441c14](https://github.com/Fdawgs/docsmith/commit/9441c14465dfaa7e096cfd236d1301fb35deaeb3))


### Documentation

* **readme:** clarify source ([d0a4552](https://github.com/Fdawgs/docsmith/commit/d0a4552f185d6497ada945a2723940eeefe1462f))


### Improvements

* **plugins:** replace xml plugin with dedicated dependency ([#1230](https://github.com/Fdawgs/docsmith/issues/1230)) ([b0d982f](https://github.com/Fdawgs/docsmith/commit/b0d982f434226f154887d2c73131d1cc2e799ff7))

## [10.0.4](https://github.com/Fdawgs/docsmith/compare/v10.0.3...v10.0.4) (2023-02-01)


### Continuous integration

* **cd:** add missing install step ([#1225](https://github.com/Fdawgs/docsmith/issues/1225)) ([16f2e2d](https://github.com/Fdawgs/docsmith/commit/16f2e2d7b8c4c658c1626978bbabb7218986ec70))

## [10.0.3](https://github.com/Fdawgs/docsmith/compare/v10.0.2...v10.0.3) (2023-02-01)


### Bug fixes

* **plugins/shared-schemas:** remove 400 response message suppression ([6a4543c](https://github.com/Fdawgs/docsmith/commit/6a4543c338165b18b3d6d313e81d8f5d4243e1cc))
* **server:** response headers for static and 404 routes ([#1194](https://github.com/Fdawgs/docsmith/issues/1194)) ([30ae9b4](https://github.com/Fdawgs/docsmith/commit/30ae9b4ae1106a5dbf9e8366555d469b861a228b))


### Improvements

* **plugins/docx-to-html:** serialize html ([#1192](https://github.com/Fdawgs/docsmith/issues/1192)) ([c4c9dde](https://github.com/Fdawgs/docsmith/commit/c4c9ddee8db621d34a857b9372a3a9d3905d3fb7))
* **routes/docs:** increase cache max-age from 3 to 5 minutes ([7a2659c](https://github.com/Fdawgs/docsmith/commit/7a2659c8add7aa179a31f5eec2cf682308e9723c))


### Miscellaneous

* remove mention of ydh nhsft ([#1219](https://github.com/Fdawgs/docsmith/issues/1219)) ([4578f04](https://github.com/Fdawgs/docsmith/commit/4578f04929f047465a98da4c6c8fcefe84dd97d2))
* **routes/docs/openapi:** reduce cache max-age from 60 to 30 minutes ([941ea81](https://github.com/Fdawgs/docsmith/commit/941ea81a5b618cdfd267c36c76bb2101de2262e7))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.4.0 to 17.4.1 ([#1187](https://github.com/Fdawgs/docsmith/issues/1187)) ([5618a66](https://github.com/Fdawgs/docsmith/commit/5618a66d81317415a25c4258929ba81a9d7ce6f7))
* **deps-dev:** bump @commitlint/cli from 17.4.1 to 17.4.2 ([#1211](https://github.com/Fdawgs/docsmith/issues/1211)) ([f60e90d](https://github.com/Fdawgs/docsmith/commit/f60e90d7c3102310fd7ad02f1e69c24361ee35b4))
* **deps-dev:** bump @commitlint/config-conventional ([#1209](https://github.com/Fdawgs/docsmith/issues/1209)) ([d8003e1](https://github.com/Fdawgs/docsmith/commit/d8003e1bfa993016ae1d5aabf16c23aa979f07c8))
* **deps-dev:** bump esbuild from 0.16.16 to 0.17.5 ([e94e5ac](https://github.com/Fdawgs/docsmith/commit/e94e5ac64378848269f73213afd922f97cffc407))
* **deps-dev:** bump eslint from 8.31.0 to 8.33.0 ([#1208](https://github.com/Fdawgs/docsmith/issues/1208)) ([536bcae](https://github.com/Fdawgs/docsmith/commit/536bcae5b27bec653ffd56f16fd131140cec1b4c))
* **deps-dev:** bump eslint-plugin-import from 2.26.0 to 2.27.5 ([#1201](https://github.com/Fdawgs/docsmith/issues/1201)) ([b6bf528](https://github.com/Fdawgs/docsmith/commit/b6bf528133e86f410897c1081b7eb5c26a5d0421))
* **deps-dev:** bump eslint-plugin-jest from 27.2.0 to 27.2.1 ([#1191](https://github.com/Fdawgs/docsmith/issues/1191)) ([b957f89](https://github.com/Fdawgs/docsmith/commit/b957f8910e95da1076df74d7dfcfc592b651088a))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.6.4 to 39.7.5 ([#1216](https://github.com/Fdawgs/docsmith/issues/1216)) ([47c8612](https://github.com/Fdawgs/docsmith/commit/47c8612143449dd783d1b9a3dfdfdb724843dc3c))
* **deps-dev:** bump eslint-plugin-security from 1.5.0 to 1.7.0 ([#1215](https://github.com/Fdawgs/docsmith/issues/1215)) ([238b057](https://github.com/Fdawgs/docsmith/commit/238b0573f95d8ed43ce1d38d7c807f527ded2b4c))
* **deps-dev:** bump jest from 29.3.1 to 29.4.1 ([#1217](https://github.com/Fdawgs/docsmith/issues/1217)) ([7abb9d8](https://github.com/Fdawgs/docsmith/commit/7abb9d8a583aafeac64ce03046d9e65fcc14abdc))
* **deps-dev:** bump playwright from 1.29.1 to 1.29.2 ([#1189](https://github.com/Fdawgs/docsmith/issues/1189)) ([37bf8a2](https://github.com/Fdawgs/docsmith/commit/37bf8a240c20ff6445ee764e6eeddd31db3d84a0))
* **deps-dev:** bump playwright from 1.29.2 to 1.30.0 ([#1218](https://github.com/Fdawgs/docsmith/issues/1218)) ([be30b28](https://github.com/Fdawgs/docsmith/commit/be30b28d312b786a4d4aecc8dbf586f7d7bce501))
* **deps-dev:** bump prettier from 2.8.1 to 2.8.2 ([#1186](https://github.com/Fdawgs/docsmith/issues/1186)) ([3da94b3](https://github.com/Fdawgs/docsmith/commit/3da94b31f6ba98de0561089b17bb5b96981f7615))
* **deps-dev:** bump prettier from 2.8.2 to 2.8.3 ([#1214](https://github.com/Fdawgs/docsmith/issues/1214)) ([5023fa4](https://github.com/Fdawgs/docsmith/commit/5023fa4cc6ef59f5261d45ede76d820850b6201d))
* **deps:** bump @fastify/autoload from 5.7.0 to 5.7.1 ([#1203](https://github.com/Fdawgs/docsmith/issues/1203)) ([71c72d4](https://github.com/Fdawgs/docsmith/commit/71c72d40280ca92e9de8a97a6808a2d7278e2379))
* **deps:** bump @fastify/static from 6.6.0 to 6.8.0 ([#1205](https://github.com/Fdawgs/docsmith/issues/1205)) ([f7767d6](https://github.com/Fdawgs/docsmith/commit/f7767d65604331d9fb1f300980405d216b85a3be))
* **deps:** bump @fastify/swagger from 8.2.1 to 8.3.0 ([#1213](https://github.com/Fdawgs/docsmith/issues/1213)) ([bfadf53](https://github.com/Fdawgs/docsmith/commit/bfadf536237635ce5ab19e06f8236dafa3c30896))
* **deps:** bump clean-css from 5.3.1 to 5.3.2 ([#1220](https://github.com/Fdawgs/docsmith/issues/1220)) ([9c9e8c2](https://github.com/Fdawgs/docsmith/commit/9c9e8c26c6b35bb8cc3d4c385a2c2cbd88d8119d))
* **deps:** bump fastify from 4.11.0 to 4.12.0 ([#1207](https://github.com/Fdawgs/docsmith/issues/1207)) ([7a89441](https://github.com/Fdawgs/docsmith/commit/7a89441cf0df2d65e7dc02999ff6566c23e25de6))
* **deps:** bump fastify-disablecache from 3.0.4 to 3.0.5 ([#1222](https://github.com/Fdawgs/docsmith/issues/1222)) ([79eb9be](https://github.com/Fdawgs/docsmith/commit/79eb9bea284e27cc21ad2e1056c40349cee60555))
* **deps:** bump fastify-floc-off from 2.0.4 to 2.0.5 ([#1210](https://github.com/Fdawgs/docsmith/issues/1210)) ([e4b1b48](https://github.com/Fdawgs/docsmith/commit/e4b1b484f219659d3d19c51d8f3b6ad768afda61))
* **deps:** bump fastify-plugin from 4.4.0 to 4.5.0 ([#1204](https://github.com/Fdawgs/docsmith/issues/1204)) ([6bd89a1](https://github.com/Fdawgs/docsmith/commit/6bd89a19f351faba04654629153d8525f513606f))
* **deps:** bump glob from 8.0.3 to 8.1.0 ([#1212](https://github.com/Fdawgs/docsmith/issues/1212)) ([ba374ea](https://github.com/Fdawgs/docsmith/commit/ba374eaf590a445403e1fd80bca78fba3199378d))
* **deps:** bump hadolint/hadolint-action from 3.0.0 to 3.1.0 ([#1198](https://github.com/Fdawgs/docsmith/issues/1198)) ([0b891a2](https://github.com/Fdawgs/docsmith/commit/0b891a2e8e739a11af8de68246dd810c851d1342))
* **deps:** bump jsdom from 20.0.3 to 21.0.0 ([#1190](https://github.com/Fdawgs/docsmith/issues/1190)) ([27b01a2](https://github.com/Fdawgs/docsmith/commit/27b01a2eed30d063cf0e4a9c8b39bb975d0db1de))
* **deps:** bump jsdom from 21.0.0 to 21.1.0 ([#1200](https://github.com/Fdawgs/docsmith/issues/1200)) ([787d956](https://github.com/Fdawgs/docsmith/commit/787d9567130ad71ba619bb7b9339848f0015ae2d))
* **deps:** bump node-poppler from 6.1.0 to 6.1.1 ([#1202](https://github.com/Fdawgs/docsmith/issues/1202)) ([229fc5e](https://github.com/Fdawgs/docsmith/commit/229fc5e7ec07cc3ee29a51773277ad2766ccd39f))
* **deps:** bump node-unrtf from 3.0.3 to 3.0.4 ([#1199](https://github.com/Fdawgs/docsmith/issues/1199)) ([a0e776f](https://github.com/Fdawgs/docsmith/commit/a0e776f1d106622359be25bf2687431dfa422da5))
* **deps:** bump node-unrtf from 3.0.4 to 3.0.5 ([#1223](https://github.com/Fdawgs/docsmith/issues/1223)) ([1f15c18](https://github.com/Fdawgs/docsmith/commit/1f15c1814b2a88511998a24b12c7ebd2f4d2143d))
* **deps:** bump secure-json-parse from 2.6.0 to 2.7.0 ([#1221](https://github.com/Fdawgs/docsmith/issues/1221)) ([3e1c874](https://github.com/Fdawgs/docsmith/commit/3e1c874a7c5b9d166b9c0accd9df09155597a138))
* **deps:** bump transistive dependencies ([e02f058](https://github.com/Fdawgs/docsmith/commit/e02f05828969b75815f457a6e1225dc52d056d8d))
* use esbuild to compile ([#1185](https://github.com/Fdawgs/docsmith/issues/1185)) ([cc892ff](https://github.com/Fdawgs/docsmith/commit/cc892ff2782da95032a7adb67b632ddf962bcf58))

## [10.0.2](https://github.com/Fdawgs/docsmith/compare/v10.0.1...v10.0.2) (2023-01-05)


### Bug fixes

* **plugins/rtf-to-txt:** titles with dashes interrupting `replace()` ([6c0dc02](https://github.com/Fdawgs/docsmith/commit/6c0dc02676a46700655b530e031bf9f4c16a0754))
* **routes/docs:** limit files served from redoc module ([0463d2f](https://github.com/Fdawgs/docsmith/commit/0463d2fb9841b4eef2409893ea956edd8d414835))


### Improvements

* **plugins/tidy-css:** clean-css's `minify()` handles whitespace ([f059c84](https://github.com/Fdawgs/docsmith/commit/f059c84a6beb1b38b5adcbcbb485cc8cf73d87cd))
* **routes/docs:** do not expand 200 response by default ([08b0c18](https://github.com/Fdawgs/docsmith/commit/08b0c1815713be909f2cef21f2659b4aa21502b9))
* **routes/docs:** remove search web worker and blob ([8ca3c41](https://github.com/Fdawgs/docsmith/commit/8ca3c41a0e3258c153ea3bc9c4efea34b9ca742e))


### Documentation

* grammar and clarity fixes ([06b3fff](https://github.com/Fdawgs/docsmith/commit/06b3ffff337195f37e78b9a62ae5e798cd6716e8))


### Miscellaneous

* **license:** update license year ([8cd4bea](https://github.com/Fdawgs/docsmith/commit/8cd4bea9e118dbdf40dd4817d28855891825782d))
* **plugins:** rename plugin to use british english spelling ([ab5fad4](https://github.com/Fdawgs/docsmith/commit/ab5fad46e18bfb8c6187439dffcf02f1b74a0a86))
* **route/docs:** remove `x-ua-compatible` meta tag ([bc7ef68](https://github.com/Fdawgs/docsmith/commit/bc7ef68f2b2191af75207def86ae29d961f51454))
* **route/docs:** remove redundant html comment ([343bc7f](https://github.com/Fdawgs/docsmith/commit/343bc7f4a43b7ff69ee1592f8f4ad13a21c429d3))
* update contact details ([74f580a](https://github.com/Fdawgs/docsmith/commit/74f580a4446eb0e2ca37962bafae5e508ba04675))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.3.0 to 17.4.0 ([#1180](https://github.com/Fdawgs/docsmith/issues/1180)) ([a558eab](https://github.com/Fdawgs/docsmith/commit/a558eab1e9bc081a5875591576fbbaa5c305ee8e))
* **deps-dev:** bump @commitlint/config-conventional ([#1183](https://github.com/Fdawgs/docsmith/issues/1183)) ([63a8340](https://github.com/Fdawgs/docsmith/commit/63a8340af60efd050df87e04493412fec2a7fc5b))
* **deps-dev:** bump eslint from 8.29.0 to 8.31.0 ([#1173](https://github.com/Fdawgs/docsmith/issues/1173)) ([a7e7631](https://github.com/Fdawgs/docsmith/commit/a7e76312968fe492a66957cec1baa2fe2168c930))
* **deps-dev:** bump eslint-config-prettier from 8.5.0 to 8.6.0 ([#1179](https://github.com/Fdawgs/docsmith/issues/1179)) ([dae2b61](https://github.com/Fdawgs/docsmith/commit/dae2b6173b00268ee2a2efecc55c963e59d32a3f))
* **deps-dev:** bump eslint-plugin-jest from 27.1.6 to 27.2.0 ([#1171](https://github.com/Fdawgs/docsmith/issues/1171)) ([9ab1df4](https://github.com/Fdawgs/docsmith/commit/9ab1df46adda4ef582efe96f40deb96053a1f1d3))
* **deps-dev:** bump husky from 8.0.2 to 8.0.3 ([#1181](https://github.com/Fdawgs/docsmith/issues/1181)) ([f8ea5ac](https://github.com/Fdawgs/docsmith/commit/f8ea5acc4ef855a1e67efb7d9edf6e2a91496960))
* **deps-dev:** bump playwright from 1.28.1 to 1.29.1 ([#1172](https://github.com/Fdawgs/docsmith/issues/1172)) ([c5dedce](https://github.com/Fdawgs/docsmith/commit/c5dedce66e766ba9b8faf89e889001175abfbca8))
* **deps:** bump @fastify/autoload from 5.6.0 to 5.7.0 ([#1178](https://github.com/Fdawgs/docsmith/issues/1178)) ([8b21624](https://github.com/Fdawgs/docsmith/commit/8b216243429a374db6b93ab09ad3266d2aa33933))
* **deps:** bump fastify from 4.10.2 to 4.11.0 ([#1182](https://github.com/Fdawgs/docsmith/issues/1182)) ([f0e0ddb](https://github.com/Fdawgs/docsmith/commit/f0e0ddb79ebc4dc8dc88331b96860eaffdb585d7))
* **deps:** bump language-tags from 1.0.6 to 1.0.7 ([#1170](https://github.com/Fdawgs/docsmith/issues/1170)) ([d65f4be](https://github.com/Fdawgs/docsmith/commit/d65f4bec8a83923796ca79a4731ee1aca6924d55))
* **deps:** bump pino from 8.7.0 to 8.8.0 ([#1169](https://github.com/Fdawgs/docsmith/issues/1169)) ([7864e54](https://github.com/Fdawgs/docsmith/commit/7864e54512e454e7dc500ebbb5e17482ef3137a9))
* **deps:** bump transistive dependencies ([#1184](https://github.com/Fdawgs/docsmith/issues/1184)) ([45f5f4d](https://github.com/Fdawgs/docsmith/commit/45f5f4d21ea86a6d9b0fee23dce469f81d2207cc))

## [10.0.1](https://github.com/Fdawgs/docsmith/compare/v10.0.0...v10.0.1) (2022-12-12)


### Continuous integration

* **cd:** remove dev values from `package.json` ([#1087](https://github.com/Fdawgs/docsmith/issues/1087)) ([b8da792](https://github.com/Fdawgs/docsmith/commit/b8da79271027e9ba556fe5db4e972c1e8d6995a7))


### Improvements

* **config:** fixed set of object keys ([#1154](https://github.com/Fdawgs/docsmith/issues/1154)) ([952f919](https://github.com/Fdawgs/docsmith/commit/952f919eddc89e51ddb1bcbac59ba8f8a6f1a590))


### Dependencies

* **dependabot:** remove docker auto-updates ([#1142](https://github.com/Fdawgs/docsmith/issues/1142)) ([0b7475b](https://github.com/Fdawgs/docsmith/commit/0b7475bd6e35876e9ff3704712a879d76247354c))
* **deps-dev:** bump eslint from 8.28.0 to 8.29.0 ([#1157](https://github.com/Fdawgs/docsmith/issues/1157)) ([bfe38b1](https://github.com/Fdawgs/docsmith/commit/bfe38b1d41945b9f96ef67752c10886c5d47f43d))
* **deps-dev:** bump eslint-plugin-jest from 27.1.5 to 27.1.6 ([#1149](https://github.com/Fdawgs/docsmith/issues/1149)) ([ac7d472](https://github.com/Fdawgs/docsmith/commit/ac7d472bab8f828e2fd5d4784c6101e65590fc50))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.6.2 to 39.6.4 ([#1144](https://github.com/Fdawgs/docsmith/issues/1144)) ([557a960](https://github.com/Fdawgs/docsmith/commit/557a9609c5fbbee356034b891903be5415743a3a))
* **deps-dev:** bump playwright from 1.28.0 to 1.28.1 ([#1150](https://github.com/Fdawgs/docsmith/issues/1150)) ([c1a58a8](https://github.com/Fdawgs/docsmith/commit/c1a58a8bf9d672785e7eb341e97ffb1a5359c6f9))
* **deps-dev:** bump prettier from 2.8.0 to 2.8.1 ([#1158](https://github.com/Fdawgs/docsmith/issues/1158)) ([d1c5e08](https://github.com/Fdawgs/docsmith/commit/d1c5e080611026a2be21092a9555f0506da714e2))
* **deps:** bump @fastify/accepts from 4.0.1 to 4.1.0 ([#1145](https://github.com/Fdawgs/docsmith/issues/1145)) ([11cbf03](https://github.com/Fdawgs/docsmith/commit/11cbf0385add74a9ffd0a36e2e52f203e1dc0577))
* **deps:** bump @fastify/autoload from 5.5.0 to 5.6.0 ([#1146](https://github.com/Fdawgs/docsmith/issues/1146)) ([b1153dc](https://github.com/Fdawgs/docsmith/commit/b1153dcaaf50ffe99dc947d8387f32a2269d7b80))
* **deps:** bump @fastify/bearer-auth from 8.0.1 to 9.0.0 ([#1163](https://github.com/Fdawgs/docsmith/issues/1163)) ([5ee9afb](https://github.com/Fdawgs/docsmith/commit/5ee9afb74ff3afcf7f1aaad07c5c4654ff075afb))
* **deps:** bump @fastify/compress from 6.1.1 to 6.2.0 ([#1148](https://github.com/Fdawgs/docsmith/issues/1148)) ([0a8aef9](https://github.com/Fdawgs/docsmith/commit/0a8aef9f37f14bbd0eed659b2ea078fd261d5c8a))
* **deps:** bump @fastify/helmet from 10.0.2 to 10.1.0 ([#1147](https://github.com/Fdawgs/docsmith/issues/1147)) ([9eeb041](https://github.com/Fdawgs/docsmith/commit/9eeb041171863fff172688ce3fc077c6c795907b))
* **deps:** bump @fastify/rate-limit from 7.5.0 to 7.6.0 ([#1153](https://github.com/Fdawgs/docsmith/issues/1153)) ([8f2a8f1](https://github.com/Fdawgs/docsmith/commit/8f2a8f1174eb21253ea753b86cfd3daf053f3626))
* **deps:** bump @fastify/sensible from 5.1.1 to 5.2.0 ([#1159](https://github.com/Fdawgs/docsmith/issues/1159)) ([d9d6549](https://github.com/Fdawgs/docsmith/commit/d9d65492146f7c66fde0de481d66aa33ff9e1845))
* **deps:** bump @fastify/static from 6.5.1 to 6.6.0 ([#1164](https://github.com/Fdawgs/docsmith/issues/1164)) ([839650e](https://github.com/Fdawgs/docsmith/commit/839650e16f3d49185af449b0e708142831a967ee))
* **deps:** bump @fastify/swagger from 8.1.0 to 8.2.0 ([#1152](https://github.com/Fdawgs/docsmith/issues/1152)) ([eee9367](https://github.com/Fdawgs/docsmith/commit/eee9367a694d06c74157f522baec6b7e71e35213))
* **deps:** bump @fastify/swagger from 8.2.0 to 8.2.1 ([#1156](https://github.com/Fdawgs/docsmith/issues/1156)) ([a4af5d3](https://github.com/Fdawgs/docsmith/commit/a4af5d3ea90ff5a9950651c66e66d94b6921d8b3))
* **deps:** bump @fastify/under-pressure from 8.1.0 to 8.2.0 ([#1155](https://github.com/Fdawgs/docsmith/issues/1155)) ([fb8ce67](https://github.com/Fdawgs/docsmith/commit/fb8ce67952fb909fb8d6bed2b6d7021cac1a2ad8))
* **deps:** bump env-schema from 5.1.1 to 5.2.0 ([#1161](https://github.com/Fdawgs/docsmith/issues/1161)) ([de6b44c](https://github.com/Fdawgs/docsmith/commit/de6b44c05e519d2d6c3a3019a25d09ec62938fe8))
* **deps:** bump fastify-plugin from 4.3.0 to 4.4.0 ([#1162](https://github.com/Fdawgs/docsmith/issues/1162)) ([472d489](https://github.com/Fdawgs/docsmith/commit/472d4899646234dec9f30de7bef397bdd718c27e))
* **deps:** bump language-tags from 1.0.5 to 1.0.6 ([#1160](https://github.com/Fdawgs/docsmith/issues/1160)) ([23784fe](https://github.com/Fdawgs/docsmith/commit/23784fe271ee8b722cdf56d3368bce0dfb6f3995))
* **deps:** bump secure-json-parse from 2.5.0 to 2.6.0 ([#1165](https://github.com/Fdawgs/docsmith/issues/1165)) ([5a97725](https://github.com/Fdawgs/docsmith/commit/5a97725b75d71e1048f7d838de8eb7e4ca4c2744))
* **deps:** bump tesseract.js from 3.0.3 to 4.0.0 ([#1151](https://github.com/Fdawgs/docsmith/issues/1151)) ([2832a56](https://github.com/Fdawgs/docsmith/commit/2832a56ba339a499d6ca8b6d98825652bc0f4d63))
* **deps:** bump tesseract.js from 4.0.0 to 4.0.1 ([f2481c0](https://github.com/Fdawgs/docsmith/commit/f2481c05425962851a91f9ac3d0bfbfb20b07d5f))
* **deps:** bump transistive dependencies ([46b388c](https://github.com/Fdawgs/docsmith/commit/46b388c9eebe76700a571cf17955d694ddf06cfc))

## [10.0.0](https://github.com/Fdawgs/docsmith/compare/v9.1.3...v10.0.0) (2022-11-23)


### ⚠ BREAKING CHANGES

* minimum required version of node increased from 14.17.0 to 18.12.1
	* Node 14 and 16 becomes EOL in April and September 2023 respectively, which is the same time that my employer is due to merge with another organisation. Development will be focused on the merger at that point in time and I may have less time for this side-project, so this PR preemptively drops support to reduce work load in the future
* **deps:** `LOG_ROTATION_FREQUENCY` env variable accepted values changed from "daily, custom, or test" to "daily, date, [1-12]h, or [1-30]m"
* **config:** `PORT` env variable no longer uses first available open port if unset

### Bug fixes

* **config:** physical cpu core counting ([#1110](https://github.com/Fdawgs/docsmith/issues/1110)) ([4b97e80](https://github.com/Fdawgs/docsmith/commit/4b97e80936048dda15366de0e3dfc89827fcbccc))
* **config:** use port 3000 if `PORT` env variable unset ([#1114](https://github.com/Fdawgs/docsmith/issues/1114)) ([e2fc111](https://github.com/Fdawgs/docsmith/commit/e2fc1113f282fede739d67e33e63986435eda073))
* **routes:** add `HEAD` to cors allowed methods ([#1105](https://github.com/Fdawgs/docsmith/issues/1105)) ([ec5b850](https://github.com/Fdawgs/docsmith/commit/ec5b850ba1aaa22a34a68febe37a1ef204c60093))


### Miscellaneous

* ***.ignore:** fix test log entry ([416b574](https://github.com/Fdawgs/docsmith/commit/416b57490f957ae8f5dd848f98e5048fe20e423b))
* clean up multi-line comments ([4227801](https://github.com/Fdawgs/docsmith/commit/4227801f2db1aee1c39445e86fd857ac16e5b1d3))
* drop support for node 14 and 16 ([#1115](https://github.com/Fdawgs/docsmith/issues/1115)) ([2dc2a73](https://github.com/Fdawgs/docsmith/commit/2dc2a73e47a5a9b5b51025e35a26aeb89bea4c39))
* **plugins/pdf-to-html:** inline comment semantics ([f53ad3a](https://github.com/Fdawgs/docsmith/commit/f53ad3ae8a3f4c13d39b3f484651026bf6193d0d))
* **plugins/tidy-html:** justify empty alt attribute over removal ([361cec3](https://github.com/Fdawgs/docsmith/commit/361cec34a802719939a101c5b442064a865212a5))
* update inline documentation links ([ae61008](https://github.com/Fdawgs/docsmith/commit/ae610089b75eaa7660081cd8576d548fcd267dcd))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.2.0 to 17.3.0 ([#1134](https://github.com/Fdawgs/docsmith/issues/1134)) ([396d6ee](https://github.com/Fdawgs/docsmith/commit/396d6ee431c150618de7ae4f46a5325a60a4969b))
* **deps-dev:** bump @commitlint/config-conventional ([#1133](https://github.com/Fdawgs/docsmith/issues/1133)) ([780df01](https://github.com/Fdawgs/docsmith/commit/780df0142908b954181b09978d76e22f7ed2d818))
* **deps-dev:** bump eslint from 8.26.0 to 8.27.0 ([#1118](https://github.com/Fdawgs/docsmith/issues/1118)) ([f86526f](https://github.com/Fdawgs/docsmith/commit/f86526fc20e25150d4a14c287d8c1ec10dc4b0df))
* **deps-dev:** bump eslint from 8.27.0 to 8.28.0 ([#1139](https://github.com/Fdawgs/docsmith/issues/1139)) ([3e938c6](https://github.com/Fdawgs/docsmith/commit/3e938c6efb0edf0b360a5371ee1d5eb45ecea78c))
* **deps-dev:** bump eslint-plugin-jest from 27.1.3 to 27.1.5 ([#1124](https://github.com/Fdawgs/docsmith/issues/1124)) ([ad23a70](https://github.com/Fdawgs/docsmith/commit/ad23a7041e69d25d61f68b38a5c171fe7bffcc63))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.4.0 to 39.6.2 ([#1119](https://github.com/Fdawgs/docsmith/issues/1119)) ([c74dbd3](https://github.com/Fdawgs/docsmith/commit/c74dbd3a1a852aad2ef5a252bf1c20844168ac3b))
* **deps-dev:** bump husky from 8.0.1 to 8.0.2 ([#1126](https://github.com/Fdawgs/docsmith/issues/1126)) ([4667a37](https://github.com/Fdawgs/docsmith/commit/4667a373d429faab244ce6d820aed8acb3473a5e))
* **deps-dev:** bump jest from 29.2.2 to 29.3.1 ([#1127](https://github.com/Fdawgs/docsmith/issues/1127)) ([7551983](https://github.com/Fdawgs/docsmith/commit/75519835eb682b04ec06d586b67fb18beea3c8b4))
* **deps-dev:** bump playwright from 1.27.1 to 1.28.0 ([#1122](https://github.com/Fdawgs/docsmith/issues/1122)) ([c7d418d](https://github.com/Fdawgs/docsmith/commit/c7d418d2c14e5de8f202a2e5710228203bf5b036))
* **deps-dev:** bump prettier from 2.7.1 to 2.8.0 ([#1140](https://github.com/Fdawgs/docsmith/issues/1140)) ([ced4a0a](https://github.com/Fdawgs/docsmith/commit/ced4a0a2a791a6db51f3a7f98dd1e39eed26d18c))
* **deps-dev:** remove @faker-js/faker ([#1108](https://github.com/Fdawgs/docsmith/issues/1108)) ([a1b24a7](https://github.com/Fdawgs/docsmith/commit/a1b24a7bc0b7c9552e75113b47956b1da82d9901))
* **deps:** bump @fastify/autoload from 5.4.1 to 5.5.0 ([#1138](https://github.com/Fdawgs/docsmith/issues/1138)) ([92bc286](https://github.com/Fdawgs/docsmith/commit/92bc286ce70d77046e6660904186b0879fb461fa))
* **deps:** bump @fastify/cors from 8.1.1 to 8.2.0 ([#1123](https://github.com/Fdawgs/docsmith/issues/1123)) ([470601a](https://github.com/Fdawgs/docsmith/commit/470601a4cfa4d437f906d6cc3657d35085039fb8))
* **deps:** bump @fastify/static from 6.5.0 to 6.5.1 ([#1132](https://github.com/Fdawgs/docsmith/issues/1132)) ([d7f8bfd](https://github.com/Fdawgs/docsmith/commit/d7f8bfd79f86066df84c631d2c5f3eeba3521bb7))
* **deps:** bump actions/dependency-review-action from 2 to 3 ([#1117](https://github.com/Fdawgs/docsmith/issues/1117)) ([efe4a8a](https://github.com/Fdawgs/docsmith/commit/efe4a8a86cfcef8c2eeef7b650c49cd0231a7f67))
* **deps:** bump env-schema from 5.1.0 to 5.1.1 ([#1120](https://github.com/Fdawgs/docsmith/issues/1120)) ([06647f4](https://github.com/Fdawgs/docsmith/commit/06647f463bd9ef0a9bb063e02515ec96c966a256))
* **deps:** bump fastify from 4.10.0 to 4.10.2 ([#1131](https://github.com/Fdawgs/docsmith/issues/1131)) ([b181998](https://github.com/Fdawgs/docsmith/commit/b181998284407bb7ccd5ecf043f6833906066050))
* **deps:** bump fastify from 4.9.2 to 4.10.0 ([#1125](https://github.com/Fdawgs/docsmith/issues/1125)) ([4c0e4a8](https://github.com/Fdawgs/docsmith/commit/4c0e4a850a452214e65e3b0e9a52d35e82a1a20e))
* **deps:** bump file-stream-rotator from 0.6.1 to 1.0.0 ([#1112](https://github.com/Fdawgs/docsmith/issues/1112)) ([97be09e](https://github.com/Fdawgs/docsmith/commit/97be09e63f832b86e51a40dfe1e83b6baf0d3ad8))
* **deps:** bump fix-utf8 from 1.1.1 to 1.1.2 ([#1121](https://github.com/Fdawgs/docsmith/issues/1121)) ([3e5d9b6](https://github.com/Fdawgs/docsmith/commit/3e5d9b6da1a8f147644fac973ea8890d2c50f447))
* **deps:** bump hadolint/hadolint-action from 2.1.0 to 3.0.0 ([#1116](https://github.com/Fdawgs/docsmith/issues/1116)) ([f69da33](https://github.com/Fdawgs/docsmith/commit/f69da3326165838b10d6b849ce6d064cb06975d0))
* **deps:** bump html-minifier-terser from 7.0.0 to 7.1.0 ([#1137](https://github.com/Fdawgs/docsmith/issues/1137)) ([e5cdb33](https://github.com/Fdawgs/docsmith/commit/e5cdb3310d0cc7da3663bcfa3fc4bc1c8944c945))
* **deps:** bump jsdom from 20.0.2 to 20.0.3 ([#1135](https://github.com/Fdawgs/docsmith/issues/1135)) ([c741f3b](https://github.com/Fdawgs/docsmith/commit/c741f3b305b476cf686b101301cf37b76293ffb4))
* **deps:** bump node-poppler from 6.0.3 to 6.1.0 ([#1136](https://github.com/Fdawgs/docsmith/issues/1136)) ([ca3212b](https://github.com/Fdawgs/docsmith/commit/ca3212b66e3bcfa22a890d16c26f2ec82bba8f0d))
* **deps:** bump transistive dependencies ([#1141](https://github.com/Fdawgs/docsmith/issues/1141)) ([ff4ad1d](https://github.com/Fdawgs/docsmith/commit/ff4ad1dcf8f67b203e327116d85595a35bb7fc78))
* **deps:** remove raw-body ([#1107](https://github.com/Fdawgs/docsmith/issues/1107)) ([5643cf1](https://github.com/Fdawgs/docsmith/commit/5643cf13bd4e2e851b445f6d8a29deafb172d2ed))
* **docker:** remove dev values from `package.json` ([04620f5](https://github.com/Fdawgs/docsmith/commit/04620f51d604832f29c0062c2eae347068a43eca))
* **docker:** reorder instructions for build caching ([8e00afd](https://github.com/Fdawgs/docsmith/commit/8e00afd5eb1a1991a3bbd81250d4364e518f6602))

## [9.1.3](https://github.com/Fdawgs/docsmith/compare/v9.1.2...v9.1.3) (2022-11-01)


### Bug fixes

* **routes:** accept header handling ([22a42f8](https://github.com/Fdawgs/docsmith/commit/22a42f81ffc947e99950839fe2acc929c0960467))
* **routes:** openapi schema content types ([b937d3f](https://github.com/Fdawgs/docsmith/commit/b937d3fc0ae6303fe689f7a6b93d914dd50080bd))


### Miscellaneous

* **.env.template:** remove `PORT` value ([d7c818c](https://github.com/Fdawgs/docsmith/commit/d7c818c2d1c6ffc84608199959c6871e28b4b20b))


### Documentation

* content and grammar fixes ([#1086](https://github.com/Fdawgs/docsmith/issues/1086)) ([e4b2ee5](https://github.com/Fdawgs/docsmith/commit/e4b2ee5bcb99b5bbe405c806ef9716b336110f8b))
* **readme:** update example log ([cf43ded](https://github.com/Fdawgs/docsmith/commit/cf43ded9f111866d086d97422eec72fac50dab07))


### Improvements

* **config:** remove redundant required props ([#1101](https://github.com/Fdawgs/docsmith/issues/1101)) ([1ba2277](https://github.com/Fdawgs/docsmith/commit/1ba2277e81aca55a11c38b3640fc75c0de2c5ddb))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.1.2 to 17.2.0 ([#1103](https://github.com/Fdawgs/docsmith/issues/1103)) ([364db75](https://github.com/Fdawgs/docsmith/commit/364db755dbfaaed724eeebe24c536df6a51d26d8))
* **deps-dev:** bump @commitlint/config-conventional ([#1102](https://github.com/Fdawgs/docsmith/issues/1102)) ([51d4f4d](https://github.com/Fdawgs/docsmith/commit/51d4f4dda79fc93de959027c5d76cda1e7b4700c))
* **deps-dev:** bump eslint from 8.25.0 to 8.26.0 ([#1100](https://github.com/Fdawgs/docsmith/issues/1100)) ([5785e87](https://github.com/Fdawgs/docsmith/commit/5785e875bcdeae27424214d8ae9c9e5b16b5fec1))
* **deps-dev:** bump eslint-plugin-jest from 27.1.2 to 27.1.3 ([#1089](https://github.com/Fdawgs/docsmith/issues/1089)) ([890a838](https://github.com/Fdawgs/docsmith/commit/890a838126df429b9a8558a9474fd8c93e52fde5))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.13 to 39.4.0 ([#1093](https://github.com/Fdawgs/docsmith/issues/1093)) ([ba54d2e](https://github.com/Fdawgs/docsmith/commit/ba54d2ebb753339aa9b3bd06c56bef9f71b81816))
* **deps-dev:** bump eslint-plugin-promise from 6.1.0 to 6.1.1 ([#1094](https://github.com/Fdawgs/docsmith/issues/1094)) ([8f91476](https://github.com/Fdawgs/docsmith/commit/8f91476d3945aa6c7984c1bbd9bfb9ac79a18fd4))
* **deps-dev:** bump jest from 29.2.0 to 29.2.2 ([#1095](https://github.com/Fdawgs/docsmith/issues/1095)) ([21a2eaa](https://github.com/Fdawgs/docsmith/commit/21a2eaa0b021ae1994773c49277133bc25252f2c))
* **deps:** bump @fastify/cors from 8.1.0 to 8.1.1 ([#1097](https://github.com/Fdawgs/docsmith/issues/1097)) ([3e37647](https://github.com/Fdawgs/docsmith/commit/3e376475202fdf8a6b7901a800f2acaa0987bda4))
* **deps:** bump fastify-disablecache from 3.0.3 to 3.0.4 ([#1096](https://github.com/Fdawgs/docsmith/issues/1096)) ([deaf80c](https://github.com/Fdawgs/docsmith/commit/deaf80c03fd0515bfea45c86660c76b0813cd28c))
* **deps:** bump fastify-floc-off from 2.0.3 to 2.0.4 ([#1092](https://github.com/Fdawgs/docsmith/issues/1092)) ([1063551](https://github.com/Fdawgs/docsmith/commit/106355141a0868eceb09775bc69fc113d1f80be6))
* **deps:** bump jsdom from 20.0.1 to 20.0.2 ([#1099](https://github.com/Fdawgs/docsmith/issues/1099)) ([cb5c670](https://github.com/Fdawgs/docsmith/commit/cb5c6705625945d6fb2c43eb7ee5f8b8c48c18aa))
* **deps:** bump node-poppler from 6.0.1 to 6.0.3 ([#1090](https://github.com/Fdawgs/docsmith/issues/1090)) ([cd271d6](https://github.com/Fdawgs/docsmith/commit/cd271d63a4c5f3b278db1a3270f19347e45b3cc9))
* **deps:** bump node-unrtf from 3.0.1 to 3.0.3 ([#1098](https://github.com/Fdawgs/docsmith/issues/1098)) ([0b08111](https://github.com/Fdawgs/docsmith/commit/0b08111f7d98a9958b2d5691df3abb448ba9ed1f))
* **deps:** bump pino from 8.6.1 to 8.7.0 ([#1091](https://github.com/Fdawgs/docsmith/issues/1091)) ([f4a811a](https://github.com/Fdawgs/docsmith/commit/f4a811a75875fe4841a04abf1ca0b83ffef6b9f8))
* **deps:** bump transistive dependencies ([#1104](https://github.com/Fdawgs/docsmith/issues/1104)) ([b707dec](https://github.com/Fdawgs/docsmith/commit/b707dec5cc057d8006246ec99f092c6e34a27711))

## [9.1.2](https://github.com/Fdawgs/docsmith/compare/v9.1.1...v9.1.2) (2022-10-18)


### Bug fixes

* **plugins/docx-to-html:** add title to html ([ca3a249](https://github.com/Fdawgs/docsmith/commit/ca3a249c48f3b53fca032d435f135258eb6ea76c))
* **plugins/pdf-to-html:** remove temp file directory path from title ([a192847](https://github.com/Fdawgs/docsmith/commit/a1928470fa4c517b6c8f448b33dc573eede38de4))
* **plugins/rtf-to-html:** add title to html ([8cc313e](https://github.com/Fdawgs/docsmith/commit/8cc313e563927ad164d3af88d57cde44a8d2cd49))


### Improvements

* **plugins:** add metadata to temp file names for easier debugging ([4f3031a](https://github.com/Fdawgs/docsmith/commit/4f3031aa841ab203418222af26ed37a9284f48e3))


### Dependencies

* **deps:** bump fastify from 4.9.1 to 4.9.2 ([#1081](https://github.com/Fdawgs/docsmith/issues/1081)) ([fc12ef9](https://github.com/Fdawgs/docsmith/commit/fc12ef9bb5c7eba66435c5f398ac78dd9266210d))

## [9.1.1](https://github.com/Fdawgs/docsmith/compare/v9.1.0...v9.1.1) (2022-10-18)


### Improvements

* **config:** replace hardcoded value for temp directory ([d39dba2](https://github.com/Fdawgs/docsmith/commit/d39dba2f6a97f4d810f2d369bd5d55eac4791228))


### Miscellaneous

* **server:** remove reference to hardcoded dir ([0c29613](https://github.com/Fdawgs/docsmith/commit/0c29613c3c41c0e2bb0bf159a69c4e7ddb279332))


### Dependencies

* **deps-dev:** bump @faker-js/faker from 7.5.0 to 7.6.0 ([#1066](https://github.com/Fdawgs/docsmith/issues/1066)) ([ffe117d](https://github.com/Fdawgs/docsmith/commit/ffe117d121621e3152da87d7d4de8d59821cfd84))
* **deps-dev:** bump eslint from 8.24.0 to 8.25.0 ([#1077](https://github.com/Fdawgs/docsmith/issues/1077)) ([31d0b35](https://github.com/Fdawgs/docsmith/commit/31d0b35d3e7d856224e7dc700f89ae82be526c25))
* **deps-dev:** bump eslint-plugin-jest from 27.1.1 to 27.1.2 ([#1067](https://github.com/Fdawgs/docsmith/issues/1067)) ([d0a9c5e](https://github.com/Fdawgs/docsmith/commit/d0a9c5edf231ddeca95bb8f6a4266b5c10b3014b))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.6 to 39.3.13 ([#1078](https://github.com/Fdawgs/docsmith/issues/1078)) ([e5c19eb](https://github.com/Fdawgs/docsmith/commit/e5c19ebd14995384146ab52436588c8d5f1fe084))
* **deps-dev:** bump eslint-plugin-promise from 6.0.1 to 6.1.0 ([#1074](https://github.com/Fdawgs/docsmith/issues/1074)) ([36452a2](https://github.com/Fdawgs/docsmith/commit/36452a2fa25fb068eb6933134db7416661fe7223))
* **deps-dev:** bump jest from 29.1.2 to 29.2.0 ([#1073](https://github.com/Fdawgs/docsmith/issues/1073)) ([a5e1c9c](https://github.com/Fdawgs/docsmith/commit/a5e1c9c71a85d4ce8b80af10d695c11bc2fdea56))
* **deps-dev:** bump playwright from 1.26.1 to 1.27.1 ([#1071](https://github.com/Fdawgs/docsmith/issues/1071)) ([d56323d](https://github.com/Fdawgs/docsmith/commit/d56323d764be4ccc8ec6bbb8f20da8bce0055089))
* **deps:** bump @fastify/autoload from 5.4.0 to 5.4.1 ([#1070](https://github.com/Fdawgs/docsmith/issues/1070)) ([3fdf2d8](https://github.com/Fdawgs/docsmith/commit/3fdf2d83679608c0c5f322d081db9e52ffd5774d))
* **deps:** bump @fastify/helmet from 10.0.1 to 10.0.2 ([#1076](https://github.com/Fdawgs/docsmith/issues/1076)) ([0930ced](https://github.com/Fdawgs/docsmith/commit/0930cedd3fb4664213c1f275d66a284957ff8a45))
* **deps:** bump @fastify/rate-limit from 7.4.0 to 7.5.0 ([#1069](https://github.com/Fdawgs/docsmith/issues/1069)) ([b65eab0](https://github.com/Fdawgs/docsmith/commit/b65eab05d0de0642efd715b02bc2ad33bbf5764f))
* **deps:** bump @fastify/swagger from 7.6.1 to 8.0.0 ([#1068](https://github.com/Fdawgs/docsmith/issues/1068)) ([0166758](https://github.com/Fdawgs/docsmith/commit/0166758fa4b701989dc33d84a65f00dcf8623362))
* **deps:** bump fastify from 4.7.0 to 4.8.1 ([#1064](https://github.com/Fdawgs/docsmith/issues/1064)) ([db81718](https://github.com/Fdawgs/docsmith/commit/db81718156337b07c3914e5f3efd9011e860131a))
* **deps:** bump fastify from 4.8.1 to 4.9.1 ([#1075](https://github.com/Fdawgs/docsmith/issues/1075)) ([0249aff](https://github.com/Fdawgs/docsmith/commit/0249aff13f939c04eed915346c6078e19873479c))
* **deps:** bump fastify-plugin from 4.2.1 to 4.3.0 ([#1072](https://github.com/Fdawgs/docsmith/issues/1072)) ([537bd54](https://github.com/Fdawgs/docsmith/commit/537bd54b8597ad6ef600a5d70f52ca224f51d5db))


### Continuous integration

* **cd:** remove test files from release asset ([#1079](https://github.com/Fdawgs/docsmith/issues/1079)) ([b80d445](https://github.com/Fdawgs/docsmith/commit/b80d445310070b7bc140f591d783682682325c4d))

## [9.1.0](https://github.com/Fdawgs/docsmith/compare/v9.0.0...v9.1.0) (2022-10-06)


### Features

* **config:** use first available open port if `PORT` env variable unset ([#1055](https://github.com/Fdawgs/docsmith/issues/1055)) ([5c738e4](https://github.com/Fdawgs/docsmith/commit/5c738e4a4a854b5e7361a7a2c17d832ed9311ac8))


### Continuous integration

* **cd:** create release asset ([2356d52](https://github.com/Fdawgs/docsmith/commit/2356d5289f0f3fca42878a299f23499e42c1a142))


### Dependencies

* **.dockerignore:** add `SECURITY.md` ([014118d](https://github.com/Fdawgs/docsmith/commit/014118d0dcbf289ce6b3d92ee5ac2ab31670ecce))
* **.dockerignore:** fix `CODE_OF_CONDUCT` entry ([#1057](https://github.com/Fdawgs/docsmith/issues/1057)) ([47eb5e2](https://github.com/Fdawgs/docsmith/commit/47eb5e25b5a1515b26ea70ae943b0f49195e38fc))
* **deps-dev:** bump eslint-plugin-jest from 27.0.4 to 27.1.1 ([#1061](https://github.com/Fdawgs/docsmith/issues/1061)) ([94922a7](https://github.com/Fdawgs/docsmith/commit/94922a732e7a7b03d0255aef6d1aabd223e548db))
* **deps-dev:** bump pino-pretty from 9.1.0 to 9.1.1 ([#1059](https://github.com/Fdawgs/docsmith/issues/1059)) ([cd173df](https://github.com/Fdawgs/docsmith/commit/cd173df60ad4952bf53506cd2bf8def437e01562))
* **deps:** bump fluent-json-schema from 3.1.0 to 4.0.0 ([#1060](https://github.com/Fdawgs/docsmith/issues/1060)) ([df43bed](https://github.com/Fdawgs/docsmith/commit/df43bedaf8d784e00530aaa87d786fcffadea685))

## [9.0.0](https://github.com/Fdawgs/docsmith/compare/v8.0.3...v9.0.0) (2022-10-03)


### ⚠ BREAKING CHANGES

* **plugins/tidy-html:** HTML output now minified
* **plugins/tidy-css:** CSS output from HTML routes now minified
* **config:** `SERVICE_BODY_MAX_BYTES` env variable renamed to `REQ_BODY_MAX_BYTES`.
* **config:** `SERVICE_HOST` and `SERVICE_PORT` env variables renamed to `HOST` and `PORT` respectively.

### Features

* add serialization support for xml error responses ([ab44b55](https://github.com/Fdawgs/docsmith/commit/ab44b55bf4237bfc60e5a07063a99dd0420eb731))


### Bug fixes

* **config:** use `HOST` and `PORT` env variables for cloud services ([12b954d](https://github.com/Fdawgs/docsmith/commit/12b954d27e4d8f827d913f978725c5caae0a5108))
* **plugins/serialize-json-to-xml:** rep invalid xml chars with U+FFFD ([#1030](https://github.com/Fdawgs/docsmith/issues/1030)) ([ea6326a](https://github.com/Fdawgs/docsmith/commit/ea6326ace60eab4fbea1d5bc9057005a9f726466))
* **plugins/tidy-css:** remove empty `<style>` element ([#1027](https://github.com/Fdawgs/docsmith/issues/1027)) ([de23308](https://github.com/Fdawgs/docsmith/commit/de23308fa8333f86efdde885ea2d8399fbbfa119))


### Improvements

* **config:** rename `SERVICE_BODY_MAX_BYTES` ([48511a3](https://github.com/Fdawgs/docsmith/commit/48511a38450d3313a8561d34316fb4f84c9f92f0))
* **plugins/serialize-json-to-xml:** minify xml responses ([ff69188](https://github.com/Fdawgs/docsmith/commit/ff69188f758125b824249f998bde5f31f850eaa6))
* **plugins/tidy-css:** combine and minify `<style>` elements ([#1024](https://github.com/Fdawgs/docsmith/issues/1024)) ([0eed2ad](https://github.com/Fdawgs/docsmith/commit/0eed2adbb35cbbd981e9bafe27742454a762166d))
* **plugins/tidy-html:** improve compression ratio by sorting attributes ([eb22ab2](https://github.com/Fdawgs/docsmith/commit/eb22ab2b01c84048baff9595e16836b19eaaadce))
* **plugins/tidy-html:** return minified html ([acb08ec](https://github.com/Fdawgs/docsmith/commit/acb08ec2a6b030d149cd4eaaf56c935d80018547))
* **plugins/tidy-html:** stop attempting to remove comments twice ([#1028](https://github.com/Fdawgs/docsmith/issues/1028)) ([21d0120](https://github.com/Fdawgs/docsmith/commit/21d0120dd8ecef91ded3ccddb81f221d9367fa11))
* **public/image/icons:** compress mask-icon ([142586c](https://github.com/Fdawgs/docsmith/commit/142586c53b08ce8663fec69a560e37e176292cdd))
* **routes/docs:** remove redundant html elem attributes ([1d0f3e0](https://github.com/Fdawgs/docsmith/commit/1d0f3e027b35131d67c247ee2604166a337c1f30))
* **routes:** tidy messy nested functions ([#1026](https://github.com/Fdawgs/docsmith/issues/1026)) ([93c8ad8](https://github.com/Fdawgs/docsmith/commit/93c8ad8c456832ec424dff809d0aa039ca032a3b))


### Documentation

* use shorter urls; fix fastify links ([f88d29b](https://github.com/Fdawgs/docsmith/commit/f88d29b7b6bc53085e9e5dd0f3a28dacc9d3d8f3))


### Miscellaneous

* **.env.template:** remove service section ([672d733](https://github.com/Fdawgs/docsmith/commit/672d7335425ee4b8b5f6e191a5f72c302c6bb8c1))
* **.prettierignore:** consistent order ([1006347](https://github.com/Fdawgs/docsmith/commit/1006347a02f14bbe74bb37c4b657485112ec52d5))
* **.vscode:** add `redhat.vscode-xml` as default xml formatter ([c4c1c23](https://github.com/Fdawgs/docsmith/commit/c4c1c2305ddd85bc88d5858d22e503fbe62939a7))
* ***.ignore:** add clinicjs directory ([fb75b3c](https://github.com/Fdawgs/docsmith/commit/fb75b3c289fcdb2aaa2039af1debfa5b3a04a805))
* import destructuring ([#1029](https://github.com/Fdawgs/docsmith/issues/1029)) ([2bc0add](https://github.com/Fdawgs/docsmith/commit/2bc0add7406bbb34640db9c73664f71a374fdc30))
* **LICENSE:** remove trailing whitespace ([46e2664](https://github.com/Fdawgs/docsmith/commit/46e266444e66aa88df89e4b42d2205676dbc743e))
* **plugins/image-to-txt:** use welsh as second example language ([d81ccf6](https://github.com/Fdawgs/docsmith/commit/d81ccf6dc2b3a36bb707d9436bdfb17ece3bdea8))
* **plugins/tidy-html:** update htmltidy link ([b4b9307](https://github.com/Fdawgs/docsmith/commit/b4b9307f6199dd9e378e750393c42b9c2f15cfb8))
* prefer object destructuring ([#1048](https://github.com/Fdawgs/docsmith/issues/1048)) ([edf8bf4](https://github.com/Fdawgs/docsmith/commit/edf8bf42d29ccd173941ffcf7cb714058c4f52af))


### Dependencies

* **deps-dev:** bump autocannon from 7.9.0 to 7.10.0 ([#1036](https://github.com/Fdawgs/docsmith/issues/1036)) ([ceb060a](https://github.com/Fdawgs/docsmith/commit/ceb060aafeda5ac0e91ea630971f0111522e2bc8))
* **deps-dev:** bump eslint from 8.23.0 to 8.24.0 ([#1040](https://github.com/Fdawgs/docsmith/issues/1040)) ([1e22c0b](https://github.com/Fdawgs/docsmith/commit/1e22c0b69a1473dcd11f5a9e73ad39fe2fb0b455))
* **deps-dev:** bump eslint-plugin-jest from 27.0.1 to 27.0.4 ([#1034](https://github.com/Fdawgs/docsmith/issues/1034)) ([def7975](https://github.com/Fdawgs/docsmith/commit/def79759b57b522cf1d681d50a6fa478d7cb9afd))
* **deps-dev:** bump jest from 29.0.2 to 29.1.2 ([#1042](https://github.com/Fdawgs/docsmith/issues/1042)) ([4f01f3e](https://github.com/Fdawgs/docsmith/commit/4f01f3e0607995337dd4dfb6f8b051aa4edfcc5d))
* **deps-dev:** bump nodemon from 2.0.19 to 2.0.20 ([#1043](https://github.com/Fdawgs/docsmith/issues/1043)) ([8c13806](https://github.com/Fdawgs/docsmith/commit/8c138066ad46b2d45eb66fe208c5440a28b65e5a))
* **deps-dev:** bump playwright from 1.25.1 to 1.26.1 ([#1032](https://github.com/Fdawgs/docsmith/issues/1032)) ([a83ccf7](https://github.com/Fdawgs/docsmith/commit/a83ccf765465c2b5dbcd96d7b2ee33c6bb99bca9))
* **deps:** bump @fastify/autoload from 5.3.1 to 5.4.0 ([#1045](https://github.com/Fdawgs/docsmith/issues/1045)) ([9599668](https://github.com/Fdawgs/docsmith/commit/959966854291bff7aeaf9a739e0f7a1bb254325b))
* **deps:** bump @fastify/helmet from 10.0.0 to 10.0.1 ([#1047](https://github.com/Fdawgs/docsmith/issues/1047)) ([dc3e079](https://github.com/Fdawgs/docsmith/commit/dc3e079f4e33a43207ab80718d023711964517e2))
* **deps:** bump @fastify/swagger from 7.5.0 to 7.6.1 ([#1039](https://github.com/Fdawgs/docsmith/issues/1039)) ([9457dcd](https://github.com/Fdawgs/docsmith/commit/9457dcd544ab49b724a8aa8e2529515edfbeb4d2))
* **deps:** bump dotenv from 16.0.2 to 16.0.3 ([#1033](https://github.com/Fdawgs/docsmith/issues/1033)) ([76a5d5f](https://github.com/Fdawgs/docsmith/commit/76a5d5f14b63107f8e3be3ac75e3344103cc421a))
* **deps:** bump env-schema from 5.0.0 to 5.1.0 ([#1046](https://github.com/Fdawgs/docsmith/issues/1046)) ([f1659d9](https://github.com/Fdawgs/docsmith/commit/f1659d9c1f507d2c2645fc39a5d08c5c977af5d6))
* **deps:** bump fastify from 4.5.3 to 4.7.0 ([#1038](https://github.com/Fdawgs/docsmith/issues/1038)) ([8e93382](https://github.com/Fdawgs/docsmith/commit/8e93382c501af4c09bafa99ef8ac0c3944fe7aa4))
* **deps:** bump fastify-disablecache from 3.0.2 to 3.0.3 ([#1049](https://github.com/Fdawgs/docsmith/issues/1049)) ([26ddab8](https://github.com/Fdawgs/docsmith/commit/26ddab8c926473931a622828f6537a846663dbd2))
* **deps:** bump fastify-floc-off from 2.0.2 to 2.0.3 ([#1051](https://github.com/Fdawgs/docsmith/issues/1051)) ([5277034](https://github.com/Fdawgs/docsmith/commit/52770349396073d1cd5fc5848ce7dc7fcf12ed0e))
* **deps:** bump js2xmlparser from 4.0.2 to 5.0.0 ([#1044](https://github.com/Fdawgs/docsmith/issues/1044)) ([163a902](https://github.com/Fdawgs/docsmith/commit/163a9026ff13538d03d4e60643a2e4fb5d7e5bd5))
* **deps:** bump jsdom from 20.0.0 to 20.0.1 ([#1053](https://github.com/Fdawgs/docsmith/issues/1053)) ([0bfdfcd](https://github.com/Fdawgs/docsmith/commit/0bfdfcd9dd082f68283e95982ca42c58ecfe3dfa))
* **deps:** bump node-poppler from 6.0.0 to 6.0.1 ([#1050](https://github.com/Fdawgs/docsmith/issues/1050)) ([10415a9](https://github.com/Fdawgs/docsmith/commit/10415a9fb2220d9a8b18da2af5cac061068eace2))
* **deps:** bump node-unrtf from 3.0.0 to 3.0.1 ([#1052](https://github.com/Fdawgs/docsmith/issues/1052)) ([a6b3cbe](https://github.com/Fdawgs/docsmith/commit/a6b3cbe42dfd28f8bfb5042910732bd090188b0e))
* **deps:** bump pino from 8.4.2 to 8.6.1 ([#1041](https://github.com/Fdawgs/docsmith/issues/1041)) ([ebc1391](https://github.com/Fdawgs/docsmith/commit/ebc1391750381dd31f10dd5e7a0b72e2e4f6a2a5))
* **deps:** bump redoc from 2.0.0-rc.76 to 2.0.0 ([#1037](https://github.com/Fdawgs/docsmith/issues/1037)) ([58c9303](https://github.com/Fdawgs/docsmith/commit/58c9303a2c486f456a1f4cd2e37d475cce9a07d4))
* **deps:** bump tesseract.js from 3.0.2 to 3.0.3 ([#1035](https://github.com/Fdawgs/docsmith/issues/1035)) ([ceed01a](https://github.com/Fdawgs/docsmith/commit/ceed01a4adadabfcc0f4e1452d0a33d0f1ed7831))
* **deps:** bump transistive dependencies ([#1054](https://github.com/Fdawgs/docsmith/issues/1054)) ([c389c05](https://github.com/Fdawgs/docsmith/commit/c389c0546eb0d70830d63b9b58d17d3b623a7420))

## [8.0.3](https://github.com/Fdawgs/docsmith/compare/v8.0.2...v8.0.3) (2022-09-05)


### Bug fixes

* **config:** `default` throws exceptions when used in `anyOf` schemas ([8637097](https://github.com/Fdawgs/docsmith/commit/863709787a839d09a6a9c01510b86180e1365ea3))
* **plugins/shared-schemas:** replace 415 response message const ([972323b](https://github.com/Fdawgs/docsmith/commit/972323bc9615ed0df15f760d4b60c591d382a0cf))


### Improvements

* **routes/docs/openapi:** ensure response is openapi object ([c33a85f](https://github.com/Fdawgs/docsmith/commit/c33a85f879a5510f5f8bbe59707325876e880e7c))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.0.3 to 17.1.2 ([#999](https://github.com/Fdawgs/docsmith/issues/999)) ([614b635](https://github.com/Fdawgs/docsmith/commit/614b635f5540ba005513d92bc8ee1dacb448d89a))
* **deps-dev:** bump @commitlint/config-conventional ([#1013](https://github.com/Fdawgs/docsmith/issues/1013)) ([b9c01ce](https://github.com/Fdawgs/docsmith/commit/b9c01ceb820193c45bc6cb50435f6078089a5c14))
* **deps-dev:** bump @faker-js/faker from 7.4.0 to 7.5.0 ([#995](https://github.com/Fdawgs/docsmith/issues/995)) ([5f9ac13](https://github.com/Fdawgs/docsmith/commit/5f9ac13a1d74085c792a4eaa459c9ec88e45670a))
* **deps-dev:** bump eslint from 8.22.0 to 8.23.0 ([#1008](https://github.com/Fdawgs/docsmith/issues/1008)) ([d28085a](https://github.com/Fdawgs/docsmith/commit/d28085a88e708519d5d49eb5946eb54a0a9f4987))
* **deps-dev:** bump eslint-plugin-jest from 26.8.4 to 27.0.1 ([#1011](https://github.com/Fdawgs/docsmith/issues/1011)) ([5d565e5](https://github.com/Fdawgs/docsmith/commit/5d565e50911f573bb34da0e1c5c1ef31a5879009))
* **deps-dev:** bump eslint-plugin-promise from 6.0.0 to 6.0.1 ([#1003](https://github.com/Fdawgs/docsmith/issues/1003)) ([606b038](https://github.com/Fdawgs/docsmith/commit/606b0380f91163a18bb368080fe4b0b696014a3f))
* **deps-dev:** bump jest from 28.1.3 to 29.0.1 ([#1002](https://github.com/Fdawgs/docsmith/issues/1002)) ([7b30e8e](https://github.com/Fdawgs/docsmith/commit/7b30e8ed5f575793d824c098dcdb3275f721f2a2))
* **deps-dev:** bump jest from 29.0.1 to 29.0.2 ([#1014](https://github.com/Fdawgs/docsmith/issues/1014)) ([1e742ab](https://github.com/Fdawgs/docsmith/commit/1e742ab707246e9cf1b0d562803154ee872128ec))
* **deps-dev:** bump pino-pretty from 9.0.1 to 9.1.0 ([#1015](https://github.com/Fdawgs/docsmith/issues/1015)) ([5a067d5](https://github.com/Fdawgs/docsmith/commit/5a067d570c7a645eb669e87dad608da2dd687eb9))
* **deps-dev:** bump playwright from 1.25.0 to 1.25.1 ([#997](https://github.com/Fdawgs/docsmith/issues/997)) ([22d9b48](https://github.com/Fdawgs/docsmith/commit/22d9b486aac583e3a35d164c9cd6b851d305c9de))
* **deps:** bump @fastify/accepts from 4.0.0 to 4.0.1 ([#1005](https://github.com/Fdawgs/docsmith/issues/1005)) ([151aa1c](https://github.com/Fdawgs/docsmith/commit/151aa1c2b6d03af2818cd4a68229a5ed4c2e77ce))
* **deps:** bump @fastify/autoload from 5.2.0 to 5.3.1 ([#1016](https://github.com/Fdawgs/docsmith/issues/1016)) ([650f033](https://github.com/Fdawgs/docsmith/commit/650f03363c2dbd0fa522f27c482660b9502563a9))
* **deps:** bump @fastify/compress from 6.1.0 to 6.1.1 ([#1007](https://github.com/Fdawgs/docsmith/issues/1007)) ([35407f2](https://github.com/Fdawgs/docsmith/commit/35407f2f152bad1ae7f7b4e55202acce50533a4b))
* **deps:** bump @fastify/helmet from 9.1.0 to 10.0.0 ([#998](https://github.com/Fdawgs/docsmith/issues/998)) ([3769768](https://github.com/Fdawgs/docsmith/commit/376976874f37a3ab2b4faa4de0afbac0972f2193))
* **deps:** bump @fastify/rate-limit from 7.3.0 to 7.4.0 ([#1009](https://github.com/Fdawgs/docsmith/issues/1009)) ([c5ed75d](https://github.com/Fdawgs/docsmith/commit/c5ed75d447ef5e98c43a5ec0206f8cff78f58999))
* **deps:** bump @fastify/sensible from 5.1.0 to 5.1.1 ([#1000](https://github.com/Fdawgs/docsmith/issues/1000)) ([faf9c4c](https://github.com/Fdawgs/docsmith/commit/faf9c4c45eff449a9ec50c61c4b4036ae310a898))
* **deps:** bump @fastify/swagger from 7.4.1 to 7.5.0 ([#1017](https://github.com/Fdawgs/docsmith/issues/1017)) ([5c9b829](https://github.com/Fdawgs/docsmith/commit/5c9b82994863d745ce392ffbd4ab424e45edbdbe))
* **deps:** bump @fastify/under-pressure from 8.0.0 to 8.1.0 ([#1006](https://github.com/Fdawgs/docsmith/issues/1006)) ([5a25195](https://github.com/Fdawgs/docsmith/commit/5a251958e33ca7fb2b007effdcb86b977c769633))
* **deps:** bump dotenv from 16.0.1 to 16.0.2 ([#996](https://github.com/Fdawgs/docsmith/issues/996)) ([2e720b6](https://github.com/Fdawgs/docsmith/commit/2e720b6ea81f792027e36444bfcff4c4f1d75605))
* **deps:** bump fastify from 4.5.2 to 4.5.3 ([#994](https://github.com/Fdawgs/docsmith/issues/994)) ([bddea46](https://github.com/Fdawgs/docsmith/commit/bddea46367600caf568f73190ae0c97a3676ca06))
* **deps:** bump fastify-plugin from 4.2.0 to 4.2.1 ([#1001](https://github.com/Fdawgs/docsmith/issues/1001)) ([0d49bca](https://github.com/Fdawgs/docsmith/commit/0d49bcaa606db8100ba9a6993edf54950d88fe77))
* **deps:** bump mammoth from 1.4.21 to 1.5.1 ([#1012](https://github.com/Fdawgs/docsmith/issues/1012)) ([97c40c5](https://github.com/Fdawgs/docsmith/commit/97c40c537f1e7f6224c8048d938df436449169bf))
* **deps:** bump tesseract.js from 3.0.1 to 3.0.2 ([#1004](https://github.com/Fdawgs/docsmith/issues/1004)) ([aa1f614](https://github.com/Fdawgs/docsmith/commit/aa1f61471c5c77209db5326ec27431d583f4c6f9))
* **deps:** bump transistive dependencies ([ebd2c4f](https://github.com/Fdawgs/docsmith/commit/ebd2c4f28245889b491fc2ebb7fe53d4aebf9c6b))
* **docker:** reduce chmod permissions to execute only ([#990](https://github.com/Fdawgs/docsmith/issues/990)) ([f488f28](https://github.com/Fdawgs/docsmith/commit/f488f2863eba0c7a0d14badcca7cb492db0a0abd))


### Miscellaneous

* **.husky:** shell path and arg updates ([#992](https://github.com/Fdawgs/docsmith/issues/992)) ([b039c9d](https://github.com/Fdawgs/docsmith/commit/b039c9d28f91564815a0725856f306279e81c11d))
* **.vscode/extensions:** remove unmaintained extension ([046854f](https://github.com/Fdawgs/docsmith/commit/046854f1029e5284be5801e88d3f2c56566fed98))
* **config:** remove redundant todo inline comment ([3f17acf](https://github.com/Fdawgs/docsmith/commit/3f17acf77153e42b177874e084cfc9f15385eb61))
* **test_resources:** compress test documents ([0cc8aa5](https://github.com/Fdawgs/docsmith/commit/0cc8aa58b35fbbf73ddba2999d790a27a6f06447))

## [8.0.2](https://github.com/Fdawgs/docsmith/compare/v8.0.1...v8.0.2) (2022-08-20)


### Dependencies

* **deps-dev:** bump eslint-plugin-jest from 26.8.3 to 26.8.4 ([#986](https://github.com/Fdawgs/docsmith/issues/986)) ([c520501](https://github.com/Fdawgs/docsmith/commit/c5205010299c38de5ca2578874243b10f9134ba0))
* **deps:** bump fastify from 4.5.0 to 4.5.2 ([#988](https://github.com/Fdawgs/docsmith/issues/988)) ([5b25fc4](https://github.com/Fdawgs/docsmith/commit/5b25fc4dd99090a621e8299c8f98a5974406712c))
* **deps:** bump pino from 8.4.1 to 8.4.2 ([#987](https://github.com/Fdawgs/docsmith/issues/987)) ([b9f695e](https://github.com/Fdawgs/docsmith/commit/b9f695e7e00ae7205c3f7a3cb460d6f571ddd163))
* **deps:** bump redoc from 2.0.0-rc.75 to 2.0.0-rc.76 ([#985](https://github.com/Fdawgs/docsmith/issues/985)) ([2d3cab6](https://github.com/Fdawgs/docsmith/commit/2d3cab6142dcbec65e77d106a8fa15acaa328c32))
* **deps:** bump tesseract.js from 2.1.5 to 3.0.1 ([#989](https://github.com/Fdawgs/docsmith/issues/989)) ([2f2818f](https://github.com/Fdawgs/docsmith/commit/2f2818fbe44cd09ccdd7e5dbbe534cf2253647fe))


### Continuous integration

* **ci:** add node 18 to test matrix ([#823](https://github.com/Fdawgs/docsmith/issues/823)) ([13a0ac0](https://github.com/Fdawgs/docsmith/commit/13a0ac094c2137e8bbfc0634ab304d1ef78d3f9d))


### Miscellaneous

* compress images ([#983](https://github.com/Fdawgs/docsmith/issues/983)) ([9d2c22f](https://github.com/Fdawgs/docsmith/commit/9d2c22fb67719fbb311dcd7f1b32ff4931c406d1))
* **package:** update `lint:licenses` script ([ee0c2be](https://github.com/Fdawgs/docsmith/commit/ee0c2be2b4c52a5930630c7aa76e54b7249f229a))

## [8.0.1](https://github.com/Fdawgs/docsmith/compare/v8.0.0...v8.0.1) (2022-08-18)


### Miscellaneous

* rename `options.tempDirectory` to `options.tempDir` ([fd4ac24](https://github.com/Fdawgs/docsmith/commit/fd4ac2457dd0758b9efd8afe6a72fa1ff6e02f8a))


### Improvements

* **config:** expose `tempDir` at top level of object ([368d815](https://github.com/Fdawgs/docsmith/commit/368d815293a5a0b4563a3cba3ffe7102c211c156))
* **plugins/rtf-to-html:** remove duplicate `fs.mkdir()` call ([4541344](https://github.com/Fdawgs/docsmith/commit/454134489e00bed8c8484e1a7ee7aeb45019225b))
* **plugins:** make `options.tempDirectory` mandatory ([18bcf39](https://github.com/Fdawgs/docsmith/commit/18bcf3908ce3ce15d5150ed75e8ca245fd1f482a))
* **plugins:** move const arrays out of hooks ([9fe2f15](https://github.com/Fdawgs/docsmith/commit/9fe2f15559f05caf0bcd3f06683428a353e5eb8c))
* **plugins:** only create `unRTF` and `Poppler` classes once on reg ([736a9b4](https://github.com/Fdawgs/docsmith/commit/736a9b40a0c353790429045edd8dd07fff7b847d))
* **plugins:** only create temp directory once on register ([e6945cb](https://github.com/Fdawgs/docsmith/commit/e6945cb9ae26fa322a6c64ca4ebf3ec2e96725e3))
* remove redundant returns ([3373b6d](https://github.com/Fdawgs/docsmith/commit/3373b6d147eabc8a002ec318f177966b1ad2e2cb))
* **routes:** check accept header is supported before parsing req body ([ae167c9](https://github.com/Fdawgs/docsmith/commit/ae167c98ad4059760587ffc9cab9b0e4a77212fe))
* **routes:** convert sync async handlers to sync only ([a9672d2](https://github.com/Fdawgs/docsmith/commit/a9672d23e1d0045ac38f10f616e30fa08fbd6b22))


### Dependencies

* **deps-dev:** bump eslint from 8.21.0 to 8.22.0 ([#981](https://github.com/Fdawgs/docsmith/issues/981)) ([12012ce](https://github.com/Fdawgs/docsmith/commit/12012ce40a9ff61f210e3f9f4f7662e7817da9cf))
* **deps-dev:** bump eslint-plugin-jest from 26.8.2 to 26.8.3 ([#974](https://github.com/Fdawgs/docsmith/issues/974)) ([ecb7689](https://github.com/Fdawgs/docsmith/commit/ecb76898098f6a85df63a354f6a37d28bc5bd1c9))
* **deps-dev:** bump pino-pretty from 8.1.0 to 9.0.1 ([#977](https://github.com/Fdawgs/docsmith/issues/977)) ([d4fca71](https://github.com/Fdawgs/docsmith/commit/d4fca7197ca6d78c5dcd89981fd588898861ccd4))
* **deps-dev:** bump playwright from 1.24.2 to 1.25.0 ([#976](https://github.com/Fdawgs/docsmith/issues/976)) ([6e493d9](https://github.com/Fdawgs/docsmith/commit/6e493d9b86cd18d3cff3ccbc89b39b9f0969291f))
* **deps:** bump @fastify/under-pressure from 7.0.0 to 8.0.0 ([#978](https://github.com/Fdawgs/docsmith/issues/978)) ([3ce02b6](https://github.com/Fdawgs/docsmith/commit/3ce02b6003709cacd5be6e1094a7036a3737a1e5))
* **deps:** bump fastify from 4.4.0 to 4.5.0 ([#975](https://github.com/Fdawgs/docsmith/issues/975)) ([f3eb087](https://github.com/Fdawgs/docsmith/commit/f3eb087c0c2cc76b9187f7e35a5f4507f0b4d5fb))
* **deps:** bump fastify-plugin from 4.1.0 to 4.2.0 ([#979](https://github.com/Fdawgs/docsmith/issues/979)) ([3f19262](https://github.com/Fdawgs/docsmith/commit/3f19262a17266e46e973601061a1671170f1d284))
* **deps:** bump pino from 8.4.0 to 8.4.1 ([#973](https://github.com/Fdawgs/docsmith/issues/973)) ([7dd3129](https://github.com/Fdawgs/docsmith/commit/7dd3129b2c229d04d3ac82dd9b0f3cdc24f2f182))
* **deps:** bump redoc from 2.0.0-rc.74 to 2.0.0-rc.75 ([#980](https://github.com/Fdawgs/docsmith/issues/980)) ([e54c873](https://github.com/Fdawgs/docsmith/commit/e54c873aac0ee9781e4cd434792efb1ab84d1683))
* **deps:** bump sub-dependencies ([#982](https://github.com/Fdawgs/docsmith/issues/982)) ([c460bf0](https://github.com/Fdawgs/docsmith/commit/c460bf01e28ea1032bf6910dd7566f9b967ce120))

## [8.0.0](https://github.com/Fdawgs/docsmith/compare/v7.0.11...v8.0.0) (2022-08-09)


### ⚠ BREAKING CHANGES

* drop support for EOL node 15

### Bug fixes

* **config:** log rotation max files ([#954](https://github.com/Fdawgs/docsmith/issues/954)) ([8ab22f2](https://github.com/Fdawgs/docsmith/commit/8ab22f273c292e1af815cf061c08ceadff7d869f))


### Miscellaneous

* drop support for node 15 ([#956](https://github.com/Fdawgs/docsmith/issues/956)) ([03f3b1f](https://github.com/Fdawgs/docsmith/commit/03f3b1fae774afe5fd9c4a9bf1c7c201514a567c))


### Dependencies

* **deps-dev:** bump @faker-js/faker from 7.3.0 to 7.4.0 ([#960](https://github.com/Fdawgs/docsmith/issues/960)) ([3e2b56d](https://github.com/Fdawgs/docsmith/commit/3e2b56da3afa187b96bcaed25e63fe949dd23215))
* **deps-dev:** bump eslint-plugin-jest from 26.7.0 to 26.8.2 ([#966](https://github.com/Fdawgs/docsmith/issues/966)) ([74f29ce](https://github.com/Fdawgs/docsmith/commit/74f29ce8411aff551b127a5f8897b407028d8890))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.4 to 39.3.6 ([#965](https://github.com/Fdawgs/docsmith/issues/965)) ([4b5b9c9](https://github.com/Fdawgs/docsmith/commit/4b5b9c9bc885ca1c8c06234c42554a0ec7823c83))
* **deps:** bump @fastify/autoload from 5.1.0 to 5.2.0 ([#962](https://github.com/Fdawgs/docsmith/issues/962)) ([c9862be](https://github.com/Fdawgs/docsmith/commit/c9862befaab3e1521d01f34a236e4fd5e19efd5e))
* **deps:** bump fastify from 4.3.0 to 4.4.0 ([#957](https://github.com/Fdawgs/docsmith/issues/957)) ([ccf007a](https://github.com/Fdawgs/docsmith/commit/ccf007af3997f93f95cbfcd5be4d929780d2d498))
* **deps:** bump fastify-disablecache from 3.0.1 to 3.0.2 ([#958](https://github.com/Fdawgs/docsmith/issues/958)) ([3e2b769](https://github.com/Fdawgs/docsmith/commit/3e2b7696b1092fd1f8e628ba925e1385b2bc6dce))
* **deps:** bump fastify-floc-off from 2.0.1 to 2.0.2 ([#963](https://github.com/Fdawgs/docsmith/issues/963)) ([636f4a0](https://github.com/Fdawgs/docsmith/commit/636f4a06e82fba435f28739c7fdd037f8cda3a82))
* **deps:** bump node-poppler from 5.1.6 to 6.0.0 ([#967](https://github.com/Fdawgs/docsmith/issues/967)) ([879f849](https://github.com/Fdawgs/docsmith/commit/879f8497809f4ade19fbc91dc16139754eebf7eb))
* **deps:** bump node-unrtf from 2.0.9 to 3.0.0 ([#959](https://github.com/Fdawgs/docsmith/issues/959)) ([2d570b2](https://github.com/Fdawgs/docsmith/commit/2d570b2474f080f4ce87ee281691585031f6f086))
* **deps:** bump pino from 8.3.1 to 8.4.0 ([#961](https://github.com/Fdawgs/docsmith/issues/961)) ([0d5671e](https://github.com/Fdawgs/docsmith/commit/0d5671e74188e9f1a4e1e545899eb7cd1694150d))

## [7.0.11](https://github.com/Fdawgs/docsmith/compare/v7.0.10...v7.0.11) (2022-08-04)


### Bug fixes

* **routes:** invalid openapi shared schema definitions ([#949](https://github.com/Fdawgs/docsmith/issues/949)) ([c0338c5](https://github.com/Fdawgs/docsmith/commit/c0338c5e553de85d0fed404be26ee0f934d10b74))
* **server:** reduce `content-security-policy` for options routes ([#951](https://github.com/Fdawgs/docsmith/issues/951)) ([a228aca](https://github.com/Fdawgs/docsmith/commit/a228aca1f6d750638a251915d5a7810781644a36))


### Dependencies

* **deps:** bump @fastify/cors from 8.0.0 to 8.1.0 ([#952](https://github.com/Fdawgs/docsmith/issues/952)) ([6f597f0](https://github.com/Fdawgs/docsmith/commit/6f597f0a1de3415fead3bb5f6703915c6b3519b4))

## [7.0.10](https://github.com/Fdawgs/docsmith/compare/v7.0.9...v7.0.10) (2022-08-01)


### Improvements

* migrate from fastify v3 to v4 ([#933](https://github.com/Fdawgs/docsmith/issues/933)) ([c8a879e](https://github.com/Fdawgs/docsmith/commit/c8a879e213ca6f8ced3e667c613581d13258d26a))


### Continuous integration

* **ci:** audit npm package signatures ([dd6e0a1](https://github.com/Fdawgs/docsmith/commit/dd6e0a1b913e818f6775cba770642ab3dec91a1e))


### Miscellaneous

* **.*ignore:** add pnpm lockfile ([#940](https://github.com/Fdawgs/docsmith/issues/940)) ([b86943a](https://github.com/Fdawgs/docsmith/commit/b86943a47d60c009ebc0b8114ab41ce87bd1eef4))
* replace `--production` npm arg with `--omit=dev` ([843f2d7](https://github.com/Fdawgs/docsmith/commit/843f2d78acd760f04baf6cba9ad6497151177c83))


### Dependencies

* **deps-dev:** bump eslint from 8.20.0 to 8.21.0 ([#947](https://github.com/Fdawgs/docsmith/issues/947)) ([3c84747](https://github.com/Fdawgs/docsmith/commit/3c84747f6689811b3988cfd96f39ce1100ceb6e7))
* **deps-dev:** bump eslint-plugin-jest from 26.6.0 to 26.7.0 ([#943](https://github.com/Fdawgs/docsmith/issues/943)) ([5d901bd](https://github.com/Fdawgs/docsmith/commit/5d901bdb0471c9e957954414a3c1b7299ab8943d))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.3 to 39.3.4 ([#942](https://github.com/Fdawgs/docsmith/issues/942)) ([d0b0385](https://github.com/Fdawgs/docsmith/commit/d0b03850dbbfdfaec54dcc7573de34a2e256836e))
* **deps-dev:** bump playwright from 1.24.1 to 1.24.2 ([#945](https://github.com/Fdawgs/docsmith/issues/945)) ([b8cd36d](https://github.com/Fdawgs/docsmith/commit/b8cd36d38f26fbfe5246a4fa89d36f1a9c306aef))
* **deps:** bump @fastify/static from 6.4.1 to 6.5.0 ([#944](https://github.com/Fdawgs/docsmith/issues/944)) ([b04a830](https://github.com/Fdawgs/docsmith/commit/b04a830ac047e1deef225d9df21d9bb3cc5de3e4))
* **deps:** bump fastify-disablecache from 3.0.0 to 3.0.1 ([#939](https://github.com/Fdawgs/docsmith/issues/939)) ([badd3c3](https://github.com/Fdawgs/docsmith/commit/badd3c3ba076cec966eb88b8c48b2f574dc6916d))
* **deps:** bump fastify-floc-off from 2.0.0 to 2.0.1 ([#938](https://github.com/Fdawgs/docsmith/issues/938)) ([545bb32](https://github.com/Fdawgs/docsmith/commit/545bb32963025d1ec62a5b5552da69290cc418e9))
* **deps:** bump file-type from 16.5.3 to 16.5.4 ([#932](https://github.com/Fdawgs/docsmith/issues/932)) ([de32fc1](https://github.com/Fdawgs/docsmith/commit/de32fc14e7b093771fd6fa47bc2d3fac4d9176b1))
* **deps:** bump pino from 8.3.0 to 8.3.1 ([#936](https://github.com/Fdawgs/docsmith/issues/936)) ([4496037](https://github.com/Fdawgs/docsmith/commit/4496037251de19c74cdf1e62241095cf89c12e53))
* **deps:** bump redoc from 2.0.0-rc.72 to 2.0.0-rc.74 ([#941](https://github.com/Fdawgs/docsmith/issues/941)) ([346f7e2](https://github.com/Fdawgs/docsmith/commit/346f7e2214c78ccb4591d22e8a8651144d502360))
* **deps:** bump secure-json-parse from 2.4.0 to 2.5.0 ([#946](https://github.com/Fdawgs/docsmith/issues/946)) ([618a041](https://github.com/Fdawgs/docsmith/commit/618a041455ddd6bb2b67434026e2cc463ec9d759))
* **deps:** bump sub-dependencies ([#948](https://github.com/Fdawgs/docsmith/issues/948)) ([80c040e](https://github.com/Fdawgs/docsmith/commit/80c040ef1aec44f1e64a471090fec33bae2d1a66))

## [7.0.9](https://github.com/Fdawgs/docsmith/compare/v7.0.8...v7.0.9) (2022-07-18)


### Improvements

* **app:** combine multiple `await`s into `Promise.all()` ([e5cd27b](https://github.com/Fdawgs/docsmith/commit/e5cd27bacaeaee67c57c46154c6df42903cfdc79))
* **plugins:** remove useless `catch`s rethrowing errors ([40c84a8](https://github.com/Fdawgs/docsmith/commit/40c84a828a8f821b05e617405006afb65e8dcd89))
* **plugins:** use `try...catch` over `Promise.catch()` ([4ba4978](https://github.com/Fdawgs/docsmith/commit/4ba497876554a7199b95a317331436c20815c294))


### Dependencies

* **deps-dev:** bump eslint from 8.19.0 to 8.20.0 ([#931](https://github.com/Fdawgs/docsmith/issues/931)) ([b14b0b8](https://github.com/Fdawgs/docsmith/commit/b14b0b8b35e93990cdeebfa85e6f35eddd375a8a))
* **deps-dev:** bump eslint-plugin-jest from 26.5.3 to 26.6.0 ([#929](https://github.com/Fdawgs/docsmith/issues/929)) ([b0622d5](https://github.com/Fdawgs/docsmith/commit/b0622d5632d7b692a7abdf2fd3babd54625fdffd))
* **deps-dev:** bump playwright from 1.23.3 to 1.23.4 ([#930](https://github.com/Fdawgs/docsmith/issues/930)) ([ee1f217](https://github.com/Fdawgs/docsmith/commit/ee1f217242f4ff515ef62a88252188e70da50153))
* **deps:** bump pino from 8.1.0 to 8.2.0 ([#928](https://github.com/Fdawgs/docsmith/issues/928)) ([b6e48fb](https://github.com/Fdawgs/docsmith/commit/b6e48fbc954ec4b07de52de58cfd7d5bfc0dbc2f))

## [7.0.8](https://github.com/Fdawgs/docsmith/compare/v7.0.7...v7.0.8) (2022-07-14)


### Miscellaneous

* remove redundant `async` keywords ([2ba30c8](https://github.com/Fdawgs/docsmith/commit/2ba30c837b6854afe536c9b60ec1a831f5ddddb5))


### Documentation

* **readme:** use block quotes for notes to enable github md highlights ([e98b784](https://github.com/Fdawgs/docsmith/commit/e98b784969c6d322b495f04d8bbc6f6bec1fd963))


### Dependencies

* **dependabot:** increase `open-pull-requests-limit` from 5 to 20 ([b0d9790](https://github.com/Fdawgs/docsmith/commit/b0d97903fb90a60d4640b09b513e51ebe1e993ca))
* **deps-dev:** bump @commitlint/cli from 17.0.2 to 17.0.3 ([#910](https://github.com/Fdawgs/docsmith/issues/910)) ([567076f](https://github.com/Fdawgs/docsmith/commit/567076f917a11aea9d24465b670a072de0d8947b))
* **deps-dev:** bump @commitlint/config-conventional ([#903](https://github.com/Fdawgs/docsmith/issues/903)) ([85a9e4d](https://github.com/Fdawgs/docsmith/commit/85a9e4dc4710ac85fe759d18a405cd1518e39f41))
* **deps-dev:** bump @faker-js/faker from 7.2.0 to 7.3.0 ([#908](https://github.com/Fdawgs/docsmith/issues/908)) ([4ca4bda](https://github.com/Fdawgs/docsmith/commit/4ca4bda6929c3985e3e0629fe604a6996ceee6e8))
* **deps-dev:** bump eslint from 8.17.0 to 8.19.0 ([#913](https://github.com/Fdawgs/docsmith/issues/913)) ([ee264e1](https://github.com/Fdawgs/docsmith/commit/ee264e15d7c09fdf8ec4596717b84a81145a27ce))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.2 to 39.3.3 ([#916](https://github.com/Fdawgs/docsmith/issues/916)) ([d99cc5d](https://github.com/Fdawgs/docsmith/commit/d99cc5d0ac7c4af7738c7bd5363efdabe4f2cc79))
* **deps-dev:** bump jest from 28.1.1 to 28.1.2 ([#911](https://github.com/Fdawgs/docsmith/issues/911)) ([566b281](https://github.com/Fdawgs/docsmith/commit/566b2814917ba838d3fdd177b95a08c53ad3d11e))
* **deps-dev:** bump jest from 28.1.2 to 28.1.3 ([#920](https://github.com/Fdawgs/docsmith/issues/920)) ([ffcb188](https://github.com/Fdawgs/docsmith/commit/ffcb188ad3fb34f8a191fb6d1e2fd5cc71ba1aa8))
* **deps-dev:** bump nodemon from 2.0.16 to 2.0.19 ([#906](https://github.com/Fdawgs/docsmith/issues/906)) ([8bf7b0d](https://github.com/Fdawgs/docsmith/commit/8bf7b0ddae742db74e33ee8ffb41abb598bee382))
* **deps-dev:** bump pino-pretty from 8.0.0 to 8.1.0 ([#915](https://github.com/Fdawgs/docsmith/issues/915)) ([e77f682](https://github.com/Fdawgs/docsmith/commit/e77f682b21e89df5df31578b85d30fb0fc473af1))
* **deps-dev:** bump playwright from 1.22.2 to 1.23.2 ([#912](https://github.com/Fdawgs/docsmith/issues/912)) ([3ec0ef7](https://github.com/Fdawgs/docsmith/commit/3ec0ef77234180ae60484a3d76c2ebd1263929e2))
* **deps-dev:** bump playwright from 1.23.2 to 1.23.3 ([#919](https://github.com/Fdawgs/docsmith/issues/919)) ([0d2350f](https://github.com/Fdawgs/docsmith/commit/0d2350f33db2e2a19e6a72ef01b99b89bb513e46))
* **deps-dev:** bump prettier from 2.7.0 to 2.7.1 ([#902](https://github.com/Fdawgs/docsmith/issues/902)) ([ee7413d](https://github.com/Fdawgs/docsmith/commit/ee7413d006cf402b7cd335f9293b771271f53829))
* **deps:** bump @fastify/autoload from 4.0.1 to 5.1.0 ([#917](https://github.com/Fdawgs/docsmith/issues/917)) ([4c34420](https://github.com/Fdawgs/docsmith/commit/4c34420f931acc8e35ebf5dddcaca35d4afc96fc))
* **deps:** bump actions/dependency-review-action from 1 to 2 ([#899](https://github.com/Fdawgs/docsmith/issues/899)) ([57ba948](https://github.com/Fdawgs/docsmith/commit/57ba94846a916d936e13947907e42a8a7ec4f10d))
* **deps:** bump fastify-plugin from 3.0.1 to 4.0.0 ([#922](https://github.com/Fdawgs/docsmith/issues/922)) ([2375609](https://github.com/Fdawgs/docsmith/commit/23756099fceecb5f82b32d090541bad41cd2b584))
* **deps:** bump jsdom from 19.0.0 to 20.0.0 ([5f146e2](https://github.com/Fdawgs/docsmith/commit/5f146e2e90ca153902af5484ab6025d60abb978e))
* **deps:** bump moment from 2.29.3 to 2.29.4 ([#907](https://github.com/Fdawgs/docsmith/issues/907)) ([d452a10](https://github.com/Fdawgs/docsmith/commit/d452a101a1d30dec05368880c633300e36ac1a41))
* **deps:** bump pino from 8.0.0 to 8.1.0 ([#901](https://github.com/Fdawgs/docsmith/issues/901)) ([ed21d43](https://github.com/Fdawgs/docsmith/commit/ed21d4362b4ababec466f1937ebe82992e973400))
* **deps:** bump sub-dependencies ([#924](https://github.com/Fdawgs/docsmith/issues/924)) ([9269653](https://github.com/Fdawgs/docsmith/commit/9269653ff1d0105b73555cf6cc28aa9ba4161774))
* **deps:** bump wagoid/commitlint-github-action from 4 to 5 ([#898](https://github.com/Fdawgs/docsmith/issues/898)) ([0f5deba](https://github.com/Fdawgs/docsmith/commit/0f5deba9d18c017dca862d8801ccbe9f567ad88e))

## [7.0.7](https://github.com/Fdawgs/docsmith/compare/v7.0.6...v7.0.7) (2022-06-15)


### Documentation

* **readme:** grammar fixes ([f6dd5e7](https://github.com/Fdawgs/docsmith/commit/f6dd5e7812c8d76eb14de6d136a6c5d50b19c1bf))


### Miscellaneous

* **.github/funding:** remove unused keys ([639199a](https://github.com/Fdawgs/docsmith/commit/639199add2005687ffc270ebc3c36ec9440ec3a3))
* **.github:** add `FUNDING.yml` ([c206bee](https://github.com/Fdawgs/docsmith/commit/c206beebea97d97526525e64797a33130c457c44))
* **.gitignore:** use latest github ignore template ([8c04671](https://github.com/Fdawgs/docsmith/commit/8c04671458d24b5bd88046cce5f9c058abb5f919))
* **.prettierignore:** add new paths from `.gitignore` ([55c16a2](https://github.com/Fdawgs/docsmith/commit/55c16a2f2f46733011c26042ad80aa2b10ee0412))


### Improvements

* **plugins/embed-html-images:** remove `await` in `Promise.all()` ([b398232](https://github.com/Fdawgs/docsmith/commit/b398232f3e64906685391ba6c75eae5fae0dd5f3))
* **plugins/pdf-to-txt:** remove `await` in `Promise.all()` ([f2c1892](https://github.com/Fdawgs/docsmith/commit/f2c18922506bba298207e416c1cdfa5aaf06045b))
* **plugins:** explicitly catch promise rejections ([196fd9f](https://github.com/Fdawgs/docsmith/commit/196fd9f521fb0d57abb6f705563f82d300415d97))


### Dependencies

* **deps-dev:** bump @faker-js/faker from 7.1.0 to 7.2.0 ([#891](https://github.com/Fdawgs/docsmith/issues/891)) ([dd20ad3](https://github.com/Fdawgs/docsmith/commit/dd20ad35c91f6827307382899b103f1d5e980cd7))
* **deps-dev:** bump eslint from 8.16.0 to 8.17.0 ([#887](https://github.com/Fdawgs/docsmith/issues/887)) ([3cd70fa](https://github.com/Fdawgs/docsmith/commit/3cd70fa1454795cc6af9b17ec23e0e1b501e39d5))
* **deps-dev:** bump eslint-plugin-jest from 26.4.6 to 26.5.3 ([#888](https://github.com/Fdawgs/docsmith/issues/888)) ([7ec72e0](https://github.com/Fdawgs/docsmith/commit/7ec72e00648d8b9bc6c05cfe0fe2d3ce703a0dc2))
* **deps-dev:** bump jest from 28.1.0 to 28.1.1 ([#877](https://github.com/Fdawgs/docsmith/issues/877)) ([3d10ae9](https://github.com/Fdawgs/docsmith/commit/3d10ae9d106c326cd1690d8c1c94bb7eda848811))
* **deps-dev:** bump prettier from 2.6.2 to 2.7.0 ([#873](https://github.com/Fdawgs/docsmith/issues/873)) ([cb8459f](https://github.com/Fdawgs/docsmith/commit/cb8459f003733640840009471b21792aa47e10ae))
* **deps:** bump node-poppler from 5.1.5 to 5.1.6 ([#883](https://github.com/Fdawgs/docsmith/issues/883)) ([28de0a9](https://github.com/Fdawgs/docsmith/commit/28de0a932d027c974935f6bfb6a9fcc8b3b0e35b))
* **deps:** bump node-unrtf from 2.0.8 to 2.0.9 ([#893](https://github.com/Fdawgs/docsmith/issues/893)) ([3392714](https://github.com/Fdawgs/docsmith/commit/3392714e4948be0106191626c35be71c1000ef69))
* **deps:** bump pino from 7.11.0 to 8.0.0 ([#881](https://github.com/Fdawgs/docsmith/issues/881)) ([50e8102](https://github.com/Fdawgs/docsmith/commit/50e8102c4afdd3d6947a30be126bc9ce7eaae814))
* **deps:** bump pino-pretty from 7.6.1 to 8.0.0 ([#894](https://github.com/Fdawgs/docsmith/issues/894)) ([bcb93ca](https://github.com/Fdawgs/docsmith/commit/bcb93caadfab50c9f5c83f3dad8885bd385c08b8))
* **deps:** bump redoc from 2.0.0-rc.71 to 2.0.0-rc.72 ([#886](https://github.com/Fdawgs/docsmith/issues/886)) ([b9c8d56](https://github.com/Fdawgs/docsmith/commit/b9c8d5620339d1a121d293a217fbeb27e81fcb8d))
* **deps:** bump sub-dependencies ([4f04c79](https://github.com/Fdawgs/docsmith/commit/4f04c796837363f917dec7071f2e0556ee545d98))
* **deps:** move pino-pretty to dev dependencies ([e31cba2](https://github.com/Fdawgs/docsmith/commit/e31cba2f92b99f0c024b43035cf6c2635b3363ef))

### [7.0.6](https://github.com/Fdawgs/docsmith/compare/v7.0.5...v7.0.6) (2022-06-01)


### Bug fixes

* **app:** ignore error throw on closure if temp folder already removed ([a28db7e](https://github.com/Fdawgs/docsmith/commit/a28db7edc7424cd4e50ce3cd7c1af79c0a229e2b))


### Improvements

* **config:** replace `forEach()` with `map()` ([a248a34](https://github.com/Fdawgs/docsmith/commit/a248a34a46f39e559f89aabefad530574f7313ac))
* **plugins/tidy-css:** replace `forEach()` with `map()` ([33e0a1a](https://github.com/Fdawgs/docsmith/commit/33e0a1a057cc883a30a10ccb98f77e12b2a660c0))


### Miscellaneous

* remove redundant eslint comments ([cd861d1](https://github.com/Fdawgs/docsmith/commit/cd861d1268a7875b0787894f5a51e02d00629eb8))
* **server:** fix inline comment ([b2dfc96](https://github.com/Fdawgs/docsmith/commit/b2dfc9631f2fb35f5410cda7401a082de064fa28))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 17.0.0 to 17.0.2 ([#850](https://github.com/Fdawgs/docsmith/issues/850)) ([1d38f6c](https://github.com/Fdawgs/docsmith/commit/1d38f6cad21a209a9293a936e3849b22e8ff77ad))
* **deps-dev:** bump @commitlint/config-conventional ([#859](https://github.com/Fdawgs/docsmith/issues/859)) ([f7c4b9e](https://github.com/Fdawgs/docsmith/commit/f7c4b9e5a3cd3124cc553d716b555a73388df65c))
* **deps-dev:** bump @faker-js/faker from 6.3.1 to 7.1.0 ([#857](https://github.com/Fdawgs/docsmith/issues/857)) ([c3cb838](https://github.com/Fdawgs/docsmith/commit/c3cb838808071905790bfdbe7aa7a03cca5bcedc))
* **deps-dev:** bump eslint from 8.15.0 to 8.16.0 ([#855](https://github.com/Fdawgs/docsmith/issues/855)) ([43ca3f6](https://github.com/Fdawgs/docsmith/commit/43ca3f69e13b5b8c178e179bbab7a0d9f4bdbf02))
* **deps-dev:** bump eslint-plugin-jest from 26.2.2 to 26.4.6 ([#853](https://github.com/Fdawgs/docsmith/issues/853)) ([fe26126](https://github.com/Fdawgs/docsmith/commit/fe2612679f27b0cb99398bbaa18550598da35bd0))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.3.0 to 39.3.2 ([#858](https://github.com/Fdawgs/docsmith/issues/858)) ([360aeb1](https://github.com/Fdawgs/docsmith/commit/360aeb137b643119b527e3527406115a6efe0f7f))
* **deps-dev:** bump playwright from 1.22.1 to 1.22.2 ([#854](https://github.com/Fdawgs/docsmith/issues/854)) ([b3e0a25](https://github.com/Fdawgs/docsmith/commit/b3e0a2511fa90555693f029b8c0c458d981dd19d))
* **deps:** bump @fastify/helmet from 8.0.1 to 8.1.0 ([#856](https://github.com/Fdawgs/docsmith/issues/856)) ([d86e47e](https://github.com/Fdawgs/docsmith/commit/d86e47e23c9525af3eea87533342c718a3dd2dae))
* **deps:** bump @fastify/swagger from 6.0.1 to 6.1.0 ([#860](https://github.com/Fdawgs/docsmith/issues/860)) ([3c65e69](https://github.com/Fdawgs/docsmith/commit/3c65e694578ede75ed315a755cbb90372a48360c))
* **deps:** bump env-schema from 4.0.0 to 5.0.0 ([#852](https://github.com/Fdawgs/docsmith/issues/852)) ([e43a33a](https://github.com/Fdawgs/docsmith/commit/e43a33a68fda4d899635f0a6e7b17f85b20bf6ae))
* **deps:** bump node-poppler from 5.1.4 to 5.1.5 ([#864](https://github.com/Fdawgs/docsmith/issues/864)) ([1722612](https://github.com/Fdawgs/docsmith/commit/17226129481c3ca1361df3b015a54fb03f91c7bb))
* **deps:** bump node-unrtf from 2.0.7 to 2.0.8 ([#863](https://github.com/Fdawgs/docsmith/issues/863)) ([ccac0e1](https://github.com/Fdawgs/docsmith/commit/ccac0e1e5cfb36113cd344b6d4db1e1a4a1d0893))
* **deps:** bump redoc from 2.0.0-rc.70 to 2.0.0-rc.71 ([#862](https://github.com/Fdawgs/docsmith/issues/862)) ([0ab0628](https://github.com/Fdawgs/docsmith/commit/0ab06282f76b66c272b4c8f0efd47dd3e86a3243))
* **deps:** bump sub-dependencies ([#865](https://github.com/Fdawgs/docsmith/issues/865)) ([38eea8a](https://github.com/Fdawgs/docsmith/commit/38eea8a331e3c4eb90e6fa48d85b8224fbfda4ac))
* **dockerfile:** fix permissions needed to alter temp folder ([85fcd2f](https://github.com/Fdawgs/docsmith/commit/85fcd2f7e68ac73894d3688aef62419adb5f70bc))
* **dockerfile:** remove windows binaries from dependencies ([b91b0c0](https://github.com/Fdawgs/docsmith/commit/b91b0c02ce64fead603c69fd5de6c0bdff0cf75f))

### [7.0.5](https://github.com/Fdawgs/docsmith/compare/v7.0.4...v7.0.5) (2022-05-19)


### Continuous integration

* remove git credentials after checkout ([#842](https://github.com/Fdawgs/docsmith/issues/842)) ([cfa1540](https://github.com/Fdawgs/docsmith/commit/cfa1540a7efc50c564b039608a4e5985418afcd2))


### Improvements

* replace abandoned `auto-parse` dep with smaller, faster util ([#844](https://github.com/Fdawgs/docsmith/issues/844)) ([34c23ce](https://github.com/Fdawgs/docsmith/commit/34c23ce9a5ddd8135d5a00cc21ce68d9b338e570))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 39.2.9 to 39.3.0 ([#846](https://github.com/Fdawgs/docsmith/issues/846)) ([786a3d0](https://github.com/Fdawgs/docsmith/commit/786a3d0274f37581c4fdc55d0ac17d1ea4cf0dd9))
* **deps:** bump @fastify/rate-limit from 6.0.0 to 6.0.1 ([#845](https://github.com/Fdawgs/docsmith/issues/845)) ([205d899](https://github.com/Fdawgs/docsmith/commit/205d89970fa0a70a6fdaf8ab809d359182b8b54b))

### [7.0.4](https://github.com/Fdawgs/docsmith/compare/v7.0.3...v7.0.4) (2022-05-18)


### Bug fixes

* **server:** do not transform 503 http err into 500 http err response ([84b7b24](https://github.com/Fdawgs/docsmith/commit/84b7b24ebdddfacf9719f77a76ec09ff3928738f))


### Documentation

* update deployment steps to use `npm ci` ([2c522c5](https://github.com/Fdawgs/docsmith/commit/2c522c538da33725564b0fdfe2d2f32477cae9a3))


### Miscellaneous

* **.eslintrc:** enable `plugin:jest/style` rules ([#822](https://github.com/Fdawgs/docsmith/issues/822)) ([f3bf60a](https://github.com/Fdawgs/docsmith/commit/f3bf60a9dd94a5bbd40295d55dad87d772366d70))
* **.github/codeql-config:** remove quotation marks ([b137e33](https://github.com/Fdawgs/docsmith/commit/b137e3393d6ecd33694ef2dbd500e58e71425339))
* **bug_report:** use node 18 as placeholder for `node-version` ([db2aab8](https://github.com/Fdawgs/docsmith/commit/db2aab8231c85977dee003ac3fb8e1ea0e1d988b))
* **server:** use optional chaining for error message logging ([0bb745e](https://github.com/Fdawgs/docsmith/commit/0bb745e0299c05455a5e0c40a8515fcc28705fb3))


### Continuous integration

* **automerge:** fix context ([7ae3807](https://github.com/Fdawgs/docsmith/commit/7ae3807a25f489831a220faf52e8428880ea329c))
* check `user.login` is dependabot instead of `actor` ([45bdf1b](https://github.com/Fdawgs/docsmith/commit/45bdf1b8bbb5e011480372398855816ee4555161))
* **ci:** require `unit-tests` job to pass for `save-pr-number` job to run ([218ac5f](https://github.com/Fdawgs/docsmith/commit/218ac5f619cbd805fabf20b55a906d516ea26bfe))
* **ci:** use `lts/*` for node setup in lint job ([9200b27](https://github.com/Fdawgs/docsmith/commit/9200b273e65cc9fe53a317e3e10455bfa947f72b))
* **ci:** use `node-version` for node matrix key ([805c13e](https://github.com/Fdawgs/docsmith/commit/805c13e30df277e981c5096879a65b3c04397680))
* **codeql:** only run on pr changes to `.html`, `.js`, and `.yml` files ([9c9ca6c](https://github.com/Fdawgs/docsmith/commit/9c9ca6c32a58212e85e4c04cc6c727609f61a9cf))
* **codeql:** resolve missing analyses ([e25810f](https://github.com/Fdawgs/docsmith/commit/e25810f02d43ae714dd4b0413a4355e554af5da7))
* **codeql:** specify which files to scan during analysis ([980aa48](https://github.com/Fdawgs/docsmith/commit/980aa48eb063387d35bbe2a0ad1bdaa7bfcfb4d1))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 16.2.4 to 17.0.0 ([#837](https://github.com/Fdawgs/docsmith/issues/837)) ([aa2f03f](https://github.com/Fdawgs/docsmith/commit/aa2f03f82b47759dcc73b7e092b1d05e6c8bab40))
* **deps-dev:** bump @commitlint/config-conventional ([#832](https://github.com/Fdawgs/docsmith/issues/832)) ([ea7a55c](https://github.com/Fdawgs/docsmith/commit/ea7a55c1d8385aac2db109b6a3a23a0f9165be50))
* **deps-dev:** bump eslint from 8.14.0 to 8.15.0 ([#828](https://github.com/Fdawgs/docsmith/issues/828)) ([3a84375](https://github.com/Fdawgs/docsmith/commit/3a843754d64cf878e80280f0d319a616631bcf5b))
* **deps-dev:** bump eslint-plugin-jest from 26.1.5 to 26.2.2 ([#831](https://github.com/Fdawgs/docsmith/issues/831)) ([97687a1](https://github.com/Fdawgs/docsmith/commit/97687a10fd362ebb0950790a3ea850dea5ce12b5))
* **deps-dev:** bump husky from 7.0.4 to 8.0.1 ([#827](https://github.com/Fdawgs/docsmith/issues/827)) ([e051b94](https://github.com/Fdawgs/docsmith/commit/e051b9432f33fa7a7c44f598f7af69f2b486f2ca))
* **deps-dev:** bump jest from 28.0.3 to 28.1.0 ([#840](https://github.com/Fdawgs/docsmith/issues/840)) ([b188eba](https://github.com/Fdawgs/docsmith/commit/b188ebacbb81201c86cb227dd9759cf9c4cce69c))
* **deps-dev:** bump playwright from 1.21.1 to 1.22.1 ([#836](https://github.com/Fdawgs/docsmith/issues/836)) ([e9cfb4e](https://github.com/Fdawgs/docsmith/commit/e9cfb4e2415851167a4b064a50ad6e96da10a10a))
* **deps:** bump @fastify/helmet from 8.0.0 to 8.0.1 ([#833](https://github.com/Fdawgs/docsmith/issues/833)) ([c249022](https://github.com/Fdawgs/docsmith/commit/c249022099d14fa34a00c2a49a148708d0be4e92))
* **deps:** bump @fastify/sensible from 4.0.0 to 4.1.0 ([#830](https://github.com/Fdawgs/docsmith/issues/830)) ([7b5f7bf](https://github.com/Fdawgs/docsmith/commit/7b5f7bf73fe688703f2520e66a87b0f049cea118))
* **deps:** bump @fastify/static from 5.0.1 to 5.0.2 ([#834](https://github.com/Fdawgs/docsmith/issues/834)) ([2b2deba](https://github.com/Fdawgs/docsmith/commit/2b2debad59b8f3c09696835b7624e8754e5e8e36))
* **deps:** bump dotenv from 16.0.0 to 16.0.1 ([#835](https://github.com/Fdawgs/docsmith/issues/835)) ([312b187](https://github.com/Fdawgs/docsmith/commit/312b187ee0ec7ccabdf75010910a1bfe98d6d00b))
* **deps:** bump glob from 8.0.1 to 8.0.3 ([#838](https://github.com/Fdawgs/docsmith/issues/838)) ([7d24f6a](https://github.com/Fdawgs/docsmith/commit/7d24f6a101acf22abe99c1fa5f11236c843cdce6))
* **deps:** bump redoc from 2.0.0-rc.67 to 2.0.0-rc.70 ([#829](https://github.com/Fdawgs/docsmith/issues/829)) ([09fb54b](https://github.com/Fdawgs/docsmith/commit/09fb54bb0d645e22691466d61bab589b1cc775fc))
* **deps:** bump sub-dependencies ([4612215](https://github.com/Fdawgs/docsmith/commit/4612215b799434090f0e2541e88a23c64e26029b))


### Improvements

* access `fs/promises` api via newer route ([236534b](https://github.com/Fdawgs/docsmith/commit/236534b0fb4f507598e78cd8195a1e947f7b89f4))

### [7.0.3](https://github.com/Fdawgs/docsmith/compare/v7.0.2...v7.0.3) (2022-05-04)


### Documentation

* **readme:** remove snyk badge ([cdf64fb](https://github.com/Fdawgs/docsmith/commit/cdf64fbfe326ee38736703086f737a137d8233ff))


### Continuous integration

* add dependency-review job ([ca5da5a](https://github.com/Fdawgs/docsmith/commit/ca5da5a1582077b59994508b78d2df8c9a8969f4))
* **link-check:** replace `npx linkinator` call with github action ([#797](https://github.com/Fdawgs/docsmith/issues/797)) ([cd44cd2](https://github.com/Fdawgs/docsmith/commit/cd44cd2defa0c50432b79a0829c58f2c7e7adf94))
* only trigger dependency-review on pr ([21d6872](https://github.com/Fdawgs/docsmith/commit/21d6872a9d6a031fdb31b6f03b25aa75f321d394))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 16.2.3 to 16.2.4 ([#801](https://github.com/Fdawgs/docsmith/issues/801)) ([a49ef11](https://github.com/Fdawgs/docsmith/commit/a49ef11eb37dd5cf2d05b943d3facefecf6d0ca0))
* **deps-dev:** bump @commitlint/config-conventional ([#806](https://github.com/Fdawgs/docsmith/issues/806)) ([e77d298](https://github.com/Fdawgs/docsmith/commit/e77d298c0f371124bc42f023ed2e538378da9b29))
* **deps-dev:** bump @faker-js/faker from 6.1.2 to 6.2.0 ([#809](https://github.com/Fdawgs/docsmith/issues/809)) ([3df6db8](https://github.com/Fdawgs/docsmith/commit/3df6db86f74bc828a0b14d2786624212562cad32))
* **deps-dev:** bump @faker-js/faker from 6.2.0 to 6.3.1 ([#815](https://github.com/Fdawgs/docsmith/issues/815)) ([a797d12](https://github.com/Fdawgs/docsmith/commit/a797d12b4fe01bb11323a75531c9cc59f1e866fa))
* **deps-dev:** bump eslint from 8.13.0 to 8.14.0 ([#804](https://github.com/Fdawgs/docsmith/issues/804)) ([f8f7bd1](https://github.com/Fdawgs/docsmith/commit/f8f7bd169773c249509b4829edc312690eb539d1))
* **deps-dev:** bump eslint-plugin-jest from 26.1.4 to 26.1.5 ([#810](https://github.com/Fdawgs/docsmith/issues/810)) ([59328ca](https://github.com/Fdawgs/docsmith/commit/59328ca8c799f58a67a4fe117d85e6b51cf0749f))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.2.4 to 39.2.9 ([#807](https://github.com/Fdawgs/docsmith/issues/807)) ([c341df3](https://github.com/Fdawgs/docsmith/commit/c341df34befb8916eb615c386b95f6361c9e2fc8))
* **deps-dev:** bump jest from 27.5.1 to 28.0.3 ([#803](https://github.com/Fdawgs/docsmith/issues/803)) ([32e774a](https://github.com/Fdawgs/docsmith/commit/32e774a269778ec0d6309e1c9556aad14d14b276))
* **deps-dev:** bump nodemon from 2.0.15 to 2.0.16 ([#802](https://github.com/Fdawgs/docsmith/issues/802)) ([d743122](https://github.com/Fdawgs/docsmith/commit/d74312263b7afeefba60ce374316d8dabb8e81da))
* **deps:** bump @fastify/autoload from 4.0.0 to 4.0.1 ([#814](https://github.com/Fdawgs/docsmith/issues/814)) ([59ae05d](https://github.com/Fdawgs/docsmith/commit/59ae05dd0f9dcd17d4110df98a0f4e507e9b70c9))
* **deps:** bump @fastify/bearer-auth from 7.0.0 to 7.0.1 ([#818](https://github.com/Fdawgs/docsmith/issues/818)) ([e244511](https://github.com/Fdawgs/docsmith/commit/e2445116291fab1e4c348b3c18d4822e7da2b016))
* **deps:** bump @fastify/static from 5.0.0 to 5.0.1 ([#813](https://github.com/Fdawgs/docsmith/issues/813)) ([80e3ecb](https://github.com/Fdawgs/docsmith/commit/80e3ecbc1d9bf54a3ba7022df5ef8024337a5452))
* **deps:** bump @fastify/swagger from 6.0.0 to 6.0.1 ([#817](https://github.com/Fdawgs/docsmith/issues/817)) ([e82d41c](https://github.com/Fdawgs/docsmith/commit/e82d41c87a900a3c50284832031e712e8b79f642))
* **deps:** bump fastify from 3.28.0 to 3.29.0 ([#800](https://github.com/Fdawgs/docsmith/issues/800)) ([dd0c95b](https://github.com/Fdawgs/docsmith/commit/dd0c95bda67e46ddd880b5a380bcfed53c2d9ab4))
* **deps:** bump github/codeql-action from 1 to 2 ([#799](https://github.com/Fdawgs/docsmith/issues/799)) ([3a343d3](https://github.com/Fdawgs/docsmith/commit/3a343d3d266e7b41aae1e0255840a3db17da44b7))
* **deps:** bump node-poppler from 5.1.3 to 5.1.4 ([#812](https://github.com/Fdawgs/docsmith/issues/812)) ([cd11dc6](https://github.com/Fdawgs/docsmith/commit/cd11dc68e16b2ffe6273703c1a124b7baccdbca3))
* **deps:** bump pino from 7.10.0 to 7.11.0 ([#808](https://github.com/Fdawgs/docsmith/issues/808)) ([9ad337e](https://github.com/Fdawgs/docsmith/commit/9ad337e0a0eb09fbbc808b40a64c469f9b2ba344))
* **deps:** bump redoc from 2.0.0-rc.66 to 2.0.0-rc.67 ([#805](https://github.com/Fdawgs/docsmith/issues/805)) ([c73dc05](https://github.com/Fdawgs/docsmith/commit/c73dc05ee1282ce6c8459889fc976c4b84abe5e5))
* **deps:** bump sub-dependencies ([57d77fb](https://github.com/Fdawgs/docsmith/commit/57d77fb936b3dd651aad3afae6547bcf3dc9217c))
* **deps:** bump under-pressure from 5.8.0 to 5.8.1 ([#816](https://github.com/Fdawgs/docsmith/issues/816)) ([95c7117](https://github.com/Fdawgs/docsmith/commit/95c7117ddbc394823ae163cebf9fe29d3000f4e5))
* use new `[@fastify](https://github.com/fastify)` org dependencies ([#798](https://github.com/Fdawgs/docsmith/issues/798)) ([d79d8dc](https://github.com/Fdawgs/docsmith/commit/d79d8dc33c9b7e167aede600e29b7ae7f7f31ab3))


### Miscellaneous

* **.github/workflows/link-check:** use `skip` input ([c508778](https://github.com/Fdawgs/docsmith/commit/c5087783a7912a4f78872700a76790b0949bf0a3))
* **ci:** remove quotation marks from step name ([a01de23](https://github.com/Fdawgs/docsmith/commit/a01de23cd07e050a2ee8ffe1f9db3063bd46a748))
* **server:** add missing asterisk to inline comment block ([c7ee7f4](https://github.com/Fdawgs/docsmith/commit/c7ee7f4e672cabe2fd6e3c2efd990a22fd393e8c))
* use npm install alias ([f8676ba](https://github.com/Fdawgs/docsmith/commit/f8676ba98bff23bfabff18aa45107358e11a7394))

### [7.0.2](https://github.com/Fdawgs/docsmith/compare/v7.0.1...v7.0.2) (2022-04-20)


### Documentation

* **readme:** add mention of insomnia example requests ([72f14dd](https://github.com/Fdawgs/docsmith/commit/72f14dd6cc94665f11daadde690f8896dc77688b))


### Continuous integration

* fix htmltidy permissions ([bc0a8e2](https://github.com/Fdawgs/docsmith/commit/bc0a8e2c2c488396f2c76e7813d18217c83e2fc8))
* revert to using `windows-latest` runners ([46163fc](https://github.com/Fdawgs/docsmith/commit/46163fc9eafd0b6a129d51d6a1b586d70ec8b83b))
* use shorter arg aliases for lockfile lint step ([90625ef](https://github.com/Fdawgs/docsmith/commit/90625efe1bc201cc5402e7ffd5314b48de560367))
* validate that resolved url matches the package name ([0681713](https://github.com/Fdawgs/docsmith/commit/0681713c662bda96b59044eca9fe72f029d216ee))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 39.1.1 to 39.2.3 ([#789](https://github.com/Fdawgs/docsmith/issues/789)) ([85db72a](https://github.com/Fdawgs/docsmith/commit/85db72a8f1b742c5cba0d8cf86ff42b7ff8a98bd))
* **deps-dev:** bump eslint-plugin-jsdoc from 39.2.3 to 39.2.4 ([#794](https://github.com/Fdawgs/docsmith/issues/794)) ([5703a79](https://github.com/Fdawgs/docsmith/commit/5703a798fe697079f34abe59fc9f0065d7b70940))
* **deps-dev:** bump eslint-plugin-security from 1.4.0 to 1.5.0 ([#793](https://github.com/Fdawgs/docsmith/issues/793)) ([8fcc000](https://github.com/Fdawgs/docsmith/commit/8fcc000d809ef94c20ece662581825dc23c5237a))
* **deps-dev:** bump playwright from 1.20.2 to 1.21.1 ([#791](https://github.com/Fdawgs/docsmith/issues/791)) ([0f0a69f](https://github.com/Fdawgs/docsmith/commit/0f0a69ff3d2a63dc72536d920032e1775a185c00))
* **deps:** bump fastify-autoload from 3.11.0 to 3.12.0 ([#792](https://github.com/Fdawgs/docsmith/issues/792)) ([e028d82](https://github.com/Fdawgs/docsmith/commit/e028d825bd121eeaf733239bd47f2d0079cf0dd4))
* **deps:** bump fastify-swagger from 5.1.0 to 5.1.1 ([#790](https://github.com/Fdawgs/docsmith/issues/790)) ([5cae107](https://github.com/Fdawgs/docsmith/commit/5cae107855d20f28da1852c2d70460b941f0711c))
* **deps:** bump htmltidy2 from 0.3.0 to 1.0.0 ([#714](https://github.com/Fdawgs/docsmith/issues/714)) ([de504ca](https://github.com/Fdawgs/docsmith/commit/de504ca495fe3493c9fb93043e9f55029fe94bc1))
* **docker:** fix htmltidy permissions and ownership ([9c47797](https://github.com/Fdawgs/docsmith/commit/9c47797f08206e1786cc94d9a58fa2df57c9a047))

### [7.0.1](https://github.com/Fdawgs/docsmith/compare/v7.0.0...v7.0.1) (2022-04-12)


### Improvements

* **server:** call reply object over raw when overwriting header ([#765](https://github.com/Fdawgs/docsmith/issues/765)) ([48db35c](https://github.com/Fdawgs/docsmith/commit/48db35cdea9dc145f48e7ebf1b77416d8226dad5))


### Continuous integration

* **automerge:** set correct `contents` permission level ([52eef71](https://github.com/Fdawgs/docsmith/commit/52eef71b9f5db89ff6428f3fd4866b23bb056658))
* **automerge:** squash automerge prs ([10f45be](https://github.com/Fdawgs/docsmith/commit/10f45be4fab20cc19a458c27467111b8ab1b1d45))
* **cd:** update org name for release-please-action ([0d69309](https://github.com/Fdawgs/docsmith/commit/0d693096f4c20b8ed391107075fa01253df394db))
* **optimise-images:** reduce permissions to minimum ([1e669fe](https://github.com/Fdawgs/docsmith/commit/1e669fef899ffa4eb233edfdfe0bb2f119c67388))
* reduce workflow permissions to minimum ([74dd1c6](https://github.com/Fdawgs/docsmith/commit/74dd1c6394f9e430151055fb1f830ef17944192d))
* replace workflow-run-cleanup-action with github concurrency ([1eff2a4](https://github.com/Fdawgs/docsmith/commit/1eff2a4f2b2fcdc9521edabd0cd84cd8b438f83e))


### Dependencies

* **deps-dev:** bump @faker-js/faker from 6.1.1 to 6.1.2 ([#776](https://github.com/Fdawgs/docsmith/issues/776)) ([82f2f0b](https://github.com/Fdawgs/docsmith/commit/82f2f0b0126406a8f394cf5f08f826b6e29c75ea))
* **deps-dev:** bump eslint from 8.12.0 to 8.13.0 ([#781](https://github.com/Fdawgs/docsmith/issues/781)) ([dab2567](https://github.com/Fdawgs/docsmith/commit/dab25675ea2f1729864c6edb34a4aefc0603d918))
* **deps-dev:** bump eslint-plugin-import from 2.25.4 to 2.26.0 ([#777](https://github.com/Fdawgs/docsmith/issues/777)) ([2202774](https://github.com/Fdawgs/docsmith/commit/220277448495a42d7b93743f05ed744cb2939460))
* **deps-dev:** bump eslint-plugin-jest from 26.1.3 to 26.1.4 ([#783](https://github.com/Fdawgs/docsmith/issues/783)) ([b7437e7](https://github.com/Fdawgs/docsmith/commit/b7437e7b2fbf93b8a2cdaca71dbfff24ca9f98e6))
* **deps-dev:** bump eslint-plugin-jsdoc from 38.1.4 to 39.1.1 ([#782](https://github.com/Fdawgs/docsmith/issues/782)) ([d733c48](https://github.com/Fdawgs/docsmith/commit/d733c4839b8172ca50be8fe6b94ac681ce9662dc))
* **deps-dev:** bump playwright from 1.20.1 to 1.20.2 ([#774](https://github.com/Fdawgs/docsmith/issues/774)) ([5fb0f1a](https://github.com/Fdawgs/docsmith/commit/5fb0f1a194af1b77c8ca8f22ab727c90625aceb8))
* **deps-dev:** bump prettier from 2.6.1 to 2.6.2 ([#771](https://github.com/Fdawgs/docsmith/issues/771)) ([2b6692a](https://github.com/Fdawgs/docsmith/commit/2b6692ae5417ec19bacf557f0c4e1b9ebcbf348b))
* **deps:** bump actions/upload-artifact from 2 to 3 ([#780](https://github.com/Fdawgs/docsmith/issues/780)) ([3bd7283](https://github.com/Fdawgs/docsmith/commit/3bd7283f4b889a43dbb5cb5faeb341d02a18116c))
* **deps:** bump fastify from 3.27.4 to 3.28.0 ([#775](https://github.com/Fdawgs/docsmith/issues/775)) ([55395cb](https://github.com/Fdawgs/docsmith/commit/55395cb3fd7feca6413a55a1cc489b0a9a99e598))
* **deps:** bump glob from 7.2.0 to 8.0.1 ([#785](https://github.com/Fdawgs/docsmith/issues/785)) ([6f2f3a4](https://github.com/Fdawgs/docsmith/commit/6f2f3a4ae64c2d2a955b3a07f017b1094923d4ff))
* **deps:** bump hadolint/hadolint-action from 2.0.0 to 2.1.0 ([bc9db2b](https://github.com/Fdawgs/docsmith/commit/bc9db2b51c620adb3f9d56d62cf583c03e859314))
* **deps:** bump moment from 2.29.1 to 2.29.2 ([#778](https://github.com/Fdawgs/docsmith/issues/778)) ([5a59c1e](https://github.com/Fdawgs/docsmith/commit/5a59c1e04390534a6e022285809f1d6977c7c1af))
* **deps:** bump pino from 7.9.2 to 7.10.0 ([#784](https://github.com/Fdawgs/docsmith/issues/784)) ([d48221e](https://github.com/Fdawgs/docsmith/commit/d48221efbaf2a7b2f216c32f675e4e993fce87a9))
* **deps:** bump pino-pretty from 7.6.0 to 7.6.1 ([#773](https://github.com/Fdawgs/docsmith/issues/773)) ([ce0fde8](https://github.com/Fdawgs/docsmith/commit/ce0fde823d4d2f61953c37f7f01eb524c3c88c54))
* **deps:** bump redoc from 2.0.0-rc.65 to 2.0.0-rc.66 ([f944c5a](https://github.com/Fdawgs/docsmith/commit/f944c5ace5ce71a908c69fe230ebd8dbc069a653))
* **docker:** install production deps only ([#779](https://github.com/Fdawgs/docsmith/issues/779)) ([e9cf62b](https://github.com/Fdawgs/docsmith/commit/e9cf62bf7906f0bd267d9b67acb24b089d431d90))

## [7.0.0](https://github.com/Fdawgs/docsmith/compare/v6.0.5...v7.0.0) (2022-03-30)


### ⚠ BREAKING CHANGES

* **routes/docs:** `docs/json` route renamed to `docs/openapi`

### Improvements

* chain response functions ([161c018](https://github.com/Fdawgs/docsmith/commit/161c0188eb4bb3e998370fc3478dd63ae384cba6))
* **routes:** clean `accept` header conditionals ([a3f431c](https://github.com/Fdawgs/docsmith/commit/a3f431c2d7e91d70a4c109de678e0ec44fc3e75e))
* use `type()` alias function to set content-type ([f83b0ca](https://github.com/Fdawgs/docsmith/commit/f83b0cae8c50558d718aba3e83f4d9737531bc1c))


### Miscellaneous

* **routes/docs:** rename `docs/json` to `docs/openapi` ([e70610d](https://github.com/Fdawgs/docsmith/commit/e70610d9ef1726671709d68af7a08dc52ec783a8))
* **routes:** standardise ajv inline comment ([82dc312](https://github.com/Fdawgs/docsmith/commit/82dc31202d99b62ec051ae6c3aefb9ecc0633296))


### Dependencies

* **deps-dev:** bump @faker-js/faker from 6.0.0 to 6.1.1 ([6348ebc](https://github.com/Fdawgs/docsmith/commit/6348ebc24307ed2d1943e693147bf1abcf8b6c44))
* **deps-dev:** bump autocannon from 7.8.0 to 7.8.1 ([6276e54](https://github.com/Fdawgs/docsmith/commit/6276e54f9693bcf51c27042baff6b65529ef4cd9))
* **deps-dev:** bump eslint from 8.11.0 to 8.12.0 ([0b7e12b](https://github.com/Fdawgs/docsmith/commit/0b7e12becc0e51a82d680eb6ae6fb0d7a9704011))
* **deps-dev:** bump eslint-plugin-jsdoc from 38.0.6 to 38.1.4 ([0d82ea8](https://github.com/Fdawgs/docsmith/commit/0d82ea8d31c6af19dab4147a7775c86854c45a1c))
* **deps-dev:** bump prettier from 2.6.0 to 2.6.1 ([66f6bc8](https://github.com/Fdawgs/docsmith/commit/66f6bc846f982a8152af0c6e4a1fc5419f73a6c3))
* **deps:** bump fastify-disablecache from 2.0.6 to 2.0.7 ([8c40155](https://github.com/Fdawgs/docsmith/commit/8c40155b1a315338a2fb244977b4aa87e46b8ace))
* **deps:** bump fastify-floc-off from 1.0.5 to 1.0.6 ([3294c70](https://github.com/Fdawgs/docsmith/commit/3294c700bbaa6cb75c0f413e3eb9343b168699d5))
* **deps:** bump fastify-swagger from 5.0.0 to 5.1.0 ([03603be](https://github.com/Fdawgs/docsmith/commit/03603bedf886bd9556ed90ee6398865a4e2575ac))
* **deps:** bump hadolint/hadolint-action from 1.7.0 to 2.0.0 ([a7b81ab](https://github.com/Fdawgs/docsmith/commit/a7b81abb85b073599e2c3eab1a6dbad7c05b5f4f))
* **deps:** bump pino-pretty from 7.5.4 to 7.6.0 ([51f34ae](https://github.com/Fdawgs/docsmith/commit/51f34aed6a5eb1b9540e54f09f823536630ef5f6))

### [6.0.5](https://github.com/Fdawgs/docsmith/compare/v6.0.4...v6.0.5) (2022-03-24)


### Bug fixes

* **plugins/rtf-to-txt:** remove leading comments from rtf output ([#721](https://github.com/Fdawgs/docsmith/issues/721)) ([c6d1f9c](https://github.com/Fdawgs/docsmith/commit/c6d1f9c19bbd3bc105b9654ce0702550370fd654))
* **routes/docs:** add ie unsupported script ([#725](https://github.com/Fdawgs/docsmith/issues/725)) ([eb60cd8](https://github.com/Fdawgs/docsmith/commit/eb60cd8322d65f5f2f47e36740439d9246c1fcfb))
* **routes/docs:** resolve cwe-676 ([c9d352c](https://github.com/Fdawgs/docsmith/commit/c9d352c6e4f9e4f6de1541f7060c5d96b46b8a1e))
* **server:** disable cache for all routes besides documentation ([8ed9a7a](https://github.com/Fdawgs/docsmith/commit/8ed9a7ac9622e1e42b04e95ef7bddc6d4f7a3019))
* **server:** rate-limit 404 responses ([84bf767](https://github.com/Fdawgs/docsmith/commit/84bf767f40ca3919b8829346b476c141fc5229dd))


### Documentation

* improve readability ([3f3aa90](https://github.com/Fdawgs/docsmith/commit/3f3aa9054055e391ae4b21b6b09459e5c2e7ba60))
* **readme:** add poppler macos requirement ([#723](https://github.com/Fdawgs/docsmith/issues/723)) ([3d244ae](https://github.com/Fdawgs/docsmith/commit/3d244ae8e250f8d26a5f914fed4d8270f7976775))
* **readme:** tidy min version of node presentation ([e403e40](https://github.com/Fdawgs/docsmith/commit/e403e401fd9fddf2d887652e5f3efb294f25063b))


### Improvements

* **server:** use new hook config option for rate-limit plugin ([#722](https://github.com/Fdawgs/docsmith/issues/722)) ([4c6147b](https://github.com/Fdawgs/docsmith/commit/4c6147b6f8faedd6d0719b634060475b225453be))


### Miscellaneous

* **.github/workflows/optimise-images:** reorder event list ([b51b942](https://github.com/Fdawgs/docsmith/commit/b51b942b0186f4a111788fc2b3c9f579691b190c))
* **scripts:** remove redundant gitkraken fix from prepare script ([c89c297](https://github.com/Fdawgs/docsmith/commit/c89c2979d300e3daa1020888e7eb07021a74c559))
* **scripts:** use shorter arg aliases; remove debugging args from jest ([a12d17b](https://github.com/Fdawgs/docsmith/commit/a12d17b137cfcc88a6a9ec5705b7484d204242de))


### Continuous integration

* add job step names, workflow comments, and whitespace ([14a240e](https://github.com/Fdawgs/docsmith/commit/14a240e444286e0aedba01f85b1ddfa7484bb113))
* **codeql-analysis:** remove unused autobuild step ([f1bf9af](https://github.com/Fdawgs/docsmith/commit/f1bf9af400438abda65633715371bd8e8024c620))
* **codeql:** grant minimum permissions to run; rename file ([#728](https://github.com/Fdawgs/docsmith/issues/728)) ([dcf34a3](https://github.com/Fdawgs/docsmith/commit/dcf34a383bff23715dc65ed54053bc1fb25c774c))
* only save pr number artifact for dependabot ([2c127da](https://github.com/Fdawgs/docsmith/commit/2c127da33be49ed650b8bbcf906fe029b06eef40))
* temp use of windows 2019 for runners ([#726](https://github.com/Fdawgs/docsmith/issues/726)) ([d38f47f](https://github.com/Fdawgs/docsmith/commit/d38f47fac06d8182f1742f57e71ec8710b901b39))
* use docker compose v2 ([4ef53b8](https://github.com/Fdawgs/docsmith/commit/4ef53b841961fc0d2d4faa50937127b2c28c73dc))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 16.2.1 to 16.2.3 ([4121cfb](https://github.com/Fdawgs/docsmith/commit/4121cfb3bd6e67b73d71a76357f0670bdc350435))
* **deps-dev:** bump autocannon from 7.7.0 to 7.8.0 ([0220ba2](https://github.com/Fdawgs/docsmith/commit/0220ba29af0ac78e9d7e930a1d844b71311f023e))
* **deps-dev:** bump eslint from 8.10.0 to 8.11.0 ([bfc0542](https://github.com/Fdawgs/docsmith/commit/bfc0542c727b7dca5a58e47a996aefaf2513ef83))
* **deps-dev:** bump eslint-plugin-jest from 26.1.1 to 26.1.3 ([ff45b55](https://github.com/Fdawgs/docsmith/commit/ff45b55ea7bb60c1a7559702a6e6cc01c5467e82))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.7 to 38.0.6 ([be79f51](https://github.com/Fdawgs/docsmith/commit/be79f518cbfe1388c70a1eb7ee81b2ae5d50bb82))
* **deps-dev:** bump playwright from 1.19.2 to 1.20.1 ([9340e0f](https://github.com/Fdawgs/docsmith/commit/9340e0f2ca6f22a6b1cee5e8d842ebb96bd7b8a8))
* **deps-dev:** bump prettier from 2.5.1 to 2.6.0 ([e7a3d40](https://github.com/Fdawgs/docsmith/commit/e7a3d407b164dbba5e8c2dfbb4e13f4aad9e3904))
* **deps-dev:** replace `faker` with `@faker-js/faker` ([#748](https://github.com/Fdawgs/docsmith/issues/748)) ([e37e97a](https://github.com/Fdawgs/docsmith/commit/e37e97a96c221cca8eeb5232419296ed925bbbe3))
* **deps:** bump env-schema from 3.5.2 to 4.0.0 ([e8b736e](https://github.com/Fdawgs/docsmith/commit/e8b736ed1b8957456170c1fc619cc6986eb6bcc9))
* **deps:** bump fastify from 3.27.3 to 3.27.4 ([f507fae](https://github.com/Fdawgs/docsmith/commit/f507fae9c71e59959ac27328f52b5d6f872f19b6))
* **deps:** bump fastify-accepts from 2.1.0 to 2.2.0 ([c427271](https://github.com/Fdawgs/docsmith/commit/c427271319c64492c7c648a3cb42a6a62fa483ca))
* **deps:** bump fastify-static from 4.5.0 to 4.6.1 ([7bb5e37](https://github.com/Fdawgs/docsmith/commit/7bb5e37fdf8b9ec17c6934bd0dfcd4215482d1f5))
* **deps:** bump fastify-swagger from 4.12.0 to 5.0.0 ([35598f7](https://github.com/Fdawgs/docsmith/commit/35598f758ab1431bf83ca70d4d67f7fc1101e380))
* **deps:** bump hadolint/hadolint-action from 1.6.0 to 1.7.0 ([4b95fe4](https://github.com/Fdawgs/docsmith/commit/4b95fe4f9113d806ac6c04fb86f2faef4a98aa0a))
* **deps:** bump mammoth from 1.4.19 to 1.4.21 ([9987020](https://github.com/Fdawgs/docsmith/commit/9987020ef38b1cb1f7c5953679bc239e7d490652))
* **deps:** bump minimist from 1.2.5 to 1.2.6 ([03cfce6](https://github.com/Fdawgs/docsmith/commit/03cfce640b8fbb98bb17da69597f7cbe901c6f0a))
* **deps:** bump peter-evans/create-pull-request from 3 to 4 ([395ea41](https://github.com/Fdawgs/docsmith/commit/395ea41990e9f694f596dc43891d0f9eab17a7bd))
* **deps:** bump pino from 7.8.0 to 7.9.2 ([5de7b15](https://github.com/Fdawgs/docsmith/commit/5de7b1540160a941a4424951b4f8a1832012c0b0))
* **deps:** bump pino-pretty from 7.5.3 to 7.5.4 ([1931200](https://github.com/Fdawgs/docsmith/commit/1931200692c9bb4f94a5c2d994d8f609f2301b2a))
* **deps:** bump redoc from 2.0.0-rc.64 to 2.0.0-rc.65 ([a74a868](https://github.com/Fdawgs/docsmith/commit/a74a868993b54be89321e837460180c32672f693))
* **deps:** bump sub-dependencies ([#749](https://github.com/Fdawgs/docsmith/issues/749)) ([f365fbb](https://github.com/Fdawgs/docsmith/commit/f365fbb67d23fddd0622d507ad5d3d1c355c30b9))

### [6.0.4](https://github.com/Fdawgs/docsmith/compare/v6.0.3...v6.0.4) (2022-03-08)


### Improvements

* **routes/docs:** move html and redoc out of root context ([7a7220b](https://github.com/Fdawgs/docsmith/commit/7a7220bba7ff01562d8ad5bd929728ea7c65db41))
* **routes:** add `preValidation` hooks directly into routes ([4af0a17](https://github.com/Fdawgs/docsmith/commit/4af0a17b5c1061b56cb627f2b6174c2f6dc1086d))


### Continuous integration

* add image optimisation workflow ([#706](https://github.com/Fdawgs/docsmith/issues/706)) ([484c2e5](https://github.com/Fdawgs/docsmith/commit/484c2e565620ad60eef14ddc458d230ed9d7362b))
* only install chromium and firefox with playwright ([54d2810](https://github.com/Fdawgs/docsmith/commit/54d281059578ba69b922b31c00ed61283e0ae72d))


### Miscellaneous

* **.env.template:** double-quote example strings ([#703](https://github.com/Fdawgs/docsmith/issues/703)) ([0bc305a](https://github.com/Fdawgs/docsmith/commit/0bc305a7784b7f18ec4489447e638a833f465a80))
* auto-compress images ([#707](https://github.com/Fdawgs/docsmith/issues/707)) ([9659e92](https://github.com/Fdawgs/docsmith/commit/9659e925e5daf2ed7ff9e028241d6c9788bf4ddb))


### Documentation

* **readme:** add usage section ([#708](https://github.com/Fdawgs/docsmith/issues/708)) ([998c757](https://github.com/Fdawgs/docsmith/commit/998c75719852d76eebca8b1296cd18bfdd164da1))


### Dependencies

* **deps-dev:** bump eslint-config-prettier from 8.4.0 to 8.5.0 ([#716](https://github.com/Fdawgs/docsmith/issues/716)) ([0c4a493](https://github.com/Fdawgs/docsmith/commit/0c4a4931dc841a44b19f2a298d76a9104b10bc07))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.9.4 to 37.9.7 ([#710](https://github.com/Fdawgs/docsmith/issues/710)) ([f13dbff](https://github.com/Fdawgs/docsmith/commit/f13dbfff6fec1f4c99cd7a018751876125ac925e))
* **deps:** bump actions/checkout from 2 to 3 ([#709](https://github.com/Fdawgs/docsmith/issues/709)) ([26abbca](https://github.com/Fdawgs/docsmith/commit/26abbcadb404fee01c51e8917ee5b185816206f6))
* **deps:** bump fastify from 3.27.2 to 3.27.3 ([#712](https://github.com/Fdawgs/docsmith/issues/712)) ([39635c1](https://github.com/Fdawgs/docsmith/commit/39635c116f907e2c36257af444ca4360a43b8766))
* **deps:** bump fluent-json-schema from 3.0.1 to 3.1.0 ([#713](https://github.com/Fdawgs/docsmith/issues/713)) ([4ae9f0f](https://github.com/Fdawgs/docsmith/commit/4ae9f0f2a8f7e52fd0e42ee8078feca33eccf2df))
* **deps:** bump pino-pretty from 7.5.1 to 7.5.3 ([#715](https://github.com/Fdawgs/docsmith/issues/715)) ([b3c1c8f](https://github.com/Fdawgs/docsmith/commit/b3c1c8f374265d35e1e4928ed0636b466f5b91fc))
* **deps:** bump raw-body from 2.5.0 to 2.5.1 ([#700](https://github.com/Fdawgs/docsmith/issues/700)) ([ce7f609](https://github.com/Fdawgs/docsmith/commit/ce7f609468e61d5ca62c0eb1e5daade10a77decd))

### [6.0.3](https://github.com/Fdawgs/docsmith/compare/v6.0.2...v6.0.3) (2022-02-28)


### Bug fixes

* **config:** renew rate-limit if user attempts req in limit time window ([#665](https://github.com/Fdawgs/docsmith/issues/665)) ([d224384](https://github.com/Fdawgs/docsmith/commit/d2243848b63373491a641bd568718e759795e7fa))
* **public/docs:** add x-ua-compatible meta tag ([25f9157](https://github.com/Fdawgs/docsmith/commit/25f91576d8e14f18efa5ae9dfd0a186a9d154804))


### Improvements

* **config:** call `Error` as constructor, not function ([6629960](https://github.com/Fdawgs/docsmith/commit/6629960c53bbc01f305406f6ca82bff3fd5a71e8))
* **public:** remove unused web app manifest and icons ([050f1e7](https://github.com/Fdawgs/docsmith/commit/050f1e7c3463ea67d9d67389e29b7fc93ff19505))


### Miscellaneous

* **plugins/tidy-css:** update font-family inline comment ([091ca80](https://github.com/Fdawgs/docsmith/commit/091ca803422c77eae35570aba8ac95b1573e2b0f))
* **public:** add more apple-touch-icon sizes ([5bb8e73](https://github.com/Fdawgs/docsmith/commit/5bb8e73acdcbabd2b4e5e2ebdeea62a7c6120118))
* **public:** rename mask-icon ([41ff06a](https://github.com/Fdawgs/docsmith/commit/41ff06a9ff7f8a4fc2240706522f269846c0ebd6))
* remove trailing whitespace ([101bfc8](https://github.com/Fdawgs/docsmith/commit/101bfc8af7be92ac61d2a1b92799e5d1255a500f))
* **routes:** update cors inline comment ([6dce4e6](https://github.com/Fdawgs/docsmith/commit/6dce4e6d40153a9b39a3582666a08245335e6107))


### Dependencies

* **dependabot:** major tags no longer need ignore support ([43f40e1](https://github.com/Fdawgs/docsmith/commit/43f40e10afa4f65e8bde0f37a1ea3bf10cfb7551))
* **deps-dev:** bump @commitlint/cli from 16.1.0 to 16.2.1 ([18a2934](https://github.com/Fdawgs/docsmith/commit/18a293465309b52994910d88418c98ca8a16fc47))
* **deps-dev:** bump @commitlint/config-conventional ([657a716](https://github.com/Fdawgs/docsmith/commit/657a7162ae061d377c59bd80c63951ad09a0f5f1))
* **deps-dev:** bump autocannon from 7.6.0 to 7.7.0 ([9815e7c](https://github.com/Fdawgs/docsmith/commit/9815e7cecdfc3cc9ab47b3df137593d00ca57658))
* **deps-dev:** bump eslint from 8.8.0 to 8.9.0 ([23cc768](https://github.com/Fdawgs/docsmith/commit/23cc768c473056fc767d80f412cd1b7f261f1150))
* **deps-dev:** bump eslint-config-prettier from 8.3.0 to 8.4.0 ([4916581](https://github.com/Fdawgs/docsmith/commit/49165810b5d8cbcf7654be80b2479144a27e25d4))
* **deps-dev:** bump eslint-plugin-jest from 26.0.0 to 26.1.1 ([34c62e4](https://github.com/Fdawgs/docsmith/commit/34c62e443d6b947ddf1fb509db5592372d670ec3))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.7.0 to 37.9.4 ([9b0b0f8](https://github.com/Fdawgs/docsmith/commit/9b0b0f8a3f46a54eb4367a2e0583b60a7ae16ae9))
* **deps-dev:** bump jest from 27.4.7 to 27.5.1 ([ff6560e](https://github.com/Fdawgs/docsmith/commit/ff6560e66a4858ff7ec9fc00121a4ac24c582eab))
* **deps-dev:** bump playwright from 1.18.1 to 1.19.2 ([ea632b6](https://github.com/Fdawgs/docsmith/commit/ea632b614a79e7c0b953bffa8d5bfb0e8c5850e5))
* **deps:** bump actions/github-script from 5 to 6 ([3a54e55](https://github.com/Fdawgs/docsmith/commit/3a54e55f9af03061c06e60b454b8b42d0fd90d79))
* **deps:** bump actions/setup-node from 2 to 3 ([1e16c31](https://github.com/Fdawgs/docsmith/commit/1e16c317e9de76f7e35db4100110dc661e3c5edc))
* **deps:** bump dotenv from 15.0.0 to 16.0.0 ([6732991](https://github.com/Fdawgs/docsmith/commit/6732991b6c0712ad6e5a0877cf5eff01c81670de))
* **deps:** bump fastify from 3.27.0 to 3.27.2 ([2789508](https://github.com/Fdawgs/docsmith/commit/27895081e44b128eaf3e7746ab111ab5468b2826))
* **deps:** bump fastify-autoload from 3.10.0 to 3.11.0 ([49c484d](https://github.com/Fdawgs/docsmith/commit/49c484dac2fe3791bbe15ad0bfa4831f2e7be0b6))
* **deps:** bump fastify-bearer-auth from 6.1.0 to 6.2.0 ([c77d3f9](https://github.com/Fdawgs/docsmith/commit/c77d3f92c1f19395a0c23737cedfae30548e51c3))
* **deps:** bump fastify-cors from 6.0.2 to 6.0.3 ([110a4e9](https://github.com/Fdawgs/docsmith/commit/110a4e9b3b3994b126a1742c16c59c3c163ce46a))
* **deps:** bump fastify-disablecache from 2.0.5 to 2.0.6 ([b6f717c](https://github.com/Fdawgs/docsmith/commit/b6f717cd9edeeccb842b6335d387f5dccf38e48d))
* **deps:** bump fastify-floc-off from 1.0.4 to 1.0.5 ([eecb694](https://github.com/Fdawgs/docsmith/commit/eecb694b1ccec9b91d583bf3db5ad47bed5eb51a))
* **deps:** bump fastify-rate-limit from 5.7.0 to 5.7.2 ([3e5d397](https://github.com/Fdawgs/docsmith/commit/3e5d3971bcd838bcfa27c85e2747163ec95f4081))
* **deps:** bump node-poppler from 5.1.2 to 5.1.3 ([9501b88](https://github.com/Fdawgs/docsmith/commit/9501b88d7e32f466820a82becdc3cc133cea3d9c))
* **deps:** bump node-unrtf from 2.0.6 to 2.0.7 ([24fe07d](https://github.com/Fdawgs/docsmith/commit/24fe07d64690629bae8447d19b6c32059d662ebb))
* **deps:** bump pino from 7.6.5 to 7.8.0 ([c1ab1d1](https://github.com/Fdawgs/docsmith/commit/c1ab1d12ef7661faf51d297a55c7758be0035621))
* **deps:** bump prismjs from 1.26.0 to 1.27.0 ([bbff55b](https://github.com/Fdawgs/docsmith/commit/bbff55b2e676ee1ad9e074d81f8b3ef62da61a01))
* **deps:** bump raw-body from 2.4.2 to 2.5.0 ([024c136](https://github.com/Fdawgs/docsmith/commit/024c1367c55753b18ad27e36b7242fbdc37945e4))
* **deps:** bump redoc from 2.0.0-rc.63 to 2.0.0-rc.64 ([28054ba](https://github.com/Fdawgs/docsmith/commit/28054bac595c01975158cc2d6a5608f7dadb08e6))
* **deps:** bump sub-dependencies ([#698](https://github.com/Fdawgs/docsmith/issues/698)) ([a4997eb](https://github.com/Fdawgs/docsmith/commit/a4997ebe7ec46206ee1625f344a250153a643d9e))

### [6.0.2](https://github.com/Fdawgs/docsmith/compare/v6.0.1...v6.0.2) (2022-02-01)


### Bug fixes

* **routes/docs:** resolve `token "definitions" does not exist` error ([#629](https://github.com/Fdawgs/docsmith/issues/629)) ([812b19a](https://github.com/Fdawgs/docsmith/commit/812b19aa28af87c357cb179e2030ee0acc21fa65))


### Improvements

* **config:** use boolean schemas ([1c82524](https://github.com/Fdawgs/docsmith/commit/1c8252491fe9a9b2efde47fba5d4e965167f179b))
* **routes/pdf/txt:** remove workaround for conditional ocr prop ([0fb44cf](https://github.com/Fdawgs/docsmith/commit/0fb44cfacb8a0eefa62fdcbbcc60fed1b16d6c4a))
* **server:** reorder plugin registers ([836d42a](https://github.com/Fdawgs/docsmith/commit/836d42a8dff8255d7975e0ac403171b170124d05))


### Continuous integration

* install playwright ([3e17949](https://github.com/Fdawgs/docsmith/commit/3e17949fa2610cc21040dc5bcc8688a4e4ee44cf))


### Dependencies

* **dependabot:** ignore minor and patch commit-lint updates ([#633](https://github.com/Fdawgs/docsmith/issues/633)) ([5d25980](https://github.com/Fdawgs/docsmith/commit/5d2598039d5635259d1a24ed7d76e3aa4e5c3a6c))
* **dependabot:** use default open-pull-requests-limit value ([36524f8](https://github.com/Fdawgs/docsmith/commit/36524f8904e12664af11c919ca0e39938d91e474))
* **deps-dev:** add playwright ([95ab84c](https://github.com/Fdawgs/docsmith/commit/95ab84c5fbedd24b4690350df21d527db6fc57e9))
* **deps-dev:** bump @commitlint/cli from 16.0.1 to 16.1.0 ([40e7342](https://github.com/Fdawgs/docsmith/commit/40e734259bd07192ab1e1171433468d7ac3c5e80))
* **deps-dev:** bump autocannon from 7.5.1 to 7.6.0 ([a5ecb6e](https://github.com/Fdawgs/docsmith/commit/a5ecb6e984622cd9ac55d6183b2a33492050894f))
* **deps-dev:** bump eslint from 8.6.0 to 8.7.0 ([a48f8c8](https://github.com/Fdawgs/docsmith/commit/a48f8c83de86a1732958028f9f71a5c001e2ada6))
* **deps-dev:** bump eslint from 8.7.0 to 8.8.0 ([f69aaa4](https://github.com/Fdawgs/docsmith/commit/f69aaa4620c86ead69b4c9b7d26f309e7c0f2762))
* **deps-dev:** bump eslint-plugin-jest from 25.3.4 to 26.0.0 ([0a6b8c5](https://github.com/Fdawgs/docsmith/commit/0a6b8c52c87e20453aaffd0ec6eac5f6819cc6a7))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.5.1 to 37.7.0 ([0027bfd](https://github.com/Fdawgs/docsmith/commit/0027bfd0750a135502110d9929c71ce9551eea11))
* **deps-dev:** bump eslint-plugin-security-node from 1.1.0 to 1.1.1 ([9710f82](https://github.com/Fdawgs/docsmith/commit/9710f82c96f294b447382d05b35c6d6a702afa5d))
* **deps-dev:** pin faker version ([5159ec9](https://github.com/Fdawgs/docsmith/commit/5159ec90a28ba7d344b15778f61730cd018a60fa))
* **deps:** bump dotenv from 10.0.0 to 14.3.2 ([bc76874](https://github.com/Fdawgs/docsmith/commit/bc76874d91a9f7e2bd25f3142fe2a92265891b14))
* **deps:** bump dotenv from 14.3.2 to 15.0.0 ([01b879b](https://github.com/Fdawgs/docsmith/commit/01b879b4a3a58bf030e634b30294e66e7ee495c6))
* **deps:** bump env-schema from 3.5.1 to 3.5.2 ([7039148](https://github.com/Fdawgs/docsmith/commit/70391482ac2a6e5a01b7c0393caad4ddabc07572))
* **deps:** bump fastify from 3.25.3 to 3.27.0 ([2b96ce5](https://github.com/Fdawgs/docsmith/commit/2b96ce52f1d48ae2b33bb040ecda863d6938919e))
* **deps:** bump fastify-autoload from 3.9.0 to 3.10.0 ([009076e](https://github.com/Fdawgs/docsmith/commit/009076ebcf8e3f916014ea70e2203009bb49fc9a))
* **deps:** bump fastify-disablecache from 2.0.4 to 2.0.5 ([3e08779](https://github.com/Fdawgs/docsmith/commit/3e087797fb8129d1f146c926a33133525470c1c4))
* **deps:** bump fastify-floc-off from 1.0.3 to 1.0.4 ([43502b1](https://github.com/Fdawgs/docsmith/commit/43502b181952b4a751a6caa88519955714d4cb46))
* **deps:** bump fastify-helmet from 5.3.2 to 7.0.1 ([#655](https://github.com/Fdawgs/docsmith/issues/655)) ([3c3e898](https://github.com/Fdawgs/docsmith/commit/3c3e8980f63ed4512136766bd40bdfdbfe141226))
* **deps:** bump fastify-plugin from 3.0.0 to 3.0.1 ([d07678a](https://github.com/Fdawgs/docsmith/commit/d07678a6378b08fed09e6b92310c8831052234eb))
* **deps:** bump file-stream-rotator from 0.5.7 to 0.6.1 ([78f337a](https://github.com/Fdawgs/docsmith/commit/78f337a1c00058af47ac3a01234e7e2cad63f61f))
* **deps:** bump node-fetch from 2.6.6 to 2.6.7 ([daeb360](https://github.com/Fdawgs/docsmith/commit/daeb3605db06e16184e5d8a68032b8c6560cd446))
* **deps:** bump node-poppler from 5.1.1 to 5.1.2 ([714822d](https://github.com/Fdawgs/docsmith/commit/714822dec1b87e6d957f7df5342c3689de710ed6))
* **deps:** bump pino from 7.6.2 to 7.6.4 ([964316b](https://github.com/Fdawgs/docsmith/commit/964316b204fb563ebc598c3c3527bab7edc24c43))
* **deps:** bump pino from 7.6.4 to 7.6.5 ([e8335c5](https://github.com/Fdawgs/docsmith/commit/e8335c5295860276c879e3903ace088827c23580))
* **deps:** bump pino-pretty from 7.3.0 to 7.5.0 ([83c4d3e](https://github.com/Fdawgs/docsmith/commit/83c4d3ea1f9b11299206a8c65637cf2fe0f619d5))
* **deps:** bump pino-pretty from 7.5.0 to 7.5.1 ([51c5756](https://github.com/Fdawgs/docsmith/commit/51c575639e38d8dbc9be346feef8b059c671f930))
* **deps:** bump redoc from 2.0.0-rc.59 to 2.0.0-rc.61 ([5915de3](https://github.com/Fdawgs/docsmith/commit/5915de3103f5681a9429d549c184f61ef0f1fc92))
* **deps:** bump redoc from 2.0.0-rc.61 to 2.0.0-rc.63 ([#660](https://github.com/Fdawgs/docsmith/issues/660)) ([ac12601](https://github.com/Fdawgs/docsmith/commit/ac12601165f654b9c332b2833b345b9b5a7a41ef))
* **deps:** bump sub-dependencies ([#664](https://github.com/Fdawgs/docsmith/issues/664)) ([c8aaac2](https://github.com/Fdawgs/docsmith/commit/c8aaac2006505e5e41c0f34740668105dd593cff))

### [6.0.1](https://github.com/Fdawgs/docsmith/compare/v6.0.0...v6.0.1) (2022-01-06)


### Documentation

* **contributing:** add mention of husky pre-commit hook ([c9d827c](https://github.com/Fdawgs/docsmith/commit/c9d827c5f4a1632513272af2fa1e60c911a498b5))
* **contributing:** add step for `lint:licenses` script ([2790d26](https://github.com/Fdawgs/docsmith/commit/2790d262b33ef348fff3ee63734fe26195218589))
* **contributing:** update husky hook mention ([5f0e3a9](https://github.com/Fdawgs/docsmith/commit/5f0e3a9ba69647a96b0e3c52ab74b08b6b55707b))


### Continuous integration

* remove spellcheck workflow ([#621](https://github.com/Fdawgs/docsmith/issues/621)) ([964f031](https://github.com/Fdawgs/docsmith/commit/964f03142331c0f248a5f3d6fb419c4010246e1b))


### Miscellaneous

* add istanbul inline comments ([441495d](https://github.com/Fdawgs/docsmith/commit/441495d92959fdb9325e13fd3eceff457e7ca396))
* fix `server` jsdoc tag param type ([a5a5a40](https://github.com/Fdawgs/docsmith/commit/a5a5a40c0eb8558af434701e52687f9ed54c44f6))
* **scripts:** remove invalid license identifier from `lint:licenses` ([0433f3e](https://github.com/Fdawgs/docsmith/commit/0433f3ea2a1d53c9bfca67159d13d050daff434f))
* **scripts:** remove non-permissive bsd license from accepted list ([#622](https://github.com/Fdawgs/docsmith/issues/622)) ([3a19000](https://github.com/Fdawgs/docsmith/commit/3a19000483bdb5ddfd9bf5da41adf851384c082a))
* **scripts:** remove unused package from excluded list ([ce4a7dc](https://github.com/Fdawgs/docsmith/commit/ce4a7dc3a63664479737a6c43d10854e831630e9))
* **server:** update inline comment re helmet defaults ([c5e1c10](https://github.com/Fdawgs/docsmith/commit/c5e1c1018f19bc4b8dc1d3bd920a1f6c5a65d8f0))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 15.0.0 to 16.0.1 ([6c6d38a](https://github.com/Fdawgs/docsmith/commit/6c6d38a7ed3e65f0e5c1aaa83e1ef351c712a407))
* **deps-dev:** bump @commitlint/config-conventional ([bc94d49](https://github.com/Fdawgs/docsmith/commit/bc94d49daedc9c93c8e4091ac1ab8e2104551fc6))
* **deps-dev:** bump autocannon from 7.5.0 to 7.5.1 ([b5f9660](https://github.com/Fdawgs/docsmith/commit/b5f96600819e51a2a59189678ddc32fa74cf7f38))
* **deps-dev:** bump eslint from 8.4.1 to 8.6.0 ([79bd003](https://github.com/Fdawgs/docsmith/commit/79bd003e629e2263c43aa87e27a86819fc397e3c))
* **deps-dev:** bump eslint-plugin-import from 2.25.3 to 2.25.4 ([6413f13](https://github.com/Fdawgs/docsmith/commit/6413f1389809f30f2e1404e97fcd07d48ef1a7c0))
* **deps-dev:** bump eslint-plugin-jest from 25.3.0 to 25.3.3 ([00965ea](https://github.com/Fdawgs/docsmith/commit/00965ea81bf07a1ced6a324ec41268460dc45a61))
* **deps-dev:** bump eslint-plugin-jest from 25.3.3 to 25.3.4 ([4d04a1a](https://github.com/Fdawgs/docsmith/commit/4d04a1afc5ad44a203e3dd2d8b0a5f727545b122))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.2.0 to 37.5.0 ([f7c2939](https://github.com/Fdawgs/docsmith/commit/f7c2939097f92f15681db55605fde6a65f2fed70))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.5.0 to 37.5.1 ([3b2ca71](https://github.com/Fdawgs/docsmith/commit/3b2ca71459917a6716cf7228d1f1351549631439))
* **deps-dev:** bump eslint-plugin-promise from 5.2.0 to 6.0.0 ([dc30f22](https://github.com/Fdawgs/docsmith/commit/dc30f222cf0b887681351762467eab5324038e91))
* **deps-dev:** bump eslint-plugin-security-node from 1.0.14 to 1.1.0 ([6ca1d19](https://github.com/Fdawgs/docsmith/commit/6ca1d199725ed57362657d9af87f8c3f6d8a0da8))
* **deps-dev:** bump jest from 27.4.4 to 27.4.5 ([751fbe6](https://github.com/Fdawgs/docsmith/commit/751fbe64baf2745f7a704fb44f26f6f33bb145ea))
* **deps-dev:** bump jest from 27.4.5 to 27.4.7 ([1122a6e](https://github.com/Fdawgs/docsmith/commit/1122a6e47e1a75ad940a0f9e34c81d078f14894c))
* **deps-dev:** remove lodash ([04f3a47](https://github.com/Fdawgs/docsmith/commit/04f3a47dd7724b427ead2700a912b141b6be8eda))
* **deps:** bump env-schema from 3.5.0 to 3.5.1 ([e89f3f0](https://github.com/Fdawgs/docsmith/commit/e89f3f0cb22936293794c32f4b87703b99531f3e))
* **deps:** bump fastify from 3.24.1 to 3.25.3 ([3cabadb](https://github.com/Fdawgs/docsmith/commit/3cabadb1e834e01a998c1af63c953fd5deceb6a2))
* **deps:** bump fastify-bearer-auth from 6.0.0 to 6.1.0 ([84402f9](https://github.com/Fdawgs/docsmith/commit/84402f9805daacb406540061d5753631ce4564a4))
* **deps:** bump fastify-compress from 4.0.0 to 4.0.1 ([eae061d](https://github.com/Fdawgs/docsmith/commit/eae061d0f6711c3f1f161dba3d13e35e11b3be04))
* **deps:** bump fastify-swagger from 4.12.6 to 4.13.0 ([1d5d9c3](https://github.com/Fdawgs/docsmith/commit/1d5d9c3bac166bd975d3f92148a333d5ef3a8148))
* **deps:** bump GoogleCloudPlatform/release-please-action from 2 to 3 ([8099e2c](https://github.com/Fdawgs/docsmith/commit/8099e2c6f6eb29d1b2f911a9c11406b65a7490fc))
* **deps:** bump pino from 7.5.1 to 7.6.2 ([05d74f0](https://github.com/Fdawgs/docsmith/commit/05d74f05ef2ed86ebedcecbdc540b72ea36eb3d4))
* **deps:** bump pino-pretty from 7.2.0 to 7.3.0 ([3c45289](https://github.com/Fdawgs/docsmith/commit/3c452895623d63f4ec37bc5d0b80be6fcc5a83e6))
* **deps:** bump sub-dependencies ([#628](https://github.com/Fdawgs/docsmith/issues/628)) ([3eae7e9](https://github.com/Fdawgs/docsmith/commit/3eae7e95380046843e6d6d1e097e36595a3c597b))

## [6.0.0](https://github.com/Fdawgs/docsmith/compare/v5.2.5...v6.0.0) (2021-12-13)


### ⚠ BREAKING CHANGES

* Minimum node engine bumped from `>=14.0.0` to `^14.17.0 || ^15.6.0 || >=16.0.0`

### Improvements

* **plugins:** replace `uuid` dep with `crypto.randomUUID()` ([#565](https://github.com/Fdawgs/docsmith/issues/565)) ([9d5ef67](https://github.com/Fdawgs/docsmith/commit/9d5ef6757ed7cc488b4ffb865edd9c87092ed06d))


### Dependencies

* **dependabot:** ignore minor and patch release-please-action updates ([#586](https://github.com/Fdawgs/docsmith/issues/586)) ([e822c6c](https://github.com/Fdawgs/docsmith/commit/e822c6c5d49870ce090beaa10817669a38f790fb))
* **deps-dev:** bump eslint from 8.3.0 to 8.4.1 ([919599b](https://github.com/Fdawgs/docsmith/commit/919599bc053d4740838caa63affd63ae55d67d3b))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.1.0 to 37.2.0 ([9dc0c7b](https://github.com/Fdawgs/docsmith/commit/9dc0c7bc7a94b29298e5feed6cc34177b78d03e8))
* **deps-dev:** bump jest from 27.4.3 to 27.4.4 ([58cfc1d](https://github.com/Fdawgs/docsmith/commit/58cfc1dd251d2930e60ca1fec62d255e2becf950))
* **deps-dev:** bump prettier from 2.5.0 to 2.5.1 ([ce8433d](https://github.com/Fdawgs/docsmith/commit/ce8433d4410107e2708cf71865d07f12e29e3ee4))
* **deps:** bump fastify-compress from 3.7.0 to 4.0.0 ([0d530ac](https://github.com/Fdawgs/docsmith/commit/0d530ace21cbdd8a99565fd322490c965bb26537))
* **deps:** bump fastify-rate-limit from 5.6.2 to 5.7.0 ([c3f90f2](https://github.com/Fdawgs/docsmith/commit/c3f90f29a77222289f640062487de0165c48ae94))
* **deps:** bump jsdom from 18.1.1 to 19.0.0 ([76a8a77](https://github.com/Fdawgs/docsmith/commit/76a8a77e1581ee1fce72492b868f81b4b357df1f))
* **deps:** bump node-poppler from 5.1.0 to 5.1.1 ([c7b7575](https://github.com/Fdawgs/docsmith/commit/c7b7575a1a5126d4916904be2656c9d569effebe))
* **deps:** bump redoc from 2.0.0-rc.58 to 2.0.0-rc.59 ([82c7660](https://github.com/Fdawgs/docsmith/commit/82c76606688324d39bbd5382c4cabf08585be745))


### Documentation

* **readme:** fix broken docker link ([9b11dc3](https://github.com/Fdawgs/docsmith/commit/9b11dc3727d50b0882ab7545b62c92bb2174591d))
* **readme:** tidy prerequisite and deployment steps ([43b1f87](https://github.com/Fdawgs/docsmith/commit/43b1f8701cc8818e9afff978d43b8bcf0ffa22a0))

### [5.2.5](https://github.com/Fdawgs/docsmith/compare/v5.2.4...v5.2.5) (2021-12-02)


### Bug fixes

* **plugins/rtf-to-txt:** remove metadata comments from beginning of file ([4c5095f](https://github.com/Fdawgs/docsmith/commit/4c5095f9fe63b42b729cf10d9bc1cd4a26abb83d))
* **plugins/tidy-html:** hide html comment tags ([d4285d9](https://github.com/Fdawgs/docsmith/commit/d4285d9a320fad6f058fc6d71a00fb17cccf8c7c))


### Documentation

* **coc:** reduce verbosity ([f0bdc3e](https://github.com/Fdawgs/docsmith/commit/f0bdc3eb2d1a9d37de00898727b1e0fe8579a4a2))
* **readme:** add notes regarding tested binaries ([4cb753b](https://github.com/Fdawgs/docsmith/commit/4cb753be794ebf8f467ee76d6c3fd0aaa67aa5e2))
* **readme:** remove planned features section ([#562](https://github.com/Fdawgs/docsmith/issues/562)) ([d4aa988](https://github.com/Fdawgs/docsmith/commit/d4aa988a3c579720e05642b4a2533425c8df8b32))


### Miscellaneous

* **husky/pre-commit:** add `lint:licenses` script ([#564](https://github.com/Fdawgs/docsmith/issues/564)) ([1bc122e](https://github.com/Fdawgs/docsmith/commit/1bc122e1937cec69bbf006d1fb9f062507fd28ed))
* ignore `.yarnclean` and `yarn.lock` ([#566](https://github.com/Fdawgs/docsmith/issues/566)) ([79d90a0](https://github.com/Fdawgs/docsmith/commit/79d90a0ef98eef1d83a65e280d15a02e0ac04872))
* **plugins/tidy-css:** add comment re escape and replace purpose ([64fad0c](https://github.com/Fdawgs/docsmith/commit/64fad0cf07c90630b2ce7ccb70d9eff87cae9417))
* turn off `security/detect-object-injection` eslint rule ([#563](https://github.com/Fdawgs/docsmith/issues/563)) ([21da097](https://github.com/Fdawgs/docsmith/commit/21da09736a6c81236a7de5681f88f96d8706d74f))


### Improvements

* **plugins/rtf-to-txt:** improve conciseness of regex ([993f9ad](https://github.com/Fdawgs/docsmith/commit/993f9ade7641958d43987aababab8589f18150ac))


### Dependencies

* **dependabot:** ignore minor and patch github-actions updates ([#557](https://github.com/Fdawgs/docsmith/issues/557)) ([93819ba](https://github.com/Fdawgs/docsmith/commit/93819bad0085b1958412b547a74204667fc70c4b))
* **deps-dev:** bump @commitlint/cli from 14.1.0 to 15.0.0 ([4c97c60](https://github.com/Fdawgs/docsmith/commit/4c97c605cb86251998efc5aa278eaef0e0eda33e))
* **deps-dev:** bump @commitlint/config-conventional ([54a14cb](https://github.com/Fdawgs/docsmith/commit/54a14cbbe0ae56a48f44ea935dd614e946ade690))
* **deps-dev:** bump eslint-plugin-jest from 25.2.4 to 25.3.0 ([36775f1](https://github.com/Fdawgs/docsmith/commit/36775f12e4f32e8f02e6e2e0dd6cf57843300fb4))
* **deps-dev:** bump eslint-plugin-jsdoc from 37.0.3 to 37.1.0 ([ecdd795](https://github.com/Fdawgs/docsmith/commit/ecdd795a8ac9e0dec00947e8463545ba545dec5f))
* **deps-dev:** bump eslint-plugin-promise from 5.1.1 to 5.2.0 ([4f809d6](https://github.com/Fdawgs/docsmith/commit/4f809d6655d9093349d9e38123eb9059a9ad2746))
* **deps-dev:** bump jest from 27.3.1 to 27.4.2 ([8d87f66](https://github.com/Fdawgs/docsmith/commit/8d87f66073f13bae4d1f92dcf09c1636b4039212))
* **deps-dev:** bump jest from 27.4.2 to 27.4.3 ([eac2be7](https://github.com/Fdawgs/docsmith/commit/eac2be79227e606465a597ffe4e72a5583b2436b))
* **deps-dev:** bump prettier from 2.4.1 to 2.5.0 ([b23ab7a](https://github.com/Fdawgs/docsmith/commit/b23ab7ac73e757165e0167015d6e54d3bc3a4986))
* **deps:** bump fastify from 3.24.0 to 3.24.1 ([5fc007d](https://github.com/Fdawgs/docsmith/commit/5fc007d5207749c27de21b26fab37efb00a7b0cf))
* **deps:** bump fastify-compress from 3.6.1 to 3.7.0 ([59a5aeb](https://github.com/Fdawgs/docsmith/commit/59a5aeb774cfa63ca9052260b0787e94d1c6d5c7))
* **deps:** bump GoogleCloudPlatform/release-please-action ([a5783ee](https://github.com/Fdawgs/docsmith/commit/a5783ee6b8445fe23f6f72e084bed739e0e0e762))
* **deps:** bump jsdom from 18.1.0 to 18.1.1 ([b1532bf](https://github.com/Fdawgs/docsmith/commit/b1532bfc4df888ae499cba39582d767742e50349))
* **deps:** bump node-unrtf from 2.0.5 to 2.0.6 ([a1c5d34](https://github.com/Fdawgs/docsmith/commit/a1c5d346191a1c62326d0da54a5b09ed2f1a0561))
* **deps:** bump pino from 7.2.0 to 7.5.0 ([b16dfed](https://github.com/Fdawgs/docsmith/commit/b16dfed87c4c7bbd986ca9e0df7fd37921fc5865))
* **deps:** bump pino from 7.5.0 to 7.5.1 ([eb50682](https://github.com/Fdawgs/docsmith/commit/eb50682f14701cff86a720d36acd87001d413a5b))
* **deps:** bump raw-body from 2.4.1 to 2.4.2 ([0e0956f](https://github.com/Fdawgs/docsmith/commit/0e0956f47390cf6c3bcc68d81da546b6d756baf1))
* **deps:** bump redoc from 2.0.0-rc.57 to 2.0.0-rc.58 ([b0dc2dc](https://github.com/Fdawgs/docsmith/commit/b0dc2dc14b6840688a8ec6e02da3ce22dc86667c))
* **deps:** bump sub dependencies ([#585](https://github.com/Fdawgs/docsmith/issues/585)) ([5924625](https://github.com/Fdawgs/docsmith/commit/592462521ca0ffb196821e096751390232a4e0af))

### [5.2.4](https://github.com/Fdawgs/docsmith/compare/v5.2.3...v5.2.4) (2021-11-16)


### Bug fixes

* **app:** delete temp directory and leftover files on shutdown ([#555](https://github.com/Fdawgs/docsmith/issues/555)) ([208c341](https://github.com/Fdawgs/docsmith/commit/208c3417942e806d13e4b851b0b165769ea28035))


### Continuous integration

* trigger workflows when drafts marked as "ready to review" ([#550](https://github.com/Fdawgs/docsmith/issues/550)) ([1acd2c2](https://github.com/Fdawgs/docsmith/commit/1acd2c2b351cf8cde7dd41ddcac946475f4c3ccd))


### Miscellaneous

* **plugins/docx-to-html:** replace stray back-ticks ([#554](https://github.com/Fdawgs/docsmith/issues/554)) ([579c77f](https://github.com/Fdawgs/docsmith/commit/579c77f56040b88edcfb94df272d4ebbad15b899))


### Improvements

* **plugins/embed-html-images:** remove redundant dependency ([4753bcc](https://github.com/Fdawgs/docsmith/commit/4753bcc127269da572a4d7cb1ef5ad7043b1076c))
* **plugins:** further separate server and client errors ([c7e2ea0](https://github.com/Fdawgs/docsmith/commit/c7e2ea0a619b7e7e03f7eea97c17a5423e59bf57))
* use custom error handler; link errors to requests in logs ([784541e](https://github.com/Fdawgs/docsmith/commit/784541e49696fdacf73fd0147b84f1b4f88df24d))


### Dependencies

* **deps:** bump fastify from 3.23.1 to 3.24.0 ([9ba8835](https://github.com/Fdawgs/docsmith/commit/9ba88350d87e0923eb6a81cdf59bc00502ff8f49))
* **deps:** bump jsdom from 18.0.1 to 18.1.0 ([94f6f9a](https://github.com/Fdawgs/docsmith/commit/94f6f9aea9e04b2c6e33a1efbe6157c99b81ac3a))

### [5.2.3](https://github.com/Fdawgs/docsmith/compare/v5.2.2...v5.2.3) (2021-11-11)


### Bug fixes

* **plugins/embed-html-images:** create image path safely ([ebd2b7d](https://github.com/Fdawgs/docsmith/commit/ebd2b7d2f3683f824fffd7151fabd17c226bfbb8))
* **plugins:** separate user and server error responses ([#548](https://github.com/Fdawgs/docsmith/issues/548)) ([0fdc0f3](https://github.com/Fdawgs/docsmith/commit/0fdc0f3fb54a0046b61c10808378994290464c77))


### Miscellaneous

* **.env.template:** add note regarding required logging variables ([693d17b](https://github.com/Fdawgs/docsmith/commit/693d17bf68b3674fd8ac42dd591c647a284d1d1b))
* **.prettierrc:** only enable `bracketSameLine` for html ([#519](https://github.com/Fdawgs/docsmith/issues/519)) ([b53e630](https://github.com/Fdawgs/docsmith/commit/b53e630f760701572a652aeea4130019e6898c82))
* rename `fsp` variable to `fs` ([19f3015](https://github.com/Fdawgs/docsmith/commit/19f3015fac2c0734a61bc23e963a69754da29474))


### Continuous integration

* **ci:** do not run clean-up on draft prs ([4a13559](https://github.com/Fdawgs/docsmith/commit/4a135596b5c89349e7d860c4990cef3abda3ee9d))
* **spell-check:** do not run on draft prs ([888ab78](https://github.com/Fdawgs/docsmith/commit/888ab78095036989467ef3c0f44da68ed1004350))
* use actions/setup-node's cache option ([#521](https://github.com/Fdawgs/docsmith/issues/521)) ([959ec09](https://github.com/Fdawgs/docsmith/commit/959ec09b0e1162803736c805a9a9fee564ec9be0))


### Dependencies

* **deps-dev:** bump eslint-config-airbnb-base from 14.2.1 to 15.0.0 ([8317bfa](https://github.com/Fdawgs/docsmith/commit/8317bfacaf90835bdd20c474eb5ef70139be82b3))
* **deps-dev:** bump eslint-plugin-import from 2.25.2 to 2.25.3 ([ff1b7dc](https://github.com/Fdawgs/docsmith/commit/ff1b7dc5725c7efd38e767ec5524e59992b0ae84))
* **deps-dev:** bump eslint-plugin-jest from 25.2.2 to 25.2.4 ([364ce9d](https://github.com/Fdawgs/docsmith/commit/364ce9d2abf5f68d7088285f37cc58625838a3dd))
* **deps-dev:** bump nodemon from 2.0.14 to 2.0.15 ([a0f743c](https://github.com/Fdawgs/docsmith/commit/a0f743cddfb0fb384e9f69e58c8418ff3a2aaf75))
* **deps:** bump actions/checkout from 2.3.5 to 2.4.0 ([d826b19](https://github.com/Fdawgs/docsmith/commit/d826b19e71114fde93b06f2d1ddd8c687def9de7))
* **deps:** bump env-schema from 3.4.0 to 3.5.0 ([96c9b98](https://github.com/Fdawgs/docsmith/commit/96c9b98cea940ef00b71c3a44f6ad4716acbc666))
* **deps:** bump fastify from 3.22.1 to 3.23.1 ([925c3a5](https://github.com/Fdawgs/docsmith/commit/925c3a54aefb8721e9950e39223d77972674accf))
* **deps:** bump fastify-static from 4.4.2 to 4.5.0 ([86f704a](https://github.com/Fdawgs/docsmith/commit/86f704a0fb608261998eb96a7e455f3c8d7b0d27))
* **deps:** bump jsdom from 18.0.0 to 18.0.1 ([f179def](https://github.com/Fdawgs/docsmith/commit/f179def0e14159a3350b9d357ab0aa15d2008bc5))
* **deps:** bump node-poppler from 5.0.2 to 5.0.3 ([1756dbf](https://github.com/Fdawgs/docsmith/commit/1756dbfd73f1ecf24510722ef9656531a4765c94))
* **deps:** bump node-poppler from 5.0.3 to 5.1.0 ([ab5d71a](https://github.com/Fdawgs/docsmith/commit/ab5d71afd3b11dce87de908312ae3ed6f0095926))
* **deps:** bump node-unrtf from 2.0.4 to 2.0.5 ([ce2a420](https://github.com/Fdawgs/docsmith/commit/ce2a42092e86a3e43040a388ad6fd6830a274487))
* **deps:** bump pino from 7.0.5 to 7.1.0 ([24514c7](https://github.com/Fdawgs/docsmith/commit/24514c74de11041c56b3d19ad34e6b8e4af3aef4))
* **deps:** bump pino from 7.1.0 to 7.2.0 ([c523570](https://github.com/Fdawgs/docsmith/commit/c523570507e04e3b048df27370ad6b47eae63e45))
* **deps:** bump pino-pretty from 7.1.0 to 7.2.0 ([6f1d967](https://github.com/Fdawgs/docsmith/commit/6f1d967d5f38417f233f7d6f37b20969c85358bd))


### Improvements

* **config:** normalize file paths ([#526](https://github.com/Fdawgs/docsmith/issues/526)) ([cc5f80b](https://github.com/Fdawgs/docsmith/commit/cc5f80b4de6b4586522e5d21abdf0c2f2d02e675))
* **plugins/embed-html-images:** convert to async function ([#547](https://github.com/Fdawgs/docsmith/issues/547)) ([fe2d316](https://github.com/Fdawgs/docsmith/commit/fe2d316dbdc3133b985f4e64174520dc3a6a6f55))
* **plugins:** normalize `tempDirectory` param ([21730c4](https://github.com/Fdawgs/docsmith/commit/21730c4cf26faffeb1d701d6f25f286fcb1ee2bf))
* **plugins:** provide generic error response ([#546](https://github.com/Fdawgs/docsmith/issues/546)) ([64d941c](https://github.com/Fdawgs/docsmith/commit/64d941c90ad127dd6cf5da1ae6ff5c7128181116))
* **plugins:** remove `fs.access()` calls ([#527](https://github.com/Fdawgs/docsmith/issues/527)) ([2818db1](https://github.com/Fdawgs/docsmith/commit/2818db1384012888ed052900dad6b0b944b8cb38))
* **plugins:** use `path.joinSafe()` over template literals ([e3d5273](https://github.com/Fdawgs/docsmith/commit/e3d52734c83b02b469cbbb2151991a863989bd4a))
* **routes:** throw `notAcceptable` errors not return ([#528](https://github.com/Fdawgs/docsmith/issues/528)) ([5fa94ac](https://github.com/Fdawgs/docsmith/commit/5fa94ac87e3c65047e08d84a169f7c94520bd7e1))
* **server:** use `path.joinSafe()` over `path.join()` ([71af90f](https://github.com/Fdawgs/docsmith/commit/71af90f09e7fcf56df0ecd795a4b0ff831b33b56))

### [5.2.2](https://github.com/Fdawgs/docsmith/compare/v5.2.1...v5.2.2) (2021-11-01)


### Bug fixes

* **plugins/tidy-css:** correct escaping for `fonts` param ([#514](https://github.com/Fdawgs/docsmith/issues/514)) ([67bb360](https://github.com/Fdawgs/docsmith/commit/67bb3609f77d108bb43189409807076766134085))
* **plugins/tidy-css:** remove global flag from regex ([#511](https://github.com/Fdawgs/docsmith/issues/511)) ([88560e2](https://github.com/Fdawgs/docsmith/commit/88560e23bee568e2a3aee887c3735890896d27e6))
* **plugins/tidy-css:** replace all instances of value ([#518](https://github.com/Fdawgs/docsmith/issues/518)) ([090231f](https://github.com/Fdawgs/docsmith/commit/090231f340f40f7e1d8b249b543db90380671259))
* **plugins/tidy-css:** wrap non-alphabetical font families in quotes ([#508](https://github.com/Fdawgs/docsmith/issues/508)) ([8ccf49d](https://github.com/Fdawgs/docsmith/commit/8ccf49dd9f71cbab46fc3e81f6c873597430be22))
* **routes:** allow for rgb and hsl values in `backgroundColor` param ([#515](https://github.com/Fdawgs/docsmith/issues/515)) ([e864302](https://github.com/Fdawgs/docsmith/commit/e864302ba95d857da61eb53c4a53db1e023544de))


### Improvements

* **plugins/tidy-css:** replace `match()` with `test()` ([#510](https://github.com/Fdawgs/docsmith/issues/510)) ([dc2e319](https://github.com/Fdawgs/docsmith/commit/dc2e319b9782e5e3d506e9a22ac0826fa313afe0))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.2.1 to 14.1.0 ([8991105](https://github.com/Fdawgs/docsmith/commit/89911055073dce996347ecc9c9078369e36b712b))
* **deps-dev:** bump @commitlint/config-conventional ([e33a440](https://github.com/Fdawgs/docsmith/commit/e33a440daba04d58ad982ade3f27b593643b696c))
* **deps-dev:** bump eslint from 7.32.0 to 8.1.0 ([b6cd2b9](https://github.com/Fdawgs/docsmith/commit/b6cd2b96510480c3eed16d340c0c576aae24f511))
* **deps:** bump fastify-sensible from 3.1.1 to 3.1.2 ([5aca88b](https://github.com/Fdawgs/docsmith/commit/5aca88b79362664893d2745786bd22f40550eee8))

### [5.2.1](https://github.com/Fdawgs/docsmith/compare/v5.2.0...v5.2.1) (2021-10-29)


### Bug fixes

* **config:** remove additional env variables ([ef5f9bf](https://github.com/Fdawgs/docsmith/commit/ef5f9bf49f52687b13d78077e60b5d42f89e5288))
* **routes/pdf:** set max length for password params ([864d218](https://github.com/Fdawgs/docsmith/commit/864d218853063842bda9e8f4cae8d1fdf377ddf0))
* **routes:** clarify on valid input for `language` params ([4c6b50d](https://github.com/Fdawgs/docsmith/commit/4c6b50d3d829e0ec8b8174b358d6d2f9ffe909c4))
* **routes:** remove additional properties from req query ([6875a59](https://github.com/Fdawgs/docsmith/commit/6875a59751f7f81427ef9099d5494a43490e4028))


### Documentation

* bump coc from v2.0.0 to v2.1.0 ([#486](https://github.com/Fdawgs/docsmith/issues/486)) ([a161d41](https://github.com/Fdawgs/docsmith/commit/a161d41914ac4448ba6d0013da81223b963152c4))


### Improvements

* use secure-json-parse for json parsing ([f5c3170](https://github.com/Fdawgs/docsmith/commit/f5c31707cb5bc08227433aea69d78aae7673ea72))


### Miscellaneous

* **.eslintrc:** remove redundant `impliedStrict` option ([#484](https://github.com/Fdawgs/docsmith/issues/484)) ([7742bce](https://github.com/Fdawgs/docsmith/commit/7742bce7e4f24c48b65903769c1bcff5c38da50c))
* **plugins/tidy-css:** add whitespace ([8001076](https://github.com/Fdawgs/docsmith/commit/80010760e8ad2576e8ed3d71dc2e936a51737d26))
* **routes/pdf:** use shorter syntax for `outputEncoding`regex pattern ([c8e3a05](https://github.com/Fdawgs/docsmith/commit/c8e3a05acc3d1e1dc979bf49c3f55ec75b7f80d2))


### Dependencies

* **deps-dev:** bump autocannon from 7.4.0 to 7.5.0 ([8b9a485](https://github.com/Fdawgs/docsmith/commit/8b9a4851c50b8cb00b8ce3dbce3bc61934e8f571))
* **deps-dev:** bump eslint-plugin-jest from 25.0.5 to 25.2.2 ([337cde3](https://github.com/Fdawgs/docsmith/commit/337cde365c24b96ec7d1e4d496cfba172ef7b5c2))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.1.1 to 37.0.3 ([ce08525](https://github.com/Fdawgs/docsmith/commit/ce0852558bf4a1c0aab0f731cc93330b371d06a1))
* **deps-dev:** bump eslint-plugin-promise from 5.1.0 to 5.1.1 ([b0f39d5](https://github.com/Fdawgs/docsmith/commit/b0f39d502eee2b54f807e9b729b1d11a7124b30d))
* **deps-dev:** bump husky from 7.0.2 to 7.0.4 ([9511f9b](https://github.com/Fdawgs/docsmith/commit/9511f9bbdd6c3a38f3e6007fa2fa136f6c89f2ba))
* **deps-dev:** bump jest from 27.2.5 to 27.3.1 ([2b9769d](https://github.com/Fdawgs/docsmith/commit/2b9769dfc53792e17fee0a1a5c6f3afdcceefc56))
* **deps-dev:** bump nodemon from 2.0.13 to 2.0.14 ([e6ec937](https://github.com/Fdawgs/docsmith/commit/e6ec937f45948ecc239df0158aebddca8bde85e7))
* **deps:** add secure-json-parse ([6d16dd6](https://github.com/Fdawgs/docsmith/commit/6d16dd66b41dc5143f0c19495350eb14f3791d9b))
* **deps:** bump actions/checkout from 2.3.4 to 2.3.5 ([76fa389](https://github.com/Fdawgs/docsmith/commit/76fa38930e41b8e523dd813098c9aabe4e5820b6))
* **deps:** bump fastify from 3.22.0 to 3.22.1 ([b8fa640](https://github.com/Fdawgs/docsmith/commit/b8fa640549102636ca0abb24cd6c3f965792f845))
* **deps:** bump fastify-compress from 3.6.0 to 3.6.1 ([8eff1f5](https://github.com/Fdawgs/docsmith/commit/8eff1f5be53c17e716ede87e34ce58368bd7e418))
* **deps:** bump fastify-disablecache from 2.0.3 to 2.0.4 ([e0b9ce7](https://github.com/Fdawgs/docsmith/commit/e0b9ce71f53bd35129068087c8672eb17b30b241))
* **deps:** bump fastify-floc-off from 1.0.2 to 1.0.3 ([33712c1](https://github.com/Fdawgs/docsmith/commit/33712c11f9823d8245dbbb57a7a3ba5b3a116e34))
* **deps:** bump fastify-swagger from 4.12.4 to 4.12.6 ([23eba6f](https://github.com/Fdawgs/docsmith/commit/23eba6f769a05e4755cdb8f2b2c40f1d57f858cb))
* **deps:** bump mammoth from 1.4.18 to 1.4.19 ([cd05469](https://github.com/Fdawgs/docsmith/commit/cd05469532763ebaf09ec6c36c6f0e987457c77e))
* **deps:** bump node-unrtf from 2.0.2 to 2.0.4 ([61d4a6b](https://github.com/Fdawgs/docsmith/commit/61d4a6b15d484953cca5c45c3718c81e06206bdd))
* **deps:** bump pino from 6.13.3 to 7.0.5 ([a651961](https://github.com/Fdawgs/docsmith/commit/a6519619a6765515a7effe66a73687b289392a4f))
* **deps:** bump pino-pretty from 7.0.1 to 7.1.0 ([386ff26](https://github.com/Fdawgs/docsmith/commit/386ff26721161e3cf513d206d33630270e072b44))
* update lockfile from v1 to v2; bump sub-dependencies ([#507](https://github.com/Fdawgs/docsmith/issues/507)) ([7f141b2](https://github.com/Fdawgs/docsmith/commit/7f141b24d423221e6945b4badd533c6526bebf4c))

## [5.2.0](https://github.com/Fdawgs/docsmith/compare/v5.1.3...v5.2.0) (2021-10-13)


### Features

* **plugins/tidy-html:** check `language` is valid IANA language tag ([#464](https://github.com/Fdawgs/docsmith/issues/464)) ([6894d37](https://github.com/Fdawgs/docsmith/commit/6894d3706f5203067e910c15837cfac612b1ade4))


### Bug fixes

* **plugins/pdf-to-html:** correct key name for output encoding ([10c8044](https://github.com/Fdawgs/docsmith/commit/10c8044247fdd5ced36615e6876959458611743d))
* **routes/docs:** remove cors support ([0659e47](https://github.com/Fdawgs/docsmith/commit/0659e47abb16d2341404547df4af4b9a2cbe39ed))
* **routes/pdf:** set accepted pattern for `outputEncoding` param ([#469](https://github.com/Fdawgs/docsmith/issues/469)) ([6b8f99d](https://github.com/Fdawgs/docsmith/commit/6b8f99ddeac2c0bf0b3c9f11042c169d7beb0be2))


### Documentation

* **readme:** capitalization fixes ([b080016](https://github.com/Fdawgs/docsmith/commit/b0800161cb3bbd3fc9de01ad2285241916b658ea))


### Miscellaneous

* **.eslintrc:** remove inaccurate sourcetype ([#467](https://github.com/Fdawgs/docsmith/issues/467)) ([3709cc2](https://github.com/Fdawgs/docsmith/commit/3709cc2dd2d5dea9f5456cda8f2266c02c2c95c6))
* **.vscode:** remove deprecated settings ([c0dfc77](https://github.com/Fdawgs/docsmith/commit/c0dfc7744c51630170a71004b7b8d9f572d02ca2))
* apply eslint rules per line, not file-wide ([7596c3b](https://github.com/Fdawgs/docsmith/commit/7596c3b0463fc8d81ce8986402876114af29c654))
* **routes/schemas:** improve `removeAlt` param description ([#465](https://github.com/Fdawgs/docsmith/issues/465)) ([323b316](https://github.com/Fdawgs/docsmith/commit/323b316b3ae0967fb226babfc358443e8d3c44f6))
* **routes:** add missing jsdoc tag for `options.bearertokenauthkeys` ([9bacd41](https://github.com/Fdawgs/docsmith/commit/9bacd415dd26a71f79c65561179c4dcb26d21da5))
* **server:** update inline comment re clickjacking ([9adb742](https://github.com/Fdawgs/docsmith/commit/9adb7427af20079fb802aa6a7f442c22c212459f))


### Improvements

* **plugins:** make temp file removal hooks concurrent ([0055f15](https://github.com/Fdawgs/docsmith/commit/0055f152f7b672771ccf51f2d8c8a3f5d807d42c))
* **plugins:** remove redundant `await`s ([70675a9](https://github.com/Fdawgs/docsmith/commit/70675a9a4af1cae3863b5f6a2b623ef1c6c5fbe8))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.2.0 to 13.2.1 ([1a2ab1c](https://github.com/Fdawgs/docsmith/commit/1a2ab1cc362ecb908e068d1bc0f7c76a9fe8dc9f))
* **deps-dev:** bump eslint-plugin-import from 2.24.2 to 2.25.2 ([a3faf64](https://github.com/Fdawgs/docsmith/commit/a3faf6462aa00842cbb8174cee3a467eb794145d))
* **deps-dev:** bump eslint-plugin-jest from 24.5.2 to 25.0.5 ([33fd43b](https://github.com/Fdawgs/docsmith/commit/33fd43bfaa8239280cc9544902250f5b24542201))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.1.0 to 36.1.1 ([f47090b](https://github.com/Fdawgs/docsmith/commit/f47090b32abb0121ce995f48bc552e11c70dbe67))
* **deps-dev:** bump jest from 27.2.4 to 27.2.5 ([4002ef2](https://github.com/Fdawgs/docsmith/commit/4002ef2c21c04a2ae04b240b161cfe53255416bf))
* **deps:** bump fastify-static from 4.2.4 to 4.4.1 ([c9cc5d0](https://github.com/Fdawgs/docsmith/commit/c9cc5d0d6b586680ba4544512a7b29d738dc4bde))
* **deps:** bump fastify-static from 4.4.1 to 4.4.2 ([1222b4b](https://github.com/Fdawgs/docsmith/commit/1222b4b42d3b5c7cd879f3675a0fea29a7b036c8))
* **deps:** bump jsdom from 17.0.0 to 18.0.0 ([f520183](https://github.com/Fdawgs/docsmith/commit/f5201839292e847a87726cfa8bfa578047437a7b))
* **deps:** bump node-poppler from 5.0.1 to 5.0.2 ([e396b03](https://github.com/Fdawgs/docsmith/commit/e396b035bc1802888d230fde254d5ec66acbf948))
* **deps:** bump redoc from 2.0.0-rc.56 to 2.0.0-rc.57 ([7fd5224](https://github.com/Fdawgs/docsmith/commit/7fd522499063d6c5eb97b3b9b5077112570ce2de))
* **deps:** bump wagoid/commitlint-github-action from 4.1.5 to 4.1.9 ([504d15a](https://github.com/Fdawgs/docsmith/commit/504d15a12209da429500bd4c26d567fb2fa5084d))

### [5.1.3](https://github.com/Fdawgs/docsmith/compare/v5.1.2...v5.1.3) (2021-10-06)


### Bug fixes

* **routes/docs/json:** add missing cache-control header ([579776d](https://github.com/Fdawgs/docsmith/commit/579776dc5f27078ca5fc9166c45126afe4379a99))


### Documentation

* **readme:** add note regarding using `docker compose up` ([5ff789b](https://github.com/Fdawgs/docsmith/commit/5ff789ba89df7f46e938fe66f7db7c78ece4cbb3))


### Dependencies

* **deps-dev:** bump eslint-plugin-jest from 24.5.0 to 24.5.2 ([0650841](https://github.com/Fdawgs/docsmith/commit/06508418d7da5360b197a28b82ce1bea92c515b6))
* **deps:** bump fastify-static from 4.2.3 to 4.2.4 ([d737a22](https://github.com/Fdawgs/docsmith/commit/d737a22af214d39c34844b498a2d9f249e0214b9))
* **deps:** bump fastify-swagger from 4.12.3 to 4.12.4 ([975a911](https://github.com/Fdawgs/docsmith/commit/975a9117bf2d5736e05a709955b740b8a95a6d15))
* **deps:** bump GoogleCloudPlatform/release-please-action ([6ed3150](https://github.com/Fdawgs/docsmith/commit/6ed315093735c5a471ccd0db07b0238a77997222))
* **deps:** bump hadolint/hadolint-action from 1.5.0 to 1.6.0 ([1646d61](https://github.com/Fdawgs/docsmith/commit/1646d618cd6a82eb1e168c7f9fbf67b769ea7599))
* **deps:** bump under-pressure from 5.7.0 to 5.8.0 ([7d6f7da](https://github.com/Fdawgs/docsmith/commit/7d6f7dae697a6edfe3e6f3eb7216b0454aad62d7))
* **deps:** bump wagoid/commitlint-github-action from 4.1.4 to 4.1.5 ([3a9dbb7](https://github.com/Fdawgs/docsmith/commit/3a9dbb7c2d4591d3139469b5ea5360ec5e8b11df))
* **docker:** update image from lts-stretch-slim to lts-bullseye-slim ([b6aead9](https://github.com/Fdawgs/docsmith/commit/b6aead9490638464b15f67545b71b66144d117ea))


### Improvements

* **public/docs:** move css from inline to own file ([#463](https://github.com/Fdawgs/docsmith/issues/463)) ([806cfcc](https://github.com/Fdawgs/docsmith/commit/806cfcc38449ac7786ed3f73a86db07d8da78bd7))
* **routes/docs:** allow for html to be cached for 3 minutes ([877dc91](https://github.com/Fdawgs/docsmith/commit/877dc916f0b2d8e4c6db24eb97671148152661c0))
* **server:** allow for redoc js to be cached for 1 day ([29818e1](https://github.com/Fdawgs/docsmith/commit/29818e12935b34c42348132cf16538b36af234a9))
* **server:** use aggressive caching for static files ([bec9208](https://github.com/Fdawgs/docsmith/commit/bec9208baf3118965aeec40ef9c88b706bab8b32))

### [5.1.2](https://github.com/Fdawgs/docsmith/compare/v5.1.1...v5.1.2) (2021-10-01)


### Improvements

* **plugins/tidy-html:** move conditional check outside of loop ([#435](https://github.com/Fdawgs/docsmith/issues/435)) ([90e3fbe](https://github.com/Fdawgs/docsmith/commit/90e3fbeeb73e007b8780d42670c7a0b6dce5bf80))
* **routes:** move cors options route config to config file ([476875d](https://github.com/Fdawgs/docsmith/commit/476875d607c5baa630c1a0ccb1b1590d10d15a59))
* **server:** exclude all html and xml responses from transform ([#440](https://github.com/Fdawgs/docsmith/issues/440)) ([1c8b776](https://github.com/Fdawgs/docsmith/commit/1c8b776f6030a9431ce132ffe9e5950861f678a4))
* **server:** move helmet config to config file ([e42160b](https://github.com/Fdawgs/docsmith/commit/e42160bb8db7eeaf2aad88da3b2c4cb8107b2b62))
* **server:** reduce globbing use when registering routes ([#438](https://github.com/Fdawgs/docsmith/issues/438)) ([7fba268](https://github.com/Fdawgs/docsmith/commit/7fba26826ae88fa2b78f26aa077eb7a677326b8b))
* **server:** reduce response header size ([a1f3502](https://github.com/Fdawgs/docsmith/commit/a1f3502b73368aa479c716ed956f9e9829f52283))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 13.1.0 to 13.2.0 ([8f36842](https://github.com/Fdawgs/docsmith/commit/8f36842c17df464ae40a7f2fda067a2ac4e06268))
* **deps-dev:** bump @commitlint/config-conventional ([37aa6af](https://github.com/Fdawgs/docsmith/commit/37aa6af724b9b83a30f5bfaf9c910fa36fff2196))
* **deps-dev:** bump eslint-plugin-jest from 24.4.2 to 24.5.0 ([985e4ae](https://github.com/Fdawgs/docsmith/commit/985e4aeae941e8016ddbcf612136887739eb57f8))
* **deps-dev:** bump jest from 27.2.1 to 27.2.4 ([5aa3566](https://github.com/Fdawgs/docsmith/commit/5aa3566232fa5dbd2c8f9448848e43c3155587d1))
* **deps:** bump actions/github-script from 4.1 to 5 ([5492181](https://github.com/Fdawgs/docsmith/commit/5492181a01b0abf7fcfb3fe8ae0992b4570d678f))
* **deps:** bump actions/setup-node from 2.4.0 to 2.4.1 ([a1d5be8](https://github.com/Fdawgs/docsmith/commit/a1d5be890068ce0ed29abbe2851bc141d67bd807))
* **deps:** bump fastify from 3.21.6 to 3.22.0 ([92ffb00](https://github.com/Fdawgs/docsmith/commit/92ffb0059bb6eb1e9bccea09cb76b68807cb7e3d))
* **deps:** bump fastify-swagger from 4.12.0 to 4.12.3 ([d961c9b](https://github.com/Fdawgs/docsmith/commit/d961c9bc64d5cc28b250a08f0bc3af2d72ce94dc))
* **docker:** remove package versioning ([e1ebc61](https://github.com/Fdawgs/docsmith/commit/e1ebc6189939f4d75a11919b274b19dcb7a32778))


### Continuous integration

* **automerge:** update location of octokit rest methods ([#449](https://github.com/Fdawgs/docsmith/issues/449)) ([5b46430](https://github.com/Fdawgs/docsmith/commit/5b464308f1bf908005c8a728de75e59c2bd61eb4))
* ignore hadolint rule DL3008 ([cadb6c0](https://github.com/Fdawgs/docsmith/commit/cadb6c093dbc520bb63b26172ada79dbff16e013))
* update hadolint-action namespace ([710f044](https://github.com/Fdawgs/docsmith/commit/710f0441cf6fdede132d9d01d9f4645078d86a1b))


### Miscellaneous

* **.prettierrc:** enable `bracketsameline` option ([#451](https://github.com/Fdawgs/docsmith/issues/451)) ([29fc16b](https://github.com/Fdawgs/docsmith/commit/29fc16b28f5b805188bd27b84942739c4a677b2d))
* **config:** remove whitespace ([7866add](https://github.com/Fdawgs/docsmith/commit/7866add17458ee877c67e6ce4c3194d2a8b04c08))
* improve descriptions of query string params ([e1c586f](https://github.com/Fdawgs/docsmith/commit/e1c586f4ab9cdc3f3ad9482d7ef81f0f15a57bbf))
* **package:** add separate script for benchmarking /pdf/txt route ([62c7f54](https://github.com/Fdawgs/docsmith/commit/62c7f54b3c5c523ea7f4efed2ac58cfed26652c8))
* **plugins/tidy-css:** sort jsdoc param tags alphabetically ascending ([57bdd52](https://github.com/Fdawgs/docsmith/commit/57bdd52d05f9f973f4786e7126f36b02f102df58))
* tidy inline comments re plugins ([8f1eaa1](https://github.com/Fdawgs/docsmith/commit/8f1eaa1794bea0d88bad156e1c9e495cc5c8ed07))

### [5.1.1](https://github.com/Fdawgs/docsmith/compare/v5.1.0...v5.1.1) (2021-09-24)


### Bug fixes

* **plugins/docx-to-txt:** add missing content-type response header ([85f39bf](https://github.com/Fdawgs/docsmith/commit/85f39bfee8bce8f0929b31d12a56534b6fb96786))
* **public/site.webmanifest:** set name values ([255fbf6](https://github.com/Fdawgs/docsmith/commit/255fbf6579f1038cca0fab7cd08e15b02f189efa))
* **routes/docs:** add missing content-type response header ([ed5daa8](https://github.com/Fdawgs/docsmith/commit/ed5daa8747ca536b97a1dfa1da667a543c7c4dac))


### Miscellaneous

* **.env.template:** document `SERVICE_HOST` default ([#416](https://github.com/Fdawgs/docsmith/issues/416)) ([d12a589](https://github.com/Fdawgs/docsmith/commit/d12a58945e3c10f7a048b5fbb63750a659e9957c))
* **plugins/tidy-css:** add inline comment regarding legacy css ([49ee2fc](https://github.com/Fdawgs/docsmith/commit/49ee2fc64e5a56c08934aa84ef33507cdd8a4b7b))
* **plugins:** remove outdated eslint comments ([#420](https://github.com/Fdawgs/docsmith/issues/420)) ([69b8834](https://github.com/Fdawgs/docsmith/commit/69b883447e3818b4487d73174e08ff32857a659f))
* **public/docs:** add `-moz-tab-size` css property ([3cb595f](https://github.com/Fdawgs/docsmith/commit/3cb595f611932b3faddb6d095e763b50ff089299))
* **public:** move icons from public/ to public/images/icons ([e9fec86](https://github.com/Fdawgs/docsmith/commit/e9fec86d12029421f945d53f1ce795efed3aa95d))
* **routes:** remove trailing punctuation mark ([db8a81d](https://github.com/Fdawgs/docsmith/commit/db8a81d61512b36973afaaf0326f3f468ae9b8cf))
* **server:** update inline comments re child contexts ([026d096](https://github.com/Fdawgs/docsmith/commit/026d09692f602f26803fb0947a989dab89ae15d9))


### Improvements

* **plugins/tidy-css:** remove param reassign ([#419](https://github.com/Fdawgs/docsmith/issues/419)) ([88f8be0](https://github.com/Fdawgs/docsmith/commit/88f8be0d8cc32189f0161e8c7e4f1d9cceb397bb))
* **public/docs:** defer redoc script loading ([3419d7d](https://github.com/Fdawgs/docsmith/commit/3419d7d2da7c76b61b5db03322287308bc33406d))
* **routes/docs:** enable caching of static files ([43bdc8c](https://github.com/Fdawgs/docsmith/commit/43bdc8c433d121b21f848dc24c9d74fe7242a8fd))
* **server:** move loading of static files into public context ([2619f44](https://github.com/Fdawgs/docsmith/commit/2619f445f1a166938521a03a374b869ac88dcfef))


### Dependencies

* **deps-dev:** add eslint-plugin-security-node ([#421](https://github.com/Fdawgs/docsmith/issues/421)) ([cfc9dcb](https://github.com/Fdawgs/docsmith/commit/cfc9dcb7c4508b6b8274869d1bddac332a1547c8))
* **deps-dev:** bump eslint-plugin-jest from 24.4.0 to 24.4.2 ([e974cea](https://github.com/Fdawgs/docsmith/commit/e974cea559477ae2f9bba3619ea5da11d5626665))
* **deps-dev:** bump jest from 27.2.0 to 27.2.1 ([b969894](https://github.com/Fdawgs/docsmith/commit/b969894ffbcb1f3c9e231961a0ffbb14a2c8a3aa))
* **deps-dev:** bump nodemon from 2.0.12 to 2.0.13 ([1b462b8](https://github.com/Fdawgs/docsmith/commit/1b462b89e2954c54401b880eb83f25e5848b6b13))
* **deps-dev:** bump prettier from 2.4.0 to 2.4.1 ([b50f729](https://github.com/Fdawgs/docsmith/commit/b50f729d2e47f8cf2216b5e6ef4561c190a3697b))
* **deps:** bump fastify from 3.21.1 to 3.21.6 ([c6b6422](https://github.com/Fdawgs/docsmith/commit/c6b6422a92b436297cc4585d75e46eb3b81f93f8))
* **deps:** bump fastify-accepts from 2.0.1 to 2.1.0 ([8a90978](https://github.com/Fdawgs/docsmith/commit/8a90978e81d38636f0bc2c275c9bcd1495830db0))
* **deps:** bump glob from 7.1.7 to 7.2.0 ([16ec020](https://github.com/Fdawgs/docsmith/commit/16ec020ae9b3d29c33ec5cee7546e13ed3cbb4c3))
* **deps:** bump GoogleCloudPlatform/release-please-action ([431bcff](https://github.com/Fdawgs/docsmith/commit/431bcfff7d7bc199a7d1ccb5e83633e7a1f2901f))
* **deps:** bump pino from 6.13.2 to 6.13.3 ([61508db](https://github.com/Fdawgs/docsmith/commit/61508dbfd474c24aacbf71aee62c65bfbc60c0fa))
* **deps:** bump pino-pretty from 7.0.0 to 7.0.1 ([19fa351](https://github.com/Fdawgs/docsmith/commit/19fa35101cce4205da8c04229920a5f6274c7999))
* **deps:** bump prismjs from 1.24.1 to 1.25.0 ([9b24fd8](https://github.com/Fdawgs/docsmith/commit/9b24fd8519a98a4b59e12fc9b1592674476e2165))

## [5.1.0](https://github.com/Fdawgs/docsmith/compare/v5.0.1...v5.1.0) (2021-09-15)


### Features

* **config:** support HTTP/2 via `HTTPS_HTTP2_ENABLED` env variable ([#400](https://github.com/Fdawgs/docsmith/issues/400)) ([17207dc](https://github.com/Fdawgs/docsmith/commit/17207dc8041a25f58273eb62b62973f4dc12dce3))


### Miscellaneous

* **.dockerignore:** ignore development documentation ([988019a](https://github.com/Fdawgs/docsmith/commit/988019aa2bfe2e42d1e4a3de03976ae11fa2df0e))
* **.env.template:** correct acronym ([0f0ee2e](https://github.com/Fdawgs/docsmith/commit/0f0ee2eb788665a80fe0efc880647f19061ec6dc))
* **.husky/.gitignore:** remove now redundant file ([00c55df](https://github.com/Fdawgs/docsmith/commit/00c55dfdc6f22ab878a0e50af92c003c6699ec43))
* **.vscode:** add `mhutchie.git-graph` extension ([#397](https://github.com/Fdawgs/docsmith/issues/397)) ([873c020](https://github.com/Fdawgs/docsmith/commit/873c020ea4efdc7c82f878cdaa2e3a1134861535))


### Improvements

* **config:** check cert/key exists before enabling HTTP/2 ([#402](https://github.com/Fdawgs/docsmith/issues/402)) ([2bf4122](https://github.com/Fdawgs/docsmith/commit/2bf41225560e5d1030bd97ee294b420bb68a9c0d))
* **plugins:** file deletion hooks now async ([#403](https://github.com/Fdawgs/docsmith/issues/403)) ([6a27104](https://github.com/Fdawgs/docsmith/commit/6a27104ae18f3624da29fb758b9e20988c957f7b))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.8 to 36.1.0 ([8a8a200](https://github.com/Fdawgs/docsmith/commit/8a8a200a3e6820b553b3ede68f87d54b2dfad9f3))
* **deps-dev:** bump jest from 27.1.0 to 27.2.0 ([20ab1d2](https://github.com/Fdawgs/docsmith/commit/20ab1d2c5ee4e3f86994fd3bdb4f93122e4c5aad))
* **deps-dev:** bump prettier from 2.3.2 to 2.4.0 ([1d44b16](https://github.com/Fdawgs/docsmith/commit/1d44b162ce4fac3a420e34a8cdd3e387a6b6df3d))
* **deps:** bump env-schema from 3.3.0 to 3.4.0 ([bf41828](https://github.com/Fdawgs/docsmith/commit/bf4182896eca0292d961bc1eafc932754656c3ef))
* **deps:** bump fastify from 3.21.0 to 3.21.1 ([583bbcf](https://github.com/Fdawgs/docsmith/commit/583bbcfd9d8b1a1fba7ddd6d2e44eeace8869af8))
* **deps:** bump fastify-autoload from 3.8.1 to 3.9.0 ([e86ea63](https://github.com/Fdawgs/docsmith/commit/e86ea6310e15c52bf5ea85ac6fff7b9f21033f8c))
* **deps:** bump fastify-swagger from 4.10.0 to 4.12.0 ([6503a8b](https://github.com/Fdawgs/docsmith/commit/6503a8b1f767d74f700eb91c693db8198c24cc37))
* **deps:** bump GoogleCloudPlatform/release-please-action ([ea33e69](https://github.com/Fdawgs/docsmith/commit/ea33e6963729800007aadd36e6f411a3c42adb6c))
* **deps:** bump node-poppler from 5.0.0 to 5.0.1 ([aa29d3f](https://github.com/Fdawgs/docsmith/commit/aa29d3f7304fd2ae1ba064850df7f0da6e2d3dfc))
* **deps:** bump pino-pretty from 6.0.0 to 7.0.0 ([08e6e95](https://github.com/Fdawgs/docsmith/commit/08e6e95ca8abadaa9d09504e5b205bc3e1cad4fc))
* **deps:** bump sub-dependencies ([#415](https://github.com/Fdawgs/docsmith/issues/415)) ([54f92be](https://github.com/Fdawgs/docsmith/commit/54f92be27f92712952541037adc41fc5bbb4da7b))
* **deps:** bump wagoid/commitlint-github-action from 4.1.1 to 4.1.4 ([5803732](https://github.com/Fdawgs/docsmith/commit/5803732097903aaab4b7dc29a7f28a8d4d5a9c99))

### [5.0.1](https://github.com/Fdawgs/docsmith/compare/v5.0.0...v5.0.1) (2021-09-07)


### Bug fixes

* **plugins/pdf-to-txt:** remove test code ([eb5699e](https://github.com/Fdawgs/docsmith/commit/eb5699e66d78d8943cc1fb04694e79e454a017cb))

## [5.0.0](https://github.com/Fdawgs/docsmith/compare/v4.2.0...v5.0.0) (2021-09-07)


### ⚠ BREAKING CHANGES

* **config:** `OCR_ENABLED` environment variable now defaults to false. Lower spec servers were struggling to run with the defaults, due to how CPU intensive Tesseract OCR workers are.

### Bug fixes

* **config:** `OCR_ENABLED` defaults to false ([a3d1036](https://github.com/Fdawgs/docsmith/commit/a3d10362c9334388a864ee14467d7e71a410b904))
* **plugins:** use `onSend` hook to remove files for all requests ([#395](https://github.com/Fdawgs/docsmith/issues/395)) ([703faef](https://github.com/Fdawgs/docsmith/commit/703faef214e6e12eb59dafa1a514639211ff5ca3))


### Dependencies

* **deps:** bump fastify from 3.20.2 to 3.21.0 ([c43f2f7](https://github.com/Fdawgs/docsmith/commit/c43f2f7816e7ba449f957db93ac8725022a2ee28))
* **deps:** bump fastify-swagger from 4.9.1 to 4.10.0 ([072b423](https://github.com/Fdawgs/docsmith/commit/072b42343ec7235f4817c56f176c0aba5b892a51))
* **deps:** bump pino from 6.13.1 to 6.13.2 ([1901568](https://github.com/Fdawgs/docsmith/commit/19015683c0c47453002cf0af1b069a2fc523bed3))


### Miscellaneous

* **.env.template:** add note regarding ocr functionality ([ced63f7](https://github.com/Fdawgs/docsmith/commit/ced63f70aefea6a5d9ba06406186df74fc6de5b7))
* **.prettierrc:** override defaults for html, css, and scss files ([#388](https://github.com/Fdawgs/docsmith/issues/388)) ([492a5e2](https://github.com/Fdawgs/docsmith/commit/492a5e26804b67c836aaab4e48663deab29497f5))
* **routes/pdf/txt:** emphasise resource intensiveness of ocr param ([1ae51ef](https://github.com/Fdawgs/docsmith/commit/1ae51efeedb4d021a3a4a4bb4d8de802b987fda4))

## [4.2.0](https://github.com/Fdawgs/docsmith/compare/v4.1.0...v4.2.0) (2021-09-06)


### Features

* **config:** add option to set `Access-Control-Max-Age` CORS header ([#377](https://github.com/Fdawgs/docsmith/issues/377)) ([b86846c](https://github.com/Fdawgs/docsmith/commit/b86846c851f3532c2c28e2efe707f7a6962567ff))


### Bug fixes

* **server:** rate limit all 4xx and 5xx responses ([6183f4a](https://github.com/Fdawgs/docsmith/commit/6183f4af37f854cc5e2d2dac17be882e11f35288))


### Miscellaneous

* **.env.template:** clarify on HTTPS usage ([3f370d9](https://github.com/Fdawgs/docsmith/commit/3f370d9410e90ee02de41bdb1af56a806f5ab537))
* **.env.template:** remove log level value ([02ba292](https://github.com/Fdawgs/docsmith/commit/02ba292f4538dd6fd6953b14788ce930c8fe115a))
* **.env.template:** remove rate limit value ([5cfe08d](https://github.com/Fdawgs/docsmith/commit/5cfe08d2d76f25b4be6c3ff9d0c35d0e92bb8e1e))
* **.github:** fix label casing ([0a37d54](https://github.com/Fdawgs/docsmith/commit/0a37d54af5f091dfe0fc82af8fd94e9721f14183))
* **.github:** fix missing label ([99c9a85](https://github.com/Fdawgs/docsmith/commit/99c9a8581c4b077fd439233948f6777b7edf44a1))
* **.github:** sort examples alphabetically ascending ([04680aa](https://github.com/Fdawgs/docsmith/commit/04680aa6939df77321b8f2c9915e3fefbf2a5f79))
* **.github:** use new YAML configured GitHub issue forms ([#380](https://github.com/Fdawgs/docsmith/issues/380)) ([75d3d1c](https://github.com/Fdawgs/docsmith/commit/75d3d1c6c72d4b7c9e76a7f8c5d81608931e7548))


### Continuous integration

* **ci:** replace workflow-run-cleanup-action with github concurrency ([#381](https://github.com/Fdawgs/docsmith/issues/381)) ([e7b63d7](https://github.com/Fdawgs/docsmith/commit/e7b63d71f31713a7960f8bfad92655e344121eb0))


### Improvements

* **public:** compress images ([#382](https://github.com/Fdawgs/docsmith/issues/382)) ([1410659](https://github.com/Fdawgs/docsmith/commit/1410659095d8f8769d2561146d49300244daac8c))


### Dependencies

* **deps:** bump fastify-disablecache from 2.0.2 to 2.0.3 ([5613806](https://github.com/Fdawgs/docsmith/commit/561380643683a0044da3d90480df7cd661ab0195))
* **deps:** bump fastify-floc-off from 1.0.1 to 1.0.2 ([70f2cd4](https://github.com/Fdawgs/docsmith/commit/70f2cd45261aa0d87d634576267f401a6234c952))
* **deps:** bump node-poppler from 4.1.2 to 5.0.0 ([daeee9e](https://github.com/Fdawgs/docsmith/commit/daeee9e6704089b21d24c390123444d8ad67ea11))
* **deps:** bump node-unrtf from 2.0.1 to 2.0.2 ([e830ac4](https://github.com/Fdawgs/docsmith/commit/e830ac411d1d689e0ebd274d37167a09c2d1ffaa))

## [4.1.0](https://github.com/Fdawgs/docsmith/compare/v4.0.0...v4.1.0) (2021-09-01)


### Features

* **routes/docs:** replace swagger ui with redoc ui ([43faf18](https://github.com/Fdawgs/docsmith/commit/43faf18684faa752b7b0032e8c7b515400882fd6))


### Bug fixes

* add 400 and 415 responses to shared schema ([d4954df](https://github.com/Fdawgs/docsmith/commit/d4954df981dc12673e9fd049b4ed29ee6bf8953a))
* **config:** bearer token security scheme format ([33b05d2](https://github.com/Fdawgs/docsmith/commit/33b05d266fb2b492ff5e2550a5b5a44168269434))
* **plugins:** use optional chaining for `onResponse` hooks ([4b74c29](https://github.com/Fdawgs/docsmith/commit/4b74c297d631aed82c0b435dfc8ecaf5b646b59c))
* **server:** rate-limiting not affecting 406 responses ([06ec636](https://github.com/Fdawgs/docsmith/commit/06ec636ecbbd9762f73666775bbfb6fd01ead30e))
* **server:** standardise 401 response schema ([5009d86](https://github.com/Fdawgs/docsmith/commit/5009d864494bb731b3ec882dec18297b3bd8743f))


### Documentation

* **readme:** add note regarding log retention for nhs digital ([a239ce8](https://github.com/Fdawgs/docsmith/commit/a239ce870d022da2eee918ca0862041a52ed2f22))
* **readme:** sort example env variables alphabetically ascending ([00faa0f](https://github.com/Fdawgs/docsmith/commit/00faa0f9f72b0ad18832d358a90151ff632dc356))


### Improvements

* **plugins/shared-schemas:** move response schemas to plugin ([b51b720](https://github.com/Fdawgs/docsmith/commit/b51b720c3e4614585424f78cf5c545290a1e0d6f))


### Miscellaneous

* **config:** remove excess word in inline comment ([a409a53](https://github.com/Fdawgs/docsmith/commit/a409a53ed4c2ce1621f7eefc791d30069ab2ae52))
* **routes:** revise summaries and descriptions ([b5937d1](https://github.com/Fdawgs/docsmith/commit/b5937d19948d4feb6fd941e0d1fc689beef794e8))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.24.0 to 2.24.2 ([169a64f](https://github.com/Fdawgs/docsmith/commit/169a64f889c4e9d710bd0453e4ed50cf76966f10))
* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.7 to 36.0.8 ([ea7ccdf](https://github.com/Fdawgs/docsmith/commit/ea7ccdf49dea4386377e4e00974623deb493a22b))
* **deps-dev:** bump husky from 7.0.1 to 7.0.2 ([6b8365f](https://github.com/Fdawgs/docsmith/commit/6b8365f38da0bad7340e201c2a1dbcbd4e57f1c5))
* **deps-dev:** bump jest from 27.0.6 to 27.1.0 ([8af4ade](https://github.com/Fdawgs/docsmith/commit/8af4ade64cdc1d0c883454ad75abcb5e35cf0029))
* **deps:** add fastify-static ([57e592b](https://github.com/Fdawgs/docsmith/commit/57e592baad8ff513719d1c55624c78ef32019327))
* **deps:** add redoc ([82f81e4](https://github.com/Fdawgs/docsmith/commit/82f81e4762b22ea80db802088af6c46c459b45b4))
* **deps:** bump actions/github-script from 4.0.2 to 4.1 ([1e7d296](https://github.com/Fdawgs/docsmith/commit/1e7d296b70c0c87ea02e03cf02971a52aea269b5))
* **deps:** bump fastify-autoload from 3.8.0 to 3.8.1 ([cf7bf98](https://github.com/Fdawgs/docsmith/commit/cf7bf985fbaf7af9f85e50e49c9ba3a114ebe55a))
* **deps:** bump fastify-rate-limit from 5.6.0 to 5.6.2 ([27d013c](https://github.com/Fdawgs/docsmith/commit/27d013c8f4763452eea53560e99f2295cc0d2ccb))
* **deps:** bump fastify-swagger from 4.8.4 to 4.9.1 ([2928879](https://github.com/Fdawgs/docsmith/commit/29288793d54d270cd50bc9973892f114eb18a64e))
* **deps:** bump mammoth from 1.4.17 to 1.4.18 ([1ebc5ac](https://github.com/Fdawgs/docsmith/commit/1ebc5ac04f6043513cb5508aa89d487cba1125cf))
* **deps:** bump node-poppler from 4.1.1 to 4.1.2 ([3e4f63e](https://github.com/Fdawgs/docsmith/commit/3e4f63e1ec6dca1063dfaea49a5429b5a55af8e2))
* **deps:** bump pino from 6.13.0 to 6.13.1 ([38e4c1b](https://github.com/Fdawgs/docsmith/commit/38e4c1be353fa4f6faf853ed4f8c1f55b83abcd1))
* **deps:** bump pino-pretty from 5.1.3 to 6.0.0 ([5c42f32](https://github.com/Fdawgs/docsmith/commit/5c42f327d48687f38b19b22af122382f85387499))

## [4.0.0](https://github.com/Fdawgs/docsmith/compare/v3.1.0...v4.0.0) (2021-08-17)


### ⚠ BREAKING CHANGES

* **routes:** `/healthcheck` moved to `/admin/healthcheck`

### Features

* **routes/docx/html:** add `language` query string param ([befbe1f](https://github.com/Fdawgs/docsmith/commit/befbe1fcd2d49fe352d4ca6b707c6ea3d6fe1035))
* **routes/pdf/html:** add `language` query string param ([baf74c7](https://github.com/Fdawgs/docsmith/commit/baf74c7e3dcf8caa352061a9a4c7fecc003b0763))
* **routes/rtf/html:** add `language` query string param ([db783d8](https://github.com/Fdawgs/docsmith/commit/db783d846edb205bf2a9859a6ba71809b48da6fe))


### Bug fixes

* **app:** logging grammar fixes ([31e6f26](https://github.com/Fdawgs/docsmith/commit/31e6f2659d6e2d05611d289d78f224f72eac4c6a))
* **config:** allow for empty logger env variables ([b3d3567](https://github.com/Fdawgs/docsmith/commit/b3d35678c2a5fc6f4e7e5e4df6e9599f42e831ce))
* **config:** defaults for undeclared variables ([737e0b2](https://github.com/Fdawgs/docsmith/commit/737e0b290f57217c801716ea286d57597e6b79d9))
* **routes/docx/html:** restrict strings accepted in query string params ([880f1f9](https://github.com/Fdawgs/docsmith/commit/880f1f99d03e2cf46e66a8c04f944afad03a2402))
* **routes/pdf/html:** restrict strings accepted in query string params ([248b96f](https://github.com/Fdawgs/docsmith/commit/248b96f104259355f7a1e64344807b849dd9b5af))
* **routes/rtf/html:** restrict strings accepted in query string params ([19292ef](https://github.com/Fdawgs/docsmith/commit/19292efeabdd24831d96c928447f18fea5f2bf77))


### Improvements

* **config:** consolidate logger pretty print conditional ([6682344](https://github.com/Fdawgs/docsmith/commit/668234499ce83a68c36346d0f5515cd1b61af786))
* **config:** consolidate tesseract conditional ([6ed41c9](https://github.com/Fdawgs/docsmith/commit/6ed41c94716b713e861666a12b6e144297eb29ac))
* replace `http-errors` with `fastify-sensible` plugin ([e5b8578](https://github.com/Fdawgs/docsmith/commit/e5b857840b7d691a5a6307cc4659a73725713255))
* **routes:** `/healthcheck` moved to `/admin/healthcheck` ([c91bf23](https://github.com/Fdawgs/docsmith/commit/c91bf235b37402a1aea682db2e1dc206753b7077))


### Miscellaneous

* **env:** document default logger values ([6d340c5](https://github.com/Fdawgs/docsmith/commit/6d340c5da49c6c4121e85e96cf4d23c1a06ce5ce))
* **env:** standardise, sort, and group env variables ([72f86f1](https://github.com/Fdawgs/docsmith/commit/72f86f1170c79d65f0ae4c7f04929a5db8c9fd1e))
* **package:** update description ([#343](https://github.com/Fdawgs/docsmith/issues/343)) ([d5d9b38](https://github.com/Fdawgs/docsmith/commit/d5d9b38ed9426f64dde9c228e8ae25d840987f66))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 36.0.6 to 36.0.7 ([a6f29c9](https://github.com/Fdawgs/docsmith/commit/a6f29c9247a22ae77be8a985d33fc7257bedd217))
* **deps:** bump env-schema from 3.2.0 to 3.3.0 ([d7b8156](https://github.com/Fdawgs/docsmith/commit/d7b8156b024b440c22d166d034a42090d96b4acb))
* **deps:** bump fastify from 3.20.1 to 3.20.2 ([df203e4](https://github.com/Fdawgs/docsmith/commit/df203e4a7fe7ef5c73d6cd96682597a05cc8f488))
* **deps:** bump jsdom from 16.7.0 to 17.0.0 ([d149b72](https://github.com/Fdawgs/docsmith/commit/d149b72bc08875ce40b4070d73329f0e4ec62629))
* **deps:** bump pino-pretty from 5.1.2 to 5.1.3 ([886f5f9](https://github.com/Fdawgs/docsmith/commit/886f5f9d69532441ae14a85540533ac9532788e1))
* **docker:** bump curl from 7.52.1+deb9u14 to 7.52.1+deb9u15 ([7283bba](https://github.com/Fdawgs/docsmith/commit/7283bba2eee592560f13d34da185dc3188db9b40))

## [3.1.0](https://github.com/Fdawgs/docsmith/compare/v3.0.0...v3.1.0) (2021-08-09)


### Features

* **routes/docx/html:** support more query string params ([60b56b9](https://github.com/Fdawgs/docsmith/commit/60b56b9675150701603ba3b040a7c9421e3613dd))
* **routes/docx/html:** support removealt query string param ([72017a8](https://github.com/Fdawgs/docsmith/commit/72017a80f6a1a8e2b47790ecc69c2007e876b6f0))
* **routes/healthcheck:** add cors header support ([3f0b9b7](https://github.com/Fdawgs/docsmith/commit/3f0b9b76d88570b8824726ab1aa3a50b065ddcd9))
* **routes:** add docx-to-html route ([98f4e64](https://github.com/Fdawgs/docsmith/commit/98f4e643e9db6b260337d2e3ec0ea3ea61f5c817))
* **routes:** add docx-to-txt route ([25a01b4](https://github.com/Fdawgs/docsmith/commit/25a01b4ce966f38731dc9879fe7b6f1f1e815a5c))


### Bug fixes

* **plugins/docx-to-html:** set content-type meta; fix utf-8 ([1bccb7b](https://github.com/Fdawgs/docsmith/commit/1bccb7b885ed2773482e12c38962c4708908f3be))


### Improvements

* **plugins/pdf:** lowercase charset in content-type res header ([38809e1](https://github.com/Fdawgs/docsmith/commit/38809e14255acef8bf55050852f4fb2976ab9978))
* **plugins/tidy-html:** convert string param to object ([2f863df](https://github.com/Fdawgs/docsmith/commit/2f863df20a6dad776e6a7150b02e2fc8dc190903))
* **plugins:** move alt attribute manipulation to appropriate plugin ([2168c7e](https://github.com/Fdawgs/docsmith/commit/2168c7e26c004a6807eae18a47932e15d35f62ee))


### Documentation

* **readme:** update feature list ([15912b8](https://github.com/Fdawgs/docsmith/commit/15912b8b843e9277d48f5aa029b79d0a795e1510))


### Miscellaneous

* add example docx route requests ([f0dc009](https://github.com/Fdawgs/docsmith/commit/f0dc0099c04ca2096a826e4b7f08d98f1ee0d26b))
* inline comment spelling and grammar fixes ([e960246](https://github.com/Fdawgs/docsmith/commit/e9602469ed5464c9ad2f9d5420c21446056c0076))
* **routes/docx/txt:** fix description ([1e41394](https://github.com/Fdawgs/docsmith/commit/1e41394dce03a17a08e079ddee00c5793dca43ed))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.4 to 2.24.0 ([3cfb576](https://github.com/Fdawgs/docsmith/commit/3cfb57642252298bf65ed80ac4b976919f3d76d2))
* **deps:** add mammoth ([01b9f3a](https://github.com/Fdawgs/docsmith/commit/01b9f3a009c1f77d2eea39370cc4d816e596e92c))
* **deps:** bump actions/setup-node from 2.3.0 to 2.4.0 ([7460de7](https://github.com/Fdawgs/docsmith/commit/7460de789bf1f8bf9b7168d1b335de18757cc60d))
* **deps:** bump env-schema from 3.1.0 to 3.2.0 ([15126c0](https://github.com/Fdawgs/docsmith/commit/15126c0456694fc0eaf8050ead93d98eb95583b9))
* **deps:** bump fastify from 3.19.2 to 3.20.1 ([0cb82d3](https://github.com/Fdawgs/docsmith/commit/0cb82d3c01551eb2465cd5c030d43d3507819bd9))
* **deps:** bump fastify-swagger from 4.8.3 to 4.8.4 ([dd47683](https://github.com/Fdawgs/docsmith/commit/dd4768381740f86b4218e51108dfaac3f603bb85))
* **deps:** bump file-type from 16.5.2 to 16.5.3 ([959e67c](https://github.com/Fdawgs/docsmith/commit/959e67cb1dbb464f7589a67d40b3f71540627bae))
* **deps:** bump tesseract.js from 2.1.4 to 2.1.5 ([be7c659](https://github.com/Fdawgs/docsmith/commit/be7c6594721ea7215cb3a2eed73eaefe6eab8401))

## [3.0.0](https://github.com/Fdawgs/docsmith/compare/v2.4.3...v3.0.0) (2021-08-02)


### ⚠ BREAKING CHANGES

* minimum required version of node increased from 12 to 14 to allow for new ECMAScript syntax to be used
* **routes/pdf-to-txt:** additional trained data must now be provided for OCR before deployment

### Features

* **config:** add ability to disable ocr functionality ([7ba9b43](https://github.com/Fdawgs/docsmith/commit/7ba9b43796135a8f0b6ef25492836ce3f6f3fde4))
* **config:** add ability to specify number of tesseract ocr workers ([8a13c93](https://github.com/Fdawgs/docsmith/commit/8a13c93aae489f9914187e5829e8e61f93808a63))


### Bug fixes

* **config:** fall back to default if `CORS_ORIGIN` env variable not set ([63431f1](https://github.com/Fdawgs/docsmith/commit/63431f1cc0dd7e0334d2a33b9cd2818880473c32))
* **docker-compose:** wrap variables in quotes ([05afefe](https://github.com/Fdawgs/docsmith/commit/05afefe94b5a1fefc16f636e8cbe7cf828a352bb))
* **docker:** downgrade from buster to stretch; stop corrupted html gen ([c67663a](https://github.com/Fdawgs/docsmith/commit/c67663a3fb758ecb00b8fa16b022ba0d5b07b5cd))
* **plugins/image-to-txt:** await scheduler termination on close ([f59732a](https://github.com/Fdawgs/docsmith/commit/f59732a59b28a816d71b56ea59671d5bf9769345))
* **routes/pdf-to-txt:** use local trained data; stop cache corruption ([7a3d128](https://github.com/Fdawgs/docsmith/commit/7a3d12824fb93165abd2335f83b12d94b0946113))
* **routes/pdf/txt:** remove ocr query string param if ocr disabled ([#332](https://github.com/Fdawgs/docsmith/issues/332)) ([6b512c1](https://github.com/Fdawgs/docsmith/commit/6b512c11f66fbda73d2b4f1c50e6cb25ae3f86ca))
* **server:** ensure doc route also inherits plugins ([#310](https://github.com/Fdawgs/docsmith/issues/310)) ([76826b1](https://github.com/Fdawgs/docsmith/commit/76826b1ef47531e483a5958dae14780f07f331b1))


### Improvements

* **plugins/image-to-txt:** convert req-level tesseract util to server-level plugin ([#311](https://github.com/Fdawgs/docsmith/issues/311)) ([52e9993](https://github.com/Fdawgs/docsmith/commit/52e9993875225756e4bc0c6eeb51452d46949489))
* **plugins/image-to-txt:** create workers on physical core count ([f04109d](https://github.com/Fdawgs/docsmith/commit/f04109d6d2f422b6be4e1010447a7d590f12c5f0))
* **plugins/image-to-txt:** use local scripts over cdn downloads ([870ee3c](https://github.com/Fdawgs/docsmith/commit/870ee3c01e9fe917e70da575699d4b586925cfcd))
* **plugins/pdf-to-txt:** increase ppi to 300 to improve ocr accuracy ([99e9e24](https://github.com/Fdawgs/docsmith/commit/99e9e2458dfefb3382a09179b84cfc5e70877ce4))
* **plugins/pdf-to-txt:** use optional chaining over multiple checks ([6bc7ac5](https://github.com/Fdawgs/docsmith/commit/6bc7ac5a447447f1572f13101e4041acb4d86158))


### Miscellaneous

* **dockerfile:** indent script ([0d951e7](https://github.com/Fdawgs/docsmith/commit/0d951e78b335a749eca3dc567f52377310e0466b))
* **eslintrc:** support latest ecmascript features ([cf90012](https://github.com/Fdawgs/docsmith/commit/cf9001270a89fefc1c238c16bbcdc30954a3a42b))
* **eslint:** use ecmascript 2020 globals ([#329](https://github.com/Fdawgs/docsmith/issues/329)) ([0a48280](https://github.com/Fdawgs/docsmith/commit/0a48280c9c96b71f992e64b8544293d397f61be7))
* grammar fixes for jsdoc tags ([#327](https://github.com/Fdawgs/docsmith/issues/327)) ([c07dfaa](https://github.com/Fdawgs/docsmith/commit/c07dfaa03e1c6a35f8742cecfe0785eed6a1730c))
* increase minimum required version of node from 12 to 14 ([931fa62](https://github.com/Fdawgs/docsmith/commit/931fa6201bae80624ccf388cbc80b12b0047952a))
* **plugins/pdf-to-txt:** remove redundant jsdoc param tag ([74a799d](https://github.com/Fdawgs/docsmith/commit/74a799dba344970a4c55c9f0e62d3cccd96091fb))


### Dependencies

* **deps-dev:** bump eslint from 7.31.0 to 7.32.0 ([f264f06](https://github.com/Fdawgs/docsmith/commit/f264f068bedf36d82b63935a8c1d0efe5c84ce56))
* **deps-dev:** bump eslint-plugin-jest from 24.3.6 to 24.4.0 ([#315](https://github.com/Fdawgs/docsmith/issues/315)) ([cf791e7](https://github.com/Fdawgs/docsmith/commit/cf791e7491f244f42f1bb9ae06dfda83212bd48d))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.5 to 36.0.6 ([83c1ca5](https://github.com/Fdawgs/docsmith/commit/83c1ca59a4f03ed1a69a2370b78ca2ebd2d23340))
* **deps:** bump actions/setup-node from 2.2.0 to 2.3.0 ([#314](https://github.com/Fdawgs/docsmith/issues/314)) ([a8bbda5](https://github.com/Fdawgs/docsmith/commit/a8bbda595101fbaa632c64b23f3d3d2d924efe74))
* **deps:** bump dependencies ([#325](https://github.com/Fdawgs/docsmith/issues/325)) ([e383c7d](https://github.com/Fdawgs/docsmith/commit/e383c7d4e6c00f50c772e267f5164c05415d965a))
* **deps:** bump GoogleCloudPlatform/release-please-action ([#326](https://github.com/Fdawgs/docsmith/issues/326)) ([7bc9fad](https://github.com/Fdawgs/docsmith/commit/7bc9fad002cac9170577735b962de078e6e7e21e))
* **deps:** bump jsdom from 16.6.0 to 16.7.0 ([84bc485](https://github.com/Fdawgs/docsmith/commit/84bc485ab5264f7b9778fa5b9a281722ccd4b38c))
* **deps:** bump node-poppler from 4.1.0 to 4.1.1 ([0259049](https://github.com/Fdawgs/docsmith/commit/0259049d296978c7769e91d0d2b8ca82d2bdd6d7))
* **deps:** bump pino from 6.12.0 to 6.13.0 ([5b6a85e](https://github.com/Fdawgs/docsmith/commit/5b6a85e064aa25b7960fa8e21ef0ab769e8ff99f))
* **deps:** bump pino-pretty from 5.1.1 to 5.1.2 ([512a196](https://github.com/Fdawgs/docsmith/commit/512a196303fbf9c542431880f1c5800e627e12f7))

### [2.4.3](https://github.com/Fdawgs/docsmith/compare/v2.4.2...v2.4.3) (2021-07-19)


### Bug fixes

* **package:** move `pino-pretty` to production dependency list ([#298](https://github.com/Fdawgs/docsmith/issues/298)) ([55ec7e7](https://github.com/Fdawgs/docsmith/commit/55ec7e75eb990b77cd0d9127c461a16c93c1a8f3))


### Improvements

* **routes/healthcheck:** do not treat route as plugin ([02e6dcb](https://github.com/Fdawgs/docsmith/commit/02e6dcba640725dfe317058ea8a7e11da8664c56))


### Dependencies

* **deps-dev:** bump eslint from 7.30.0 to 7.31.0 ([4be0b56](https://github.com/Fdawgs/docsmith/commit/4be0b5614aa56e592c01ca93ae90641212a624be))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.3 to 35.4.5 ([f64026b](https://github.com/Fdawgs/docsmith/commit/f64026b2a7e2334b3a0fe63ce1cf3495de340c7c))
* **deps:** bump fastify from 3.19.0 to 3.19.1 ([c385a56](https://github.com/Fdawgs/docsmith/commit/c385a56622af5de2b67948cab724df84a3ef1af5))
* **deps:** bump fastify-cors from 6.0.1 to 6.0.2 ([6f6365f](https://github.com/Fdawgs/docsmith/commit/6f6365f1b19cd9d3484ae83cbb65fc9896514eac))
* **deps:** bump wagoid/commitlint-github-action from 3.1.4 to 4.1.1 ([c5c22ca](https://github.com/Fdawgs/docsmith/commit/c5c22caa454236cd8d20d0f6a6b2418b6794111b))


### Miscellaneous

* change mentions of "MIME type" to "media type" ([#295](https://github.com/Fdawgs/docsmith/issues/295)) ([854759d](https://github.com/Fdawgs/docsmith/commit/854759da9bfdf0a3c1599259d5d1baada4f2debd))
* **test_resources:** add Insomnia REST client test requests ([7859d41](https://github.com/Fdawgs/docsmith/commit/7859d41c9ced1505d2d6764709c41973bd53664c))
* **test_resources:** minor header tweaks ([d43fd2e](https://github.com/Fdawgs/docsmith/commit/d43fd2e2a80c8582f93a127d2750926ef4336cb5))
* update jsdoc tag comments ([#304](https://github.com/Fdawgs/docsmith/issues/304)) ([bd683f3](https://github.com/Fdawgs/docsmith/commit/bd683f342308b6846fa573cd7c04c70426fea149))
* update plugin metadata for server dependency graph ([13aaf44](https://github.com/Fdawgs/docsmith/commit/13aaf44b2feb141bceb5950cd89c8b75a800a120))

### [2.4.2](https://github.com/Fdawgs/docsmith/compare/v2.4.1...v2.4.2) (2021-07-12)


### Bug fixes

* **routes:** `Accept` header handling encapsulation ([#292](https://github.com/Fdawgs/docsmith/issues/292)) ([d8e3d3d](https://github.com/Fdawgs/docsmith/commit/d8e3d3d4fc213e638c57fe3e37e6cf88820200d1))


### Miscellaneous

* **vscode:** remove user space config setting ([#283](https://github.com/Fdawgs/docsmith/issues/283)) ([28135bb](https://github.com/Fdawgs/docsmith/commit/28135bb41771c4abcf20036164fd1eb8eeeb01ec))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.2 to 35.4.3 ([a933b32](https://github.com/Fdawgs/docsmith/commit/a933b3203ab5b9fdace7a82affd0d4553c178d9e))
* **deps-dev:** bump nodemon from 2.0.10 to 2.0.12 ([da50881](https://github.com/Fdawgs/docsmith/commit/da5088113601fb20447aacbbf05fbe03258f5833))
* **deps:** bump env-schema from 3.0.1 to 3.1.0 ([d0ee9f7](https://github.com/Fdawgs/docsmith/commit/d0ee9f77598e18320af01ff94116e6132752e3f2))
* **deps:** bump fastify-swagger from 4.8.2 to 4.8.3 ([7e0d077](https://github.com/Fdawgs/docsmith/commit/7e0d0773187318a0f516d257b0af21275456be37))
* **deps:** bump file-type from 16.5.0 to 16.5.1 ([7616311](https://github.com/Fdawgs/docsmith/commit/761631114cb163f9eb36c12c22fbc4ec231dd7f2))
* **deps:** bump fluent-json-schema from 3.0.0 to 3.0.1 ([0ebe587](https://github.com/Fdawgs/docsmith/commit/0ebe58795a8010fcb666756b4ed2bbc40f889cfc))
* **deps:** bump pino from 6.11.3 to 6.12.0 ([dd61325](https://github.com/Fdawgs/docsmith/commit/dd61325ac97d44acb38a19088efeccc92b2d96d5))


### Continuous integration

* **ci:** disable homebrew analytics for macos builds ([#293](https://github.com/Fdawgs/docsmith/issues/293)) ([ad32eae](https://github.com/Fdawgs/docsmith/commit/ad32eaeb49b1b1850077b96eaba59ab147f86423))

### [2.4.1](https://github.com/Fdawgs/docsmith/compare/v2.4.0...v2.4.1) (2021-07-09)


### Bug fixes

* **plugins:** check conv object is present before removing temp files ([1fb4eb9](https://github.com/Fdawgs/docsmith/commit/1fb4eb950271fe5f6b6b1b60509751a81333cc3d))
* **routes:** add `Accept` request header handling  ([#281](https://github.com/Fdawgs/docsmith/issues/281)) ([89e05c0](https://github.com/Fdawgs/docsmith/commit/89e05c0122d3d3c6d71c7d6f577bdd0bd24ad08a))


### Improvements

* **config:** use same `tempdirectory` variable across config ([ac27c45](https://github.com/Fdawgs/docsmith/commit/ac27c4545c1fc63ee29ee73c404c8db3b594d44a))
* **plugins/embed-html-images:** uncouple from server config ([8caf594](https://github.com/Fdawgs/docsmith/commit/8caf594fd1f0b936ecd668fcf8ec31ba479a15ed))
* **plugins/pdf-to-html:** uncouple from server config ([ab9701b](https://github.com/Fdawgs/docsmith/commit/ab9701b464b5bc49bfe462997af9eac067ec87cb))
* **plugins/pdf-to-txt:** uncouple from server config ([1cacd0f](https://github.com/Fdawgs/docsmith/commit/1cacd0f23a9209f2fa8d76cdef7289302b814e45))
* **plugins/rtf-to-html:** uncouple from server config ([96eb122](https://github.com/Fdawgs/docsmith/commit/96eb122e8b9fd07218ae382518bd384a1ed52257))
* **plugins/rtf-to-txt:** uncouple from server config ([2514206](https://github.com/Fdawgs/docsmith/commit/2514206432de66a74b3da8e71741489989c44810))
* **plugins:** create new instances of unrtf earlier ([fe9f637](https://github.com/Fdawgs/docsmith/commit/fe9f637bcb58e9d0fa9563db7ea373b57c3eb95c))
* **plugins:** create result object before being blocked by asyncs ([e989620](https://github.com/Fdawgs/docsmith/commit/e9896208e45c81124e9b61fcd8849664964a4ee9))


### Miscellaneous

* **env.template:** replace incorrect double quote ([e6626fc](https://github.com/Fdawgs/docsmith/commit/e6626fc045ff5826d51c1be5a3fcc5292667b943))
* **env.template:** replace incorrect double quote ([b2695fe](https://github.com/Fdawgs/docsmith/commit/b2695fec56308bbed4cc19a52df7e64b2593fef9))
* **plugins:** remove old reference to expressjs middleware ([70cb821](https://github.com/Fdawgs/docsmith/commit/70cb8216828b1a936249bdfbedb003edaa54c972))
* standardise result object name in `req` ([0b7b51d](https://github.com/Fdawgs/docsmith/commit/0b7b51d3fb88c257bb914e8e4b79059f38978311))
* **utils:** standardise util function naming ([2a5a220](https://github.com/Fdawgs/docsmith/commit/2a5a220135a0f1f2cbb9d2eb88ef6d7507e434ce))
* **vscode:** disable red hat telemetry ([91082b2](https://github.com/Fdawgs/docsmith/commit/91082b2362466d9abe9d4fe0debf21e5d4fddd6e))


### Dependencies

* **deps-dev:** bump autocannon from 7.3.0 to 7.4.0 ([64a43cb](https://github.com/Fdawgs/docsmith/commit/64a43cb208acd89f0270be8df74ae9b1cd4d87b7))
* **deps-dev:** bump eslint from 7.29.0 to 7.30.0 ([7244266](https://github.com/Fdawgs/docsmith/commit/724426667684d43b0b18fa57a64e258afeb86217))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.1 to 35.4.2 ([b098fb5](https://github.com/Fdawgs/docsmith/commit/b098fb5dcb49b5d54150e28a4a7b8f0c48b22881))
* **deps-dev:** bump husky from 6.0.0 to 7.0.1 ([fc9c6ff](https://github.com/Fdawgs/docsmith/commit/fc9c6ff2d2b95f4d985eccbe2578f86ef40d448f))
* **deps-dev:** bump nodemon from 2.0.9 to 2.0.10 ([f5b3f6f](https://github.com/Fdawgs/docsmith/commit/f5b3f6f42a7564665ba8a2619752f0956940fe10))
* **deps-dev:** bump pino-pretty from 5.1.0 to 5.1.1 ([044f857](https://github.com/Fdawgs/docsmith/commit/044f8579fad515a99f028fb3975b2cae78aaf492))
* **deps:** bump coverallsapp/github-action from 1.1.2 to 1.1.3 ([d9885bf](https://github.com/Fdawgs/docsmith/commit/d9885bf5a6cf5968d831c60cc70b12c6bd85bce3))
* **deps:** bump fastify from 3.18.1 to 3.19.0 ([209c4aa](https://github.com/Fdawgs/docsmith/commit/209c4aa469e8d71358968d80cceaf3394770b9cf))
* **deps:** bump fastify-helmet from 5.3.1 to 5.3.2 ([ef0ee57](https://github.com/Fdawgs/docsmith/commit/ef0ee5793509e751818240263f0f44e1c8e16fa9))

## [2.4.0](https://github.com/Fdawgs/docsmith/compare/v2.3.3...v2.4.0) (2021-07-05)


### Features

* **routes/pdf/txt:** add `ocr` query string param for ocr support ([44c44f7](https://github.com/Fdawgs/docsmith/commit/44c44f73d3b374eda9aa6c02642a2e29e0624f66))


### Documentation

* **readme:** update supported features list ([300785f](https://github.com/Fdawgs/docsmith/commit/300785f4cef3031ff2760be545da5e41289197c9))


### Miscellaneous

* **env.template:** use double quotes ([#258](https://github.com/Fdawgs/docsmith/issues/258)) ([0512d1f](https://github.com/Fdawgs/docsmith/commit/0512d1f53cd5073c2e2efe42d1838b76ebbf0973))
* ignore tesseract trained data ([ba13eab](https://github.com/Fdawgs/docsmith/commit/ba13eabc488790c5a020af2dec720191c33148c1))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.4.0 to 35.4.1 ([16453a1](https://github.com/Fdawgs/docsmith/commit/16453a18e9fc554e568d74d03871fcbef8d33a7c))
* **deps-dev:** bump jest from 27.0.5 to 27.0.6 ([7ad4be8](https://github.com/Fdawgs/docsmith/commit/7ad4be8938e0b2bceb412fe9f96aecee90d8a6e3))
* **deps-dev:** bump nodemon from 2.0.7 to 2.0.9 ([a9be956](https://github.com/Fdawgs/docsmith/commit/a9be9569aa62afe471d50da15fb07c4a1ce7df21))
* **deps-dev:** bump pino-pretty from 5.0.2 to 5.1.0 ([ff307a5](https://github.com/Fdawgs/docsmith/commit/ff307a5df2ced68d99177b9727a6eb28b8ab2ae3))
* **deps-dev:** bump prettier from 2.3.1 to 2.3.2 ([fb23ddb](https://github.com/Fdawgs/docsmith/commit/fb23ddb5abf727de02d853d8b53ff7117ce2c644))
* **deps:** bump actions/setup-node from 2.1.5 to 2.2.0 ([6074121](https://github.com/Fdawgs/docsmith/commit/6074121df261950d59f5bd15f591cc65ffd64926))
* **deps:** bump fastify from 3.18.0 to 3.18.1 ([a949c21](https://github.com/Fdawgs/docsmith/commit/a949c21314a70ff0578c5f1e586b743e77f4ff61))
* **deps:** bump fastify-swagger from 4.8.0 to 4.8.2 ([7aa3e31](https://github.com/Fdawgs/docsmith/commit/7aa3e3194de5e7cdcfc5c1101c6a4af507075656))

### [2.3.3](https://github.com/Fdawgs/docsmith/compare/v2.3.2...v2.3.3) (2021-06-22)


### Bug fixes

* **server:** add "base-uri" directive to `Content-Security-Policy` ([#244](https://github.com/Fdawgs/docsmith/issues/244)) ([f4a12e6](https://github.com/Fdawgs/docsmith/commit/f4a12e67c6d0c01553e2c288dcb895fb2a6bd62a))
* **server:** increase `Strict-Transport-Security` max age to 365 days ([1c9f303](https://github.com/Fdawgs/docsmith/commit/1c9f303b1432bd2120d47371de4be95428996fee))
* **server:** revert `Referrer-Policy` directives to "no-referrer" only ([b2c1023](https://github.com/Fdawgs/docsmith/commit/b2c102388f6479d9de7197717fe5f83b1fdbacc5))
* **server:** use stricter `Content-Security-Policy` values ([b833c6b](https://github.com/Fdawgs/docsmith/commit/b833c6b0318fe9895fbc8cda6244ea6fa643b144))


### Continuous integration

* **link-check:** reduce frequency from weekly to monthly ([#241](https://github.com/Fdawgs/docsmith/issues/241)) ([3a3c13f](https://github.com/Fdawgs/docsmith/commit/3a3c13f69361446fbb97e081d043d4833f4b6b06))


### Miscellaneous

* **server:** clarify on what each registered plugin does ([673bdfe](https://github.com/Fdawgs/docsmith/commit/673bdfee8759b729807c0e8c68af60c85737907a))


### Dependencies

* **deps-dev:** bump eslint from 7.28.0 to 7.29.0 ([9db5421](https://github.com/Fdawgs/docsmith/commit/9db54213aaa38299bf65db656dbad25d623d1c1a))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.3.0 to 35.4.0 ([2aefbbb](https://github.com/Fdawgs/docsmith/commit/2aefbbb4c79f3b43d4122c017e6888f49fd13b34))
* **deps-dev:** bump jest from 27.0.4 to 27.0.5 ([849f75e](https://github.com/Fdawgs/docsmith/commit/849f75eaf839c3a1b64a10c1faa17503ed142229))
* **deps:** bump cssom from 0.4.4 to 0.5.0 ([de2e5b0](https://github.com/Fdawgs/docsmith/commit/de2e5b04ea943d67fc8aa38b0d579c39bc7ec4a9))
* **deps:** bump fastify-autoload from 3.7.1 to 3.8.0 ([a8b5a4e](https://github.com/Fdawgs/docsmith/commit/a8b5a4ed05ed21fa36cf0bb02682c3ef333aa5da))
* **deps:** bump fastify-bearer-auth from 5.1.0 to 6.0.0 ([a90a6af](https://github.com/Fdawgs/docsmith/commit/a90a6afd22047ad4d754f09efbe482696a31f0b2))
* **deps:** bump fastify-swagger from 4.7.0 to 4.8.0 ([192324a](https://github.com/Fdawgs/docsmith/commit/192324a9e1182db3493f1c14b0d84e9a1eb931a7))
* **deps:** bump under-pressure from 5.6.0 to 5.7.0 ([ca77149](https://github.com/Fdawgs/docsmith/commit/ca77149cb199bc8db9428fed7cd32728abb16a0a))

### [2.3.2](https://github.com/Fdawgs/docsmith/compare/v2.3.1...v2.3.2) (2021-06-17)


### Dependencies

* **deps:** bump actions/upload-artifact from 2.2.3 to 2.2.4 ([6b66fb1](https://github.com/Fdawgs/docsmith/commit/6b66fb1a7092e77e08615d9f747eaf5aad7c6189))
* **deps:** bump fastify from 3.17.0 to 3.18.0 ([de705a6](https://github.com/Fdawgs/docsmith/commit/de705a65f1e35678d64b7e36714f0b60d002c971))
* **deps:** bump fastify-disablecache from 2.0.1 to 2.0.2 ([#238](https://github.com/Fdawgs/docsmith/issues/238)) ([c96c2b4](https://github.com/Fdawgs/docsmith/commit/c96c2b4b748309fe9d541d2e9059e97d4bede56d))

### [2.3.1](https://github.com/Fdawgs/docsmith/compare/v2.3.0...v2.3.1) (2021-06-16)


### Bug fixes

* **config:** add `NODE_ENV` to env schema validation ([4d7fa47](https://github.com/Fdawgs/docsmith/commit/4d7fa47070b13eaeb1ab753ff30b88a32a8fc691))
* **config:** prettyprint conditional ([101a520](https://github.com/Fdawgs/docsmith/commit/101a520b51b18e80c2693ebcd7e3a70d46fc920a))
* **plugins:** return response object from `onResponse` hook ([b29af02](https://github.com/Fdawgs/docsmith/commit/b29af0233cef8f7b4806dd07e835dc71464dfb51))
* **server:** allow bearer token auth to be disabled ([#228](https://github.com/Fdawgs/docsmith/issues/228)) ([80e9ce1](https://github.com/Fdawgs/docsmith/commit/80e9ce15b3365828c27a29dd04a83ce4051a7bdd))


### Documentation

* **readme:** revamp `why` section ([82a037b](https://github.com/Fdawgs/docsmith/commit/82a037b94849056c0cf7c6d2688ac3fd930bd81f))


### Improvements

* **plugins:** remove rtf body checks; now handled by `node-unrtf` ([#233](https://github.com/Fdawgs/docsmith/issues/233)) ([9d1351d](https://github.com/Fdawgs/docsmith/commit/9d1351d09a42fb4355be31ece8fdbe291fccad7d))


### Miscellaneous

* **plugins/pdf-to-txt:** remove unused variable ([b05c885](https://github.com/Fdawgs/docsmith/commit/b05c8856bbf5a75b378f4f60b34f8e4b9b9847ef))
* **scripts:** benchmark conversion route ([#235](https://github.com/Fdawgs/docsmith/issues/235)) ([d1c92c3](https://github.com/Fdawgs/docsmith/commit/d1c92c3275c1f3ffd26db291e53533182e3dcd7e))


### Dependencies

* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.3 to 35.2.0 ([2f6b017](https://github.com/Fdawgs/docsmith/commit/2f6b0178bd14aa4912b6d9fb5bf5b5d2c9e702aa))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.2.0 to 35.3.0 ([8028579](https://github.com/Fdawgs/docsmith/commit/8028579d9a55efce5b39aa3c43afc33cbd615b3a))
* **deps:** bump fastify-compress from 3.5.0 to 3.6.0 ([#230](https://github.com/Fdawgs/docsmith/issues/230)) ([03f711c](https://github.com/Fdawgs/docsmith/commit/03f711c77ebafc4c8fbee3103842a708d112b3bd))
* **deps:** bump fastify-disablecache from 2.0.0 to 2.0.1 ([#236](https://github.com/Fdawgs/docsmith/issues/236)) ([7b05aaa](https://github.com/Fdawgs/docsmith/commit/7b05aaadb0860a9946eb1732a696da8fbca769a1))
* **deps:** bump node-unrtf from 2.0.0 to 2.0.1 ([6410751](https://github.com/Fdawgs/docsmith/commit/64107512b54d06346a62bc163ddf5db72f1a3c7e))

## [2.3.0](https://github.com/Fdawgs/docsmith/compare/v2.2.2...v2.3.0) (2021-06-11)


### Features

* **routes/rtf/html:** add `removeAlt` query string param ([#222](https://github.com/Fdawgs/docsmith/issues/222)) ([08a9c02](https://github.com/Fdawgs/docsmith/commit/08a9c0204c91325577aa5424e729a54aeda05787))
* **server:** add content-encoding support ([4b03b8e](https://github.com/Fdawgs/docsmith/commit/4b03b8ed2624f416530b848400900e5fc09c6330))


### Bug fixes

* **plugins:** return full serialization of  HTML document ([#219](https://github.com/Fdawgs/docsmith/issues/219)) ([f924996](https://github.com/Fdawgs/docsmith/commit/f92499654794aac52915ee200d4e74829bea220e))


### Miscellaneous

* **routes:** chain `.register()` functions ([7fd53f8](https://github.com/Fdawgs/docsmith/commit/7fd53f856fe62c36540cedc285362e605dce430c))

### [2.2.2](https://github.com/Fdawgs/docsmith/compare/v2.2.1...v2.2.2) (2021-06-09)


### Dependencies

* **deps:** bump normalize-url from 4.5.0 to 4.5.1 ([7beaf5f](https://github.com/Fdawgs/docsmith/commit/7beaf5f2bacf7ced6ca592ce348a44b970e288d2))


### Improvements

* **plugins:** remove redundant use of `this` keyword ([3eb8931](https://github.com/Fdawgs/docsmith/commit/3eb8931b928960eb7399628de468aad73127226f))
* **server:** use helmet default csp directives ([bad981c](https://github.com/Fdawgs/docsmith/commit/bad981c31563c0ae4304fcd7c0037b77d5940e85))

### [2.2.1](https://github.com/Fdawgs/docsmith/compare/v2.2.0...v2.2.1) (2021-06-09)


### Bug fixes

* **plugins:** await `Object.assign()` and `fixUtf8()` ([d3bdbc3](https://github.com/Fdawgs/docsmith/commit/d3bdbc303315b0475f685d607de3129059ae357a))
* **routes/pdf/html:** hardcoded `removealt` query param ([6e96a29](https://github.com/Fdawgs/docsmith/commit/6e96a29d624f10dfcbcfa200a6de8b5de5d9202a))

## [2.2.0](https://github.com/Fdawgs/docsmith/compare/v2.1.4...v2.2.0) (2021-06-08)


### Features

* **config:** add env variable for setting req body size limit ([53b97b8](https://github.com/Fdawgs/docsmith/commit/53b97b885e64df6869200bcef16db1a3e809cd13))


### Bug fixes

* **plugins:** `outputencoding` query param use ([768161e](https://github.com/Fdawgs/docsmith/commit/768161ee6cdcf46f25d36c69db3fd0f25ae1aa63))

### [2.1.4](https://github.com/Fdawgs/docsmith/compare/v2.1.3...v2.1.4) (2021-06-08)


### Bug fixes

* **config:** redact request authorization header from logs ([9300384](https://github.com/Fdawgs/docsmith/commit/9300384926e32962668edb0db7e8736d57cd6ed9))
* **server:** remove swagger from csp for all routes apart from doc route ([5be469d](https://github.com/Fdawgs/docsmith/commit/5be469df586c09185a6191036d8eefafb70382ad))
* **server:** set `frame-ancestors` csp to `'none'`; add `child-src` csp ([2d85a0f](https://github.com/Fdawgs/docsmith/commit/2d85a0ff9e49efa6820bbd70fd558095be059aeb))


### Documentation

* **readme:** flesh out intro section further ([97cbc09](https://github.com/Fdawgs/docsmith/commit/97cbc09e0b0deda27ee46e441f5fb59058c319ed))


### Dependencies

* update vulnerable dependencies ([f1297b9](https://github.com/Fdawgs/docsmith/commit/f1297b94049c5051c99adc939618d6ba56b3d261))

### [2.1.3](https://github.com/Fdawgs/docsmith/compare/v2.1.2...v2.1.3) (2021-06-07)


### Bug fixes

* **plugins/tidy-css:** incomplete multi-character sanitization ([9abf965](https://github.com/Fdawgs/docsmith/commit/9abf9651e8ea40936595d9f23de4d7ecb2c6f46f))


### Documentation

* **readme:** revamp intro section ([#207](https://github.com/Fdawgs/docsmith/issues/207)) ([04265e1](https://github.com/Fdawgs/docsmith/commit/04265e11cd7da608a671e762dde622dceed9dcf2))


### Dependencies

* **deps-dev:** bump eslint from 7.27.0 to 7.28.0 ([8152f90](https://github.com/Fdawgs/docsmith/commit/8152f90e34ec9ec8b08fe55809bc5204037abf2c))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.1.2 to 35.1.3 ([964b374](https://github.com/Fdawgs/docsmith/commit/964b3742d3d424e9e0110fff6dfb501aada17ab4))
* **deps-dev:** bump prettier from 2.3.0 to 2.3.1 ([96133ff](https://github.com/Fdawgs/docsmith/commit/96133ff724e612c1d559944d36743f4419767935))
* **deps-dev:** remove glob from dev list; already prod dep ([ee6b6ba](https://github.com/Fdawgs/docsmith/commit/ee6b6ba5f5f26df26070a26907522d5582075173))
* update vulnerable dependency ([b142a49](https://github.com/Fdawgs/docsmith/commit/b142a49db95bd8f81a2580caf8380f43607f98d5))

### [2.1.2](https://github.com/Fdawgs/docsmith/compare/v2.1.1...v2.1.2) (2021-06-03)


### Documentation

* **readme:** grammar and wordiness fixes ([d92af9c](https://github.com/Fdawgs/docsmith/commit/d92af9c5a75ad598039a168ae42514a66f999a4c))
* **readme:** grammar fix ([ef33bda](https://github.com/Fdawgs/docsmith/commit/ef33bda0f8bc6061cfb279a68e1bb721f1699133))
* **readme:** update contributing section ([208beac](https://github.com/Fdawgs/docsmith/commit/208beacd72f7a24d8e00461a9a3e708fb25fb97d))


### Miscellaneous

* **.env.template:** remove comment re docker and log files ([66ba536](https://github.com/Fdawgs/docsmith/commit/66ba53660cac5d4242d7cb8011dbf982319e6a8b))
* **dockerignore:** ignore all temp directories ([33495d4](https://github.com/Fdawgs/docsmith/commit/33495d49106874afc0dd552f48b6e20fbbab85bd))


### Continuous integration

* remove redundant docker build job ([78e3abd](https://github.com/Fdawgs/docsmith/commit/78e3abd235f9a3f5617c1c0195ca603a104c3d60))


### Dependencies

* **deps-dev:** bump eslint-plugin-import from 2.23.3 to 2.23.4 ([9bc0cd7](https://github.com/Fdawgs/docsmith/commit/9bc0cd70b6cbb541dab64c2c280c6c4766f7ea9f))
* **deps-dev:** bump eslint-plugin-jsdoc from 35.0.0 to 35.1.2 ([e0d7dd2](https://github.com/Fdawgs/docsmith/commit/e0d7dd28acb7e98e4f8efb63388a7a4250b4c058))
* **deps-dev:** bump jest from 27.0.1 to 27.0.3 ([fe2f6c7](https://github.com/Fdawgs/docsmith/commit/fe2f6c7da50e672bcf60d4a60aedacdf1ed1ffa9))
* **deps-dev:** bump jest from 27.0.3 to 27.0.4 ([c1a8d11](https://github.com/Fdawgs/docsmith/commit/c1a8d11effefde258d02b586a050041ffcdda313))
* **deps-dev:** bump pino-pretty from 5.0.0 to 5.0.1 ([8a0a640](https://github.com/Fdawgs/docsmith/commit/8a0a6407b488333c72db15cb63eaad76a34e0991))
* **deps-dev:** bump pino-pretty from 5.0.1 to 5.0.2 ([bce5af7](https://github.com/Fdawgs/docsmith/commit/bce5af7788c1e91739de135a173d85b07c214d6c))
* **deps:** bump actions/cache from 2.1.5 to 2.1.6 ([97bbbb6](https://github.com/Fdawgs/docsmith/commit/97bbbb61d5c280354fd7d51fe57060450a88cfe6))
* **deps:** bump fastify from 3.16.2 to 3.17.0 ([ea6516b](https://github.com/Fdawgs/docsmith/commit/ea6516b2a4c4a69fbe472775e5ad639ab8258af0))
* **deps:** bump file-type from 16.4.0 to 16.5.0 ([f4d2dbf](https://github.com/Fdawgs/docsmith/commit/f4d2dbfe56d43a149c63ca3f17195fe79593b71c))
* **deps:** bump node-poppler from 4.0.0 to 4.1.0 ([5203ac5](https://github.com/Fdawgs/docsmith/commit/5203ac58272eeb88dcec7c5d96b6efb990a27f1e))
* **deps:** bump ws from 7.4.5 to 7.4.6 ([334cc18](https://github.com/Fdawgs/docsmith/commit/334cc1872b41673eb95ccc4256a85477f0a8dad7))
* **docker:** add missing dependencies and env variables ([fac4517](https://github.com/Fdawgs/docsmith/commit/fac4517eda854fb939ce6d0bd1fc588c8fb5fb4d))
* **docker:** clean list after install; ignore recommended packages ([61159cd](https://github.com/Fdawgs/docsmith/commit/61159cdde58fcd28960d976644b299cf36618649))
* **dockerignore:** add test and dev files ([573e477](https://github.com/Fdawgs/docsmith/commit/573e477dda5f04c84d4a9ece93ebf6ccffb983e4))
* **docker:** pin binary versions ([d237673](https://github.com/Fdawgs/docsmith/commit/d2376732d23073bd2b6ad1b1fa09c554eaefc17a))
* **docker:** update workdir; install curl ([338bf2d](https://github.com/Fdawgs/docsmith/commit/338bf2db1817d9a01db4d9dbaaed18336a487d94))
* **docker:** use native logging, healthcheck, restart and res handling ([23600da](https://github.com/Fdawgs/docsmith/commit/23600dac5f8dabd8505e2a27da89f146ea238e1c))
* **docker:** use smaller, more secure base image ([bf2f4e0](https://github.com/Fdawgs/docsmith/commit/bf2f4e05d1d368a759aac1b095e75447c73cbbb9))

### [2.1.1](https://github.com/Fdawgs/docsmith/compare/v2.1.0...v2.1.1) (2021-05-27)


### Miscellaneous

* **gitignore:** ignore all temp directories ([a418e02](https://github.com/Fdawgs/docsmith/commit/a418e02e8221b5b60f390cd246fcafc28c2ff0ca))
* **prettierignore:** ignore all temp directories ([0c373cd](https://github.com/Fdawgs/docsmith/commit/0c373cd102fb705ae8bdc3c4d2c621057e835495))
* remove resolved todo comments ([d0b5c92](https://github.com/Fdawgs/docsmith/commit/d0b5c92b2ca38d67acb8f137ffc983ace205f4b7))
* **test_resources:** standardize test file names ([3b6d16c](https://github.com/Fdawgs/docsmith/commit/3b6d16cce4be205bae9567869c66d0dfd79a73ec))


### Improvements

* **routes:** mimetype detection ([2ef53e0](https://github.com/Fdawgs/docsmith/commit/2ef53e09f55052bfaeb6386e3d95b1ded0020001))
* **routes:** mimetype detection payload return ([1db2c3a](https://github.com/Fdawgs/docsmith/commit/1db2c3aa886bfbc3d73e1db1289bf08b62a0e304))


### Continuous integration

* **cd:** move perf optimizations and refactoring into same section ([b5e1b23](https://github.com/Fdawgs/docsmith/commit/b5e1b23341c52e834eefe6d4e2c5eab24b6bcd58))


### Dependencies

* **deps-dev:** bump jest from 27.0.0 to 27.0.1 ([e64fa9b](https://github.com/Fdawgs/docsmith/commit/e64fa9b636d89290b480d6006e4b63a39473adae))
* **deps-dev:** bump pino-pretty from 4.8.0 to 5.0.0 ([008d6e1](https://github.com/Fdawgs/docsmith/commit/008d6e1fbc41e76246d504373ed1013407fe9938))
* **deps:** bump fastify from 3.15.1 to 3.16.2 ([e926a09](https://github.com/Fdawgs/docsmith/commit/e926a09c274f3c1c4c580e6cf353249fa686b1de))

## [2.1.0](https://github.com/Fdawgs/docsmith/compare/v2.0.4...v2.1.0) (2021-05-25)


### Features

* **routes/rtf/html:** add rtf-to-html route ([#177](https://github.com/Fdawgs/docsmith/issues/177)) ([8b0fdd4](https://github.com/Fdawgs/docsmith/commit/8b0fdd4c32f032611ed48366974e878d02cc448a))
* **routes/rtf/txt:** add rtf-to-txt route  ([#179](https://github.com/Fdawgs/docsmith/issues/179)) ([0ad64bd](https://github.com/Fdawgs/docsmith/commit/0ad64bd23dd763bc8f027790d26bb149e0894bea))


### Miscellaneous

* **workflows:** remove `stale.yml` ([ae47b74](https://github.com/Fdawgs/docsmith/commit/ae47b74b2d191d161dcaed52ebcddd3d2014cd4b))

### [2.0.4](https://github.com/Fdawgs/docsmith/compare/v2.0.3...v2.0.4) (2021-05-25)


### Miscellaneous

* **docker-compose:** update `container_name` ([970f6b9](https://github.com/Fdawgs/docsmith/commit/970f6b92a6f6e0ad86963ad65b1fecb4aaf49337))
* **env:** add comments to clarify process load handling ([5313d90](https://github.com/Fdawgs/docsmith/commit/5313d90ece00f2764228c6ce3e527134abfa26ee))
* **env:** remove pre-filled  process load env values in template ([4cbd96f](https://github.com/Fdawgs/docsmith/commit/4cbd96f65831d7c501fc4e51220425b9c484f984))
* rename repo ([ee2a247](https://github.com/Fdawgs/docsmith/commit/ee2a247b904481c8273a5cc9a0979eab11cee53c))


### Dependencies

* **deps-dev:** bump eslint from 7.26.0 to 7.27.0 ([c9c2afc](https://github.com/Fdawgs/docsmith/commit/c9c2afcb394839d1aa82014b53bfe2ded35340b6))
* **deps-dev:** bump eslint-plugin-import from 2.23.2 to 2.23.3 ([297021f](https://github.com/Fdawgs/docsmith/commit/297021fd51b2a3e4ef95345a96c4096c7f21ed28))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.8.2 to 35.0.0 ([311f05c](https://github.com/Fdawgs/docsmith/commit/311f05c12015e8b1dd9bdc90a564f0a56a7a1b2f))
* **deps-dev:** bump jest from 26.6.3 to 27.0.0 ([7926c95](https://github.com/Fdawgs/docsmith/commit/7926c9511c703a9e1ebc5f0deccdc6f391c1f380))
* **deps:** bump dotenv from 9.0.2 to 10.0.0 ([bab8464](https://github.com/Fdawgs/docsmith/commit/bab8464e051aa316a07d57d7c97b0ee67311383c))
* **deps:** bump jsdom from 16.5.3 to 16.6.0 ([12be151](https://github.com/Fdawgs/docsmith/commit/12be15132faf1d6876d23820463ce9b0bc53315a))

### [2.0.3](https://github.com/Fdawgs/docsmith/compare/v2.0.2...v2.0.3) (2021-05-21)


### Continuous integration

* fix key usage in `action/setup-node` ([f8ccbe1](https://github.com/Fdawgs/docsmith/commit/f8ccbe108d36ab8d091836791fe1c77fcc5eb949))


### Miscellaneous

* **ci:** replace `node-version` key with shorter `node` ([#158](https://github.com/Fdawgs/docsmith/issues/158)) ([bf6ab0e](https://github.com/Fdawgs/docsmith/commit/bf6ab0e5fd82e21b48818ff90532903538bf18e2))
* **dockerfile:** consolidate consecutive `run` instructions ([#160](https://github.com/Fdawgs/docsmith/issues/160)) ([a4e6dd6](https://github.com/Fdawgs/docsmith/commit/a4e6dd68a6a1cbf5d94c0a7a9f22920ef486b74d))
* **plugins/pdf-to-html:** read direct from body buffer ([152224b](https://github.com/Fdawgs/docsmith/commit/152224bb24f0e21c202e8ae63e5028659b512050))
* **plugins/pdf-to-txt:** move tidyhtml dependency to route ([55536c3](https://github.com/Fdawgs/docsmith/commit/55536c369a3b919dffa9d4194f94ef403abfd347))
* **plugins/pdf-to-txt:** read direct from body buffer ([479f252](https://github.com/Fdawgs/docsmith/commit/479f2523c17b59f12c8dde1d0a9b1a7ac19bd9c7))
* **plugins/pdf-to-txt:** remove unused var ([8c04796](https://github.com/Fdawgs/docsmith/commit/8c04796377e825a5a5bac9c9f74a233a45efce37))
* **plugins:** remove redundant eslint comments ([ed65fad](https://github.com/Fdawgs/docsmith/commit/ed65fada237efc296db089f5e3ac4008f21ff3fd))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.1.1 to 12.1.4 ([5129b9c](https://github.com/Fdawgs/docsmith/commit/5129b9c85aef8e5996c4a9f173eda3925a554ce2))
* **deps-dev:** bump @commitlint/config-conventional ([fc3db2c](https://github.com/Fdawgs/docsmith/commit/fc3db2c4f52e7b369fe8c238d2ba62a28cff20e8))
* **deps-dev:** bump eslint-plugin-import from 2.22.1 to 2.23.2 ([3be6423](https://github.com/Fdawgs/docsmith/commit/3be6423b77080d1db334daefc4e1633b9eb58978))
* **deps-dev:** bump eslint-plugin-jsdoc from 34.0.1 to 34.8.2 ([1b06127](https://github.com/Fdawgs/docsmith/commit/1b061273aa211c6061fe3b14be4e5791f234289c))
* **deps:** bump actions/stale from 3.0.18 to 3.0.19 ([5078e95](https://github.com/Fdawgs/docsmith/commit/5078e95ddbec40e48a22db62707e924354ce3d08))
* **deps:** bump node-poppler from v3.0.0 to v4.0.0 ([b259b94](https://github.com/Fdawgs/docsmith/commit/b259b9481d04d1abc02a2c63d3fcd7629de82814))
* **deps:** bump wagoid/commitlint-github-action from 3.1.3 to 3.1.4 ([0e70612](https://github.com/Fdawgs/docsmith/commit/0e70612d07c3128cf84e92e477c22a877afd54ad))

### [2.0.2](https://github.com/Fdawgs/docsmith/compare/v2.0.1...v2.0.2) (2021-05-11)


### Bug fixes

* **config:** `LOG_LEVEL` env variable validation ([404568f](https://github.com/Fdawgs/docsmith/commit/404568f7b4234cd53c33f14c3bd264ff1ecfeb2e))


### Documentation

* **readme:** remove in-progress features from confirmed features list ([3cbc55c](https://github.com/Fdawgs/docsmith/commit/3cbc55c909f2746fc31ac003bff68d24acd5d334))


### Continuous integration

* **link-check:** run once a week on monday ([5a08a45](https://github.com/Fdawgs/docsmith/commit/5a08a455a9c981702e395ad2a0323c0ecc4a3af7))


### Dependencies

* **deps-dev:** bump autocannon from 7.2.0 to 7.3.0 ([4497f48](https://github.com/Fdawgs/docsmith/commit/4497f48990a54108b90138a777f318bb22dc3a3d))
* **deps-dev:** bump eslint from 7.25.0 to 7.26.0 ([595cf33](https://github.com/Fdawgs/docsmith/commit/595cf33a16b8c5825a86cba8079b8b10b51edb73))
* **deps-dev:** bump eslint-plugin-jsdoc from 33.0.0 to 34.0.1 ([8374837](https://github.com/Fdawgs/docsmith/commit/837483767fbab5a41b373f4bcade4f1700b0e74c))
* **deps-dev:** bump pino-pretty from 4.7.1 to 4.8.0 ([6e3c02d](https://github.com/Fdawgs/docsmith/commit/6e3c02d935a7b77b3df19c9344e1ac0eb1a91369))
* **deps-dev:** bump prettier from 2.2.1 to 2.3.0 ([#154](https://github.com/Fdawgs/docsmith/issues/154)) ([9d09ef3](https://github.com/Fdawgs/docsmith/commit/9d09ef32b56f448466371978d57b17d45972ff83))
* **deps:** bump brpaz/hadolint-action from 1.4.0 to 1.5.0 ([700b61a](https://github.com/Fdawgs/docsmith/commit/700b61a4565c8091bdabf37448e50051a04557e2))
* **deps:** bump dotenv from 8.2.0 to 9.0.2 ([8b8a2e7](https://github.com/Fdawgs/docsmith/commit/8b8a2e742b0036694f250a58dc054407aae35160))
* **deps:** bump fastify-cors from 6.0.0 to 6.0.1 ([dc50e48](https://github.com/Fdawgs/docsmith/commit/dc50e482dafb2967a9c63ce9f544979ecc07416a))
* **deps:** bump fastify-floc-off from 1.0.0 to 1.0.1 ([61ab850](https://github.com/Fdawgs/docsmith/commit/61ab8503ed85d9399393349c70a2aedf6396b565))
* **deps:** bump file-type from 16.3.0 to 16.4.0 ([d6ec7c1](https://github.com/Fdawgs/docsmith/commit/d6ec7c1812eec7a4553e5115ab7d7baf11157c49))
* **deps:** bump fluent-json-schema from 2.0.4 to 3.0.0 ([08d7a65](https://github.com/Fdawgs/docsmith/commit/08d7a655a2dc6de968ce8e5cfbdd4809a609b9da))
* **deps:** bump glob from 7.1.6 to 7.1.7 ([4d84537](https://github.com/Fdawgs/docsmith/commit/4d8453742f8fe150338c77dca83e664fdc67caec))
* **deps:** bump GoogleCloudPlatform/release-please-action ([19c969a](https://github.com/Fdawgs/docsmith/commit/19c969a68510ad73b6b93aac8e0fcf15c116ced7))
* **deps:** bump wagoid/commitlint-github-action from 3.1.0 to 3.1.3 ([02b517d](https://github.com/Fdawgs/docsmith/commit/02b517d6e89ce2417cb5c8826b6382ff6191d72f))

### [2.0.1](https://github.com/Fdawgs/docsmith/compare/v2.0.0...v2.0.1) (2021-05-04)


### Dependencies

* **deps:** bump fastify from 3.15.0 to 3.15.1 ([2bd34e3](https://github.com/Fdawgs/docsmith/commit/2bd34e39ad4e31f8f56fc582f72ff968e5be20fd))
* **deps:** bump GoogleCloudPlatform/release-please-action ([de4e042](https://github.com/Fdawgs/docsmith/commit/de4e042de480de97c036500f95527d7efbae138a))


### Documentation

* **readme:** compress duplicate setup steps into a single section ([#139](https://github.com/Fdawgs/docsmith/issues/139)) ([c9e8acb](https://github.com/Fdawgs/docsmith/commit/c9e8acb1be2efe8426e7348cf2e048eaea3490c5))

## [2.0.0](https://github.com/Fdawgs/docsmith/compare/v1.0.0...v2.0.0) (2021-04-30)


### ⚠ BREAKING CHANGES

* remove support for nodejs v10, as it is EOL as of 2021-04-30

### Features

* **config:** allow for rate and process limits to be user configured ([b90829e](https://github.com/Fdawgs/docsmith/commit/b90829e6ff6d3ab6fbd7f018d8110658b66054b0))
* **server:** add process-load/503 handling ([df5e17c](https://github.com/Fdawgs/docsmith/commit/df5e17c6cf04def7f7afc7a9e55b8b2c3dbd1950))
* **server:** add rate limiter ([f0f531a](https://github.com/Fdawgs/docsmith/commit/f0f531a3085233787ea7f20b2849b8d9eca5a2ff))
* **server:** disable google floc support ([1e630cd](https://github.com/Fdawgs/docsmith/commit/1e630cd88727bdb6d383cf9fd00159fa3eac8446))


### Bug fixes

* **env:** add missing cors_allow_credentials variable ([3243de8](https://github.com/Fdawgs/docsmith/commit/3243de8b0bfb185476d7f7ed8507a664177a6b69))
* **routes:** hide options routes from swagger docs ([e939c6e](https://github.com/Fdawgs/docsmith/commit/e939c6e292e358c66dbed8a58ae80c517303a82b))


### Continuous integration

* add nodejs v16 to unit test matrix ([afd12cb](https://github.com/Fdawgs/docsmith/commit/afd12cb03cd069386ae25dda6e514573d3fac522))
* do not run coveralls steps/jobs on forks ([1772604](https://github.com/Fdawgs/docsmith/commit/1772604e6abab87b680ff0257100156dc1ec8955))
* **link-check:** fix skip regex ([a550745](https://github.com/Fdawgs/docsmith/commit/a5507458bad35176c2c7331285c3c1eaffb426dd))
* **typoci:** add "pino" to excluded words ([1ad49f7](https://github.com/Fdawgs/docsmith/commit/1ad49f7f00f8e1fb7ecfac58c61c025ff6669cd8))


### Miscellaneous

* **env:** add whitespace ([9f54234](https://github.com/Fdawgs/docsmith/commit/9f5423473bcca2153d99772abedd280d6abdc6c6))
* remove support for nodejs v10 ([8160087](https://github.com/Fdawgs/docsmith/commit/8160087c3a99c277f1eee8001c84e8aeafce973c))


### Documentation

* grammar and readability fixes ([b5a5cb5](https://github.com/Fdawgs/docsmith/commit/b5a5cb541dd9abd5517d39b967d68329b9fd6fd2))


### Dependencies

* **deps-dev:** bump autocannon from 7.0.5 to 7.2.0 ([84859b3](https://github.com/Fdawgs/docsmith/commit/84859b3418580663e7b33fbcfd4ae38396a9d13e))
* **deps-dev:** bump eslint from 7.23.0 to 7.25.0 ([f8aef5d](https://github.com/Fdawgs/docsmith/commit/f8aef5db994a73c9c257132415730561a4cf8735))
* **deps-dev:** bump eslint-config-prettier from 8.1.0 to 8.3.0 ([89cd18d](https://github.com/Fdawgs/docsmith/commit/89cd18d5f5cc07a07dd72bb848e62ca0ea98a2dd))
* **deps-dev:** bump eslint-plugin-jest from 24.3.4 to 24.3.6 ([21b7774](https://github.com/Fdawgs/docsmith/commit/21b7774b04089581bcde8ea7742fefa246d10caa))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.3.0 to 33.0.0 ([67675e7](https://github.com/Fdawgs/docsmith/commit/67675e795ab2c87a2383df5cbe076e33b012df83))
* **deps-dev:** bump eslint-plugin-promise from 4.3.1 to 5.1.0 ([4fc40c4](https://github.com/Fdawgs/docsmith/commit/4fc40c47582eeeeab46724cf4add869d6b114fd8))
* **deps-dev:** bump faker from 5.5.2 to 5.5.3 ([90364df](https://github.com/Fdawgs/docsmith/commit/90364df838a892edd8c51e22db64b97ab6c906c4))
* **deps:** bump actions/cache from v2.1.4 to v2.1.5 ([9da2f5c](https://github.com/Fdawgs/docsmith/commit/9da2f5c8eb283aa12f9be99e3d95f575f0a7c1b0))
* **deps:** bump actions/github-script from v3.1.1 to v4.0.2 ([f4c710d](https://github.com/Fdawgs/docsmith/commit/f4c710df1c1c1ec61201077f27d4138f9b77569c))
* **deps:** bump actions/upload-artifact from v2.2.2 to v2.2.3 ([e88d734](https://github.com/Fdawgs/docsmith/commit/e88d734606c9175116e3d4713c6605f94403f1b2))
* **deps:** bump brpaz/hadolint-action from v1.3.1 to v1.4.0 ([961f53f](https://github.com/Fdawgs/docsmith/commit/961f53f1e899b58c85450d4f765b9faeb8814b65))
* **deps:** bump fastify from 3.14.1 to 3.15.0 ([47cf69f](https://github.com/Fdawgs/docsmith/commit/47cf69f9dfba5b351e4ea34493d4979d171efa3e))
* **deps:** bump fastify-autoload from 3.6.0 to 3.7.1 ([a17afc1](https://github.com/Fdawgs/docsmith/commit/a17afc1298bbc4bdab938b0f6a21a3fbab04b3f2))
* **deps:** bump fastify-cors from 5.2.0 to 6.0.0 ([0867803](https://github.com/Fdawgs/docsmith/commit/08678035875737bc255451d8c1812e3f1e3f1e41))
* **deps:** bump fastify-disablecache from 1.0.6 to 2.0.0 ([7a4be40](https://github.com/Fdawgs/docsmith/commit/7a4be4039383705e1d0d347dc310dbcbd958916a))
* **deps:** bump fastify-swagger from 4.5.0 to 4.7.0 ([69168bb](https://github.com/Fdawgs/docsmith/commit/69168bbf1e459976014cfdcb9a876845a9e6a1ac))
* **deps:** bump GoogleCloudPlatform/release-please-action ([bd8b7d9](https://github.com/Fdawgs/docsmith/commit/bd8b7d9cdc1d9df973c527d6788a57c72edad55a))
* **deps:** bump jsdom from 16.5.2 to 16.5.3 ([fead6c2](https://github.com/Fdawgs/docsmith/commit/fead6c2197b438870ba5ac072dd8f40fa37a1585))
* **deps:** bump node-poppler from 2.4.1 to 3.0.0 ([22f815a](https://github.com/Fdawgs/docsmith/commit/22f815a383b8124645d8bd266e8df2c766a4a9ee))
* **deps:** bump node-unrtf from 1.1.1 to 2.0.0 ([8dc5099](https://github.com/Fdawgs/docsmith/commit/8dc50991f5cd36bfb186b672d7e8489a9b835157))
* **deps:** bump pino from 6.11.2 to 6.11.3 ([ccdc74c](https://github.com/Fdawgs/docsmith/commit/ccdc74c449c22592739ada5210e236a3c23cd28c))
* **deps:** bump typoci/spellcheck-action from v0.4.0 to v1.1.0 ([dcd73cf](https://github.com/Fdawgs/docsmith/commit/dcd73cf4902bcc4b3fa618962f2eb6dfdd8e9652))

## [1.0.0](https://github.com/Fdawgs/docsmith/compare/v0.1.0...v1.0.0) (2021-04-06)


### ⚠ BREAKING CHANGES

* `CORS_METHODS` env variable removed

### Features

* add support for cors preflight requests ([e97d974](https://github.com/Fdawgs/docsmith/commit/e97d9747034bc10f9a37743770d821b38d34f254))
* **config:** support `access-control-allow-credentials` cors header ([cc8a89c](https://github.com/Fdawgs/docsmith/commit/cc8a89cf6ac5209a8b1bf90ca92d3d87d1b9339c))
* **server:** use `strict-origin-when-cross-origin` referrer policy ([22b5311](https://github.com/Fdawgs/docsmith/commit/22b5311122ec2fb0306e46c605274d5f9f581f6b))


### Bug fixes

* **config:** comma-delimited string support for cors origin value ([4e74ecd](https://github.com/Fdawgs/docsmith/commit/4e74ecdb25044fab8ba552aef9d8a63878867d22))
* **docker:** use node command over npm ([74c019d](https://github.com/Fdawgs/docsmith/commit/74c019d484384a7476c278f45cfc482484954503))


### Miscellaneous

* **env.template:** add note discouraging reflecting cors origin ([e6dcc90](https://github.com/Fdawgs/docsmith/commit/e6dcc9076867e3e176a86095397bcc3ff74fcd75))
* **server:** clarify on secure child context ([b61c870](https://github.com/Fdawgs/docsmith/commit/b61c87095f6aa065c850b968e5731ef85cd986f1))
* **server:** use new exposed CSP dir from `fastify-helmet` ([9fcdf75](https://github.com/Fdawgs/docsmith/commit/9fcdf75c410499f2add833a6563438e4f92f9987))


### Continuous integration

* add cleanup-run job ([707c983](https://github.com/Fdawgs/docsmith/commit/707c9838129cde58c77c185eddab297465228861))


### Dependencies

* **deps-dev:** bump @commitlint/cli from 12.0.1 to 12.1.1 ([fbf78ef](https://github.com/Fdawgs/docsmith/commit/fbf78ef41b130a8c7c3fa4dc332d568755dd9f6e))
* **deps-dev:** bump @commitlint/config-conventional ([b111594](https://github.com/Fdawgs/docsmith/commit/b111594da8e5339fe8d240b2d71c1be87c04089b))
* **deps-dev:** bump eslint-plugin-jest from 24.3.2 to 24.3.4 ([397e2d3](https://github.com/Fdawgs/docsmith/commit/397e2d349504b8a743c3fe9b6432cc89f58e600c))
* **deps-dev:** bump faker from 5.5.1 to 5.5.2 ([49993fc](https://github.com/Fdawgs/docsmith/commit/49993fc69dc42232bab067c997b3b6739b663693))
* **deps:** bump actions/github-script from v3.1.0 to v3.1.1 ([99d3582](https://github.com/Fdawgs/docsmith/commit/99d35820a94bcfe5b0b7856c49a21eb92a069d36))
* **deps:** bump fastify-swagger from 4.4.2 to 4.5.0 ([0c6fae8](https://github.com/Fdawgs/docsmith/commit/0c6fae8ce37e912f4b1187f521c338c93677fcd0))
* **deps:** bump wagoid/commitlint-github-action from v3.0.6 to v3.1.0 ([35a6613](https://github.com/Fdawgs/docsmith/commit/35a661383d3227ea26136f356ede71319c7f4daa))

## [0.1.0](https://github.com/Fdawgs/docsmith/compare/v0.0.3...v0.1.0) (2021-03-30)


### Features

* **routes/pdf/html:** add schema ([57af27e](https://github.com/Fdawgs/docsmith/commit/57af27e95893a809ac114df87a9161edc5fff4aa))
* **routes/pdf/txt:** add pdf-to-txt route and plugin ([56fb784](https://github.com/Fdawgs/docsmith/commit/56fb784d69dae872e369220efe2b22305ea57bc1))


### Bug fixes

* **routes/pdf/html:** options not passed to `tidyCss` function ([f0ba18d](https://github.com/Fdawgs/docsmith/commit/f0ba18dfff4d2a2360db443897d8e13ccb680c23))
* **routes/pdf/html:** remove body from schema validation ([a8e640a](https://github.com/Fdawgs/docsmith/commit/a8e640a7e4123ad0e97e7933ca43f72900176687))


### Continuous integration

* **automerge:** move automerge job into new workflow ([400b525](https://github.com/Fdawgs/docsmith/commit/400b525c2bc6258d461496747f7dcb1bb9f66121))
* **ci:** ignore dependabot prs for commit message linting ([e6620d1](https://github.com/Fdawgs/docsmith/commit/e6620d191a614fb1742877fb5cb2ee4eb75b0957))
* **stale:** shorten workflow name ([4d392aa](https://github.com/Fdawgs/docsmith/commit/4d392aa1c470b9b115dbfe8d0eba2f61c34f4945))
* **workflows:** run only on push and pulls to master branch ([d8eae28](https://github.com/Fdawgs/docsmith/commit/d8eae2892377a9d25d1a52b92c91ba7ed8812c95))


### Dependencies

* bump dependencies ([42736d5](https://github.com/Fdawgs/docsmith/commit/42736d5ab7ab947435e4f1d4336d3d4525f75d1a))
* **deps-dev:** bump eslint from 7.21.0 to 7.23.0 ([d051c24](https://github.com/Fdawgs/docsmith/commit/d051c242378709db742a3d2ae18bf06ecd4fb15b))
* **deps-dev:** bump eslint-plugin-jest from 24.2.1 to 24.3.2 ([3811902](https://github.com/Fdawgs/docsmith/commit/38119025437a8f90b3ca8b6c7594c1427a4d51f0))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.2.0 to 32.3.0 ([caae061](https://github.com/Fdawgs/docsmith/commit/caae061d5dc89a1ae1be6f3a43daaa58ad2b67e1))
* **deps-dev:** bump faker from 5.4.0 to 5.5.1 ([4f7fd4a](https://github.com/Fdawgs/docsmith/commit/4f7fd4a88c2740c5062bc89c7341b3573a4ffd46))
* **deps-dev:** bump husky from 4.3.8 to 6.0.0 ([44ba684](https://github.com/Fdawgs/docsmith/commit/44ba68491a528f5eaec726b56c18ad5141b80063))
* **deps:** bump actions/stale from v3.0.17 to v3.0.18 ([f2f5ce9](https://github.com/Fdawgs/docsmith/commit/f2f5ce96ebf88415a3aab912c1374ff8e2c8f906))
* **deps:** bump fastify from 3.14.0 to 3.14.1 ([4d7cc7c](https://github.com/Fdawgs/docsmith/commit/4d7cc7c9c73c0ac9dba15725000f21fe614c5a78))
* **deps:** bump fastify-disablecache from 1.0.5 to 1.0.6 ([e192d2c](https://github.com/Fdawgs/docsmith/commit/e192d2c54ae81953572a36b05e9e71b661e5b049))
* **deps:** bump fastify-helmet from 5.3.0 to 5.3.1 ([8fab790](https://github.com/Fdawgs/docsmith/commit/8fab790cf3f120f946df0a1a67c90cf0bd023ac5))
* **deps:** bump fastify-swagger from 4.4.1 to 4.4.2 ([79819b7](https://github.com/Fdawgs/docsmith/commit/79819b7c5df0314e1f51a5996be05cb40de8dd4d))
* **deps:** bump GoogleCloudPlatform/release-please-action ([61d0766](https://github.com/Fdawgs/docsmith/commit/61d0766737824b27d87daa1ec833b0763f66a7e5))
* **deps:** bump jsdom from 16.5.0 to 16.5.2 ([2d52f5a](https://github.com/Fdawgs/docsmith/commit/2d52f5a0e672e13d75337b2031fc30c5e6decadc))
* **deps:** bump node-poppler from 2.4.0 to 2.4.1 ([6b5e9b4](https://github.com/Fdawgs/docsmith/commit/6b5e9b49f03dc53ae25abd722502d7f7ada261cc))
* **deps:** bump node-unrtf from 1.1.0 to 1.1.1 ([f1479b8](https://github.com/Fdawgs/docsmith/commit/f1479b89c6bf421a8ef4cb10f4ec3d839a7dc3cc))
* **deps:** bump pino from 6.11.1 to 6.11.2 ([7fc184c](https://github.com/Fdawgs/docsmith/commit/7fc184c8f3918ac471492f1078801998238986e4))
* **deps:** bump typoci/spellcheck-action from v0.3.0 to v0.4.0 ([de7b33e](https://github.com/Fdawgs/docsmith/commit/de7b33e1c0dc6715e889bb1f1210c60767aaafe3))
* **deps:** bump wagoid/commitlint-github-action from v3.0.1 to v3.0.6 ([99e8247](https://github.com/Fdawgs/docsmith/commit/99e8247b4566aa46716fb22e8efe02d953ea0a32))
* **docker:** remove now optional `version` value ([1ffbfbe](https://github.com/Fdawgs/docsmith/commit/1ffbfbe1917a6cdecf2cf3935f06ebd84ad7f55c))


### Miscellaneous

* **config:** document purpose of `if...` statement ([ddee5be](https://github.com/Fdawgs/docsmith/commit/ddee5be0bf428030562730c3bf9c09a8fab5018a))
* **config:** move `pino-pretty` config out of script ([5ad9d1b](https://github.com/Fdawgs/docsmith/commit/5ad9d1b8608a2217761b5b4a5fcc9cae36e29336))
* **plugins/tidy-css:** update inaccurate description ([65b99cc](https://github.com/Fdawgs/docsmith/commit/65b99cc71119713ae3a589d317aece18071a5022))
* **plugins:** add querystring parsing ([ce7bfc5](https://github.com/Fdawgs/docsmith/commit/ce7bfc59a230d2b07ab2f48a34b8c243ed94f0e1))
* **prettierignore:** add yarn lock file ([6b45363](https://github.com/Fdawgs/docsmith/commit/6b45363fbfdb98dbd906feeea892a427916089d8))
* remove contraction usage in comments ([aa0cb08](https://github.com/Fdawgs/docsmith/commit/aa0cb08237e581fd6d2f48613be7bf4b8b97ed28))
* **routes/pdf/html:** replace `let` with `const` ([30b71db](https://github.com/Fdawgs/docsmith/commit/30b71dbf187e492c001a1665eb98f98adf243ee2))
* **tests:** standardise test file names ([ecbd01c](https://github.com/Fdawgs/docsmith/commit/ecbd01c099350e9869c56c56199e58356011abd8))
* **workflows:** rename ci and perf sections ([b316fab](https://github.com/Fdawgs/docsmith/commit/b316fab6d34ecb92b0f141a3eda1cb4ff57038ae))

### [0.0.3](https://github.com/Fdawgs/docsmith/compare/v0.0.2...v0.0.3) (2021-03-03)


### Documentation

* **readme:** fix broken link ([283583d](https://github.com/Fdawgs/docsmith/commit/283583d22b03f98573091490cf08292bfdbb2b6b))


### Dependencies

* **dependabot:** set commit message prefix; lower pull limit ([856c587](https://github.com/Fdawgs/docsmith/commit/856c58799c5057bddb71241ac0b469b5ddd6b9e8))
* **deps-dev:** bump @commitlint/cli from 11.0.0 to 12.0.1 ([#51](https://github.com/Fdawgs/docsmith/issues/51)) ([ef625c2](https://github.com/Fdawgs/docsmith/commit/ef625c2c2910fd9a3143e7f9a7ff667d4ffbfa0a))
* **deps-dev:** bump @commitlint/config-conventional ([3347150](https://github.com/Fdawgs/docsmith/commit/3347150c0d54702cde50810aa473d74eb3df5753))
* **deps-dev:** bump eslint from 7.20.0 to 7.21.0 ([#52](https://github.com/Fdawgs/docsmith/issues/52)) ([b9e5971](https://github.com/Fdawgs/docsmith/commit/b9e59715316c8e87f694bf530f627d117fd0b76b))
* **deps-dev:** bump eslint-config-prettier from 7.2.0 to 8.1.0 ([e75361c](https://github.com/Fdawgs/docsmith/commit/e75361c7783b024be267fd7f18333d05557d0b64))
* **deps-dev:** bump eslint-plugin-jsdoc from 32.0.2 to 32.2.0 ([#49](https://github.com/Fdawgs/docsmith/issues/49)) ([d4b48ee](https://github.com/Fdawgs/docsmith/commit/d4b48eede00854589862671a6e2afda697c2dc1f))
* **deps-dev:** bump lodash from 4.17.20 to 4.17.21 ([#54](https://github.com/Fdawgs/docsmith/issues/54)) ([c34363d](https://github.com/Fdawgs/docsmith/commit/c34363de542f1bdd22beb60941dd2dcefdf5e19b))
* **deps:** bump fastify-autoload from 3.4.2 to 3.5.2 ([#53](https://github.com/Fdawgs/docsmith/issues/53)) ([e87fb6c](https://github.com/Fdawgs/docsmith/commit/e87fb6c2d72d490f7700714173cc4d90cbffe7db))
* **deps:** bump fluent-json-schema from 2.0.3 to 2.0.4 ([#50](https://github.com/Fdawgs/docsmith/issues/50)) ([86ad7e5](https://github.com/Fdawgs/docsmith/commit/86ad7e56bbf8272b3646f4f8b0915db87c40f343))
* **deps:** bump wagoid/commitlint-github-action from v2.2.3 to v3.0.1 ([9166abf](https://github.com/Fdawgs/docsmith/commit/9166abfbe3a65d904428d24d43458c70be6ca999))
* **deps:** specify minor and hotfix versions ([51bfda0](https://github.com/Fdawgs/docsmith/commit/51bfda0ef7814367b40f6c6c51149e95414e82d0))


### Miscellaneous

* add link check workflow ([1934a77](https://github.com/Fdawgs/docsmith/commit/1934a7739d5666c19dd5e53b0890584a8c88538e))
* automate release and changelog generation ([8e39a57](https://github.com/Fdawgs/docsmith/commit/8e39a579632b082a42f98745e0ad867565ebc9f2))
* **codeql:** remove autobuild action ([97da309](https://github.com/Fdawgs/docsmith/commit/97da3098222d9d2475bc836f1e61099b0db02b83))
* **linkcheck:** extend ignored urls ([00cc7a2](https://github.com/Fdawgs/docsmith/commit/00cc7a2d360f69c80202e0c080df299cc1c8cb85))
* **lint-check:** compress patterns ([d93527e](https://github.com/Fdawgs/docsmith/commit/d93527ed40a0954615e521ff416ba4aa8aede364))
* **prettier:** create separate files to allow for CI/CD to use prettier config ([#56](https://github.com/Fdawgs/docsmith/issues/56)) ([5dfdcc7](https://github.com/Fdawgs/docsmith/commit/5dfdcc7caf87f06c1940b273b8cc4388291a1f2c))
* replace stalebot with github action ([6307221](https://github.com/Fdawgs/docsmith/commit/6307221cf390dfddab5d0a308faadbda8a1c010d))
* require `commit-lint` job to pass before automerge ([d52c5e9](https://github.com/Fdawgs/docsmith/commit/d52c5e97bf8d02a597933c04534762c541728b6e))
* update repo name and links ([022c44c](https://github.com/Fdawgs/docsmith/commit/022c44c0dff50dabbea2d7ac198292af9c22924b))
* **vscode:** remove conflicting prettier ext setting ([6668a8b](https://github.com/Fdawgs/docsmith/commit/6668a8bff4f6df541a68988e14f3d459b403ede7))
* **workflows:** move release steps into `cd` workflow ([2c85cfe](https://github.com/Fdawgs/docsmith/commit/2c85cfebe4badfcf1e53d2798f65866c00adb5f7))
* **workflows:** remove redundant comments ([6fa604c](https://github.com/Fdawgs/docsmith/commit/6fa604c123cf9bbc842c58aa6c0ae4ec70803454))
* **workflows:** rename spellcheck workflow ([dcd27cf](https://github.com/Fdawgs/docsmith/commit/dcd27cf0adc718b71dfd4bb3a8b4e517921e9538))
* **workflows:** tidy node-version syntax ([ad3128d](https://github.com/Fdawgs/docsmith/commit/ad3128d3f4cdb94427fb0c29b90ecb15c7d95715))

### [0.0.2](https://github.com/Fdawgs/docsmith/compare/v0.0.1...v0.0.2) (2021-02-18)

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
