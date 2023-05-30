<img alttext="Docsmith logo" src="https://raw.githubusercontent.com/Fdawgs/docsmith/main/docs/images/docsmith-logo.svg" width="480" height="auto" />

# Docsmith

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/docsmith.svg)](https://github.com/Fdawgs/docsmith/releases/latest/)
![CI](https://github.com/Fdawgs/docsmith/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/docsmith/badge.svg?branch=main)](https://coveralls.io/github/Fdawgs/docsmith?branch=main)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> RESTful API for converting clinical documents and files

## Overview

Docsmith is a RESTful API, built using Node.js and the [Fastify](https://fastify.io/) web framework, that can convert a range of files:

| Input | Output | Notes                                      |
| ----- | ------ | ------------------------------------------ |
| DOC   | TXT    | DOT file variant also supported            |
| DOCX  | HTML   | DOCM, DOTM, and DOTX file variants also supported |
| DOCX  | TXT    |                                                   |
| DOTX  | TXT    |                                                   |
| HTML  | TXT    |                                                   |
| PDF   | HTML   |                                                   |
| PDF   | TXT    | Scanned documents also supported using OCR        |
| RTF   | HTML   | Images are removed                                |
| RTF   | TXT    |                                                   |

### Why Docsmith?

Docsmith was created in my spare time outside of work after identifying the need for an open-source document conversion service at Yeovil Hospital (ran by [Somerset NHS Foundation Trust](https://www.somersetft.nhs.uk/)).

Being open-source, with the ability to be self-hosted, enables a data processor (i.e. an NHS trust) to confirm that a service is not storing and logging files with confidential patient identifiable data (PID) in them, which is essential for preventing potential GDPR breaches. This is something that the majority of existing closed-source document conversion services cannot offer. Docsmith was built to remedy this.

Before Docsmith, Yeovil Hospital was using expensive proprietary conversion tools that would regularly produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems. GP surgeries in Somerset and Dorset would receive these corrupted documents through [MESH](https://digital.nhs.uk/services/message-exchange-for-social-care-and-health-mesh) and be unable to read them. This resulted in time and money wasted either posting or faxing them again, opening up the potential for further data breaches.

Docsmith enables a data processor to use a comprehensive, GDPR-compliant, open-source document conversion service. In comparison with equivalents in the market today it completes this vital task at a fraction of the cost (free!), whilst also ensuring a higher level of security and privacy for the data subjects.

## Prerequisites

These are only required if running the API outside of Docker:

-   [Node.js](https://nodejs.org/en/) >=18.12.1
-   Linux only: `poppler-data` >=0.4.9
-   Linux only: `poppler-utils` >=20.12.0
-   macOS only: `poppler` >=20.12.0
-   Linux and macOS only: `unrtf` >=0.19.3

## Setup

Perform the following steps before deployment:

1. Download and extract the [latest release asset](https://github.com/Fdawgs/docsmith/releases/latest)
2. Navigate to the extracted directory
3. Make a copy of `.env.template` in the root directory and rename it to `.env`
4. Configure the application using the environment variables in `.env`
5. Place additional trained data into `ocr_lang_data` directory (optional, [info can be found here](./ocr_lang_data/README.md))

> **Note**
> Set the following environment variables in `.env` to meet NHS England's recommendation to retain six months' worth of logs:
>
> -   `LOG_ROTATION_DATE_FORMAT="YYYY-MM-DD"`
> -   `LOG_ROTATION_FREQUENCY="daily"`
> -   `LOG_ROTATION_MAX_LOGS="180d"`

## Deployment

### Standard deployment

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm start`

The service should be up and running on the port set in the config. Output similar to the following should appear in stdout or in the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2022-10-20T07:57:21.459Z",
	"pid": 148,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://127.0.0.1:51173"
}
```

To test it, use [Insomnia](https://insomnia.rest/) and import the example requests from `./test_resources/insomnia_test_requests.json`.

### Deploying using Docker

This requires [Docker](https://docker.com) installed.

1. Run `docker compose up` (or `docker compose up -d` to run in the background)

### Deploying using PM2

If this cannot be deployed into production using Docker, use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm ci --ignore-scripts --omit=dev` to install dependencies
2. Run `npm i -g pm2` to install pm2 globally
3. Launch the application with `pm2 start .pm2.config.js`
4. Check that the application has been deployed using `pm2 list` or `pm2 monit`

#### To install as a Windows service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

> **Note**
> PM2 will automatically restart the application if `.env` is modified.

## Usage

### Accessing API documentation

API documentation can be found at `/docs`:

<img alttext="Screenshot of Docsmith documentation page" src="https://raw.githubusercontent.com/Fdawgs/docsmith/main/docs/images/api_documentation_screenshot.png" width="720">

The underlying OpenAPI definitions are found at `/docs/openapi`.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [the contributing guide](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

`docsmith` is licensed under the [MIT](./LICENSE) license.
