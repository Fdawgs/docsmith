# docsmith

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/docsmith.svg)](https://github.com/Fdawgs/docsmith/releases/latest/)
![CI](https://github.com/Fdawgs/docsmith/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/docsmith/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/docsmith?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/docsmith/badge.svg)](https://snyk.io/test/github/Fdawgs/docsmith)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> RESTful API for converting clinical documents and files

## Intro

Docsmith is a RESTful API, built using Node.js and the [Fastify](https://www.fastify.io/) web framework, that can convert files from:

-   PDF to HTML
-   PDF to TXT
-   RTF to HTML
-   RTF to TXT

Planned features include:

-   DOC to HTML
-   DOC to TXT
-   DOCX to HTML
-   DOCX to TXT
-   Scanned documents (as PDFs) to TXT

### Why Docsmith?

Docsmith was created out of a need for an open-source document conversion service at [Yeovil District Hospital NHS Foundation Trust](https://yeovilhospital.co.uk/).

Being open-source, with the ability to be self-hosted, enables a data processor (i.e an NHS trust) to confirm that a service is not storing and logging files with confidential patient identifiable data (PID) in them, which is essential for preventing potential GDPR breaches. This is something that the majority of existing closed-source document conversion services cannot offer. Docsmith was built to remedy this.

Before Docsmith, Yeovil District Hospital was using expensive black-box conversion tools that would regularly produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems. GP surgeries in Somerset and Dorset would receive these corrupted documents through [MESH](https://digital.nhs.uk/services/message-exchange-for-social-care-and-health-mesh) and be unable to read them. This resulted in time and money wasted either posting or faxing them again; opening up the potential for further data breaches.

Docsmith enables a data processor to use a robust, GDPR-compliant, open-source document conversion service. In comparison with equivalents in the market today it completes this vital task at a fraction of the cost (free!), whilst also ensuring a higher level of security and privacy for the data subjects.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   Linux only: latest available `poppler-data` and `poppler-utils` binaries
-   Linux and macOS only: latest available `unrtf` binary

## Setup

Perform the following steps before deployment:

1. Clone the repo
2. Navigate to the project directory
3. Run `npm install --ignore-scripts --production` to install dependencies
4. Make a copy of `.env.template` in the root directory and rename it to `.env`
5. Configure the application using the environment variables in `.env`

## Deployment

### Standard Deployment

1. Run `npm start`

The service should be up and running on the port set in the config. You should see the following output in stdout or the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

```json
{
	"level": "info",
	"time": "2020-12-01T09:48:08.612Z",
	"pid": 41896,
	"hostname": "MYCOMPUTER",
	"msg": "Server listening at http://0.0.0.0:8204"
}
```

You can now navigate to http://0.0.0.0:8204/docs to see the API documentation!

### Deploying Using Docker

This requires [Docker](https://www.docker.com/products) installed.

1. Run `docker-compose up`

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Run `npm install -g pm2` to install pm2 globally
2. Launch application with `pm2 start .pm2.config.js`
3. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

**Note:** PM2 will automatically restart the application if `.env` is modified.

## Contributing

Contributions are welcome, and any help is greatly appreciated!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for details on how to get started.
Please adhere to this project's [Code of Conduct](./CODE_OF_CONDUCT.md) when contributing.

## License

`docsmith` is licensed under the [MIT](./LICENSE) license.
