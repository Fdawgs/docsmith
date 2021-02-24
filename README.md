# doccon

[![GitHub Release](https://img.shields.io/github/release/Fdawgs/doccon.svg)](https://github.com/Fdawgs/doccon/releases/latest/)
![CI](https://github.com/Fdawgs/doccon/workflows/CI/badge.svg)
[![Coverage Status](https://coveralls.io/repos/github/Fdawgs/doccon/badge.svg?branch=master)](https://coveralls.io/github/Fdawgs/doccon?branch=master)
[![Known Vulnerabilities](https://snyk.io/test/github/Fdawgs/doccon/badge.svg)](https://snyk.io/test/github/Fdawgs/doccon)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat)](https://github.com/prettier/prettier)

> RESTful API for converting clinical documents/files

## Intro

This RESTful API converts files from:

-   PDF or RTF to HTML
-   PDF to TXT
-   Any file format to [Binary](https://www.hl7.org/fhir/STU3/binary.html) STU3 (3.0.1) HL7® FHIR® resource adhering to its [NHS INTEROPen CareConnect profile](https://nhsconnect.github.io/CareConnectAPI/api_documents_binary.html)
-   Any file format to [DocumentReference](https://www.hl7.org/fhir/STU3/documentreference.html) STU3 (3.0.1) HL7® FHIR® resource adhering to its [NHS INTEROPen CareConnect profile](https://nhsconnect.github.io/CareConnectAPI/api_documents_documentreference.html)

It was initially created to replace a previously purchased PDF-to-HTML conversion tool at [Yeovil District Hospital NHS Foundation Trust](https://yeovilhospital.co.uk/). The tool, that was no longer supported, would produce unreadable documents with issues such as text running off the page, paragraphs overlapping each other, and Windows-1252 to UTF-8 character encoding problems. GP surgeries were receiving these documents through [MESH](https://digital.nhs.uk/services/message-exchange-for-social-care-and-health-mesh) and were unable to read a number of them, leading to requests for the original document to be faxed over.

## Prerequisites

-   [Node.js](https://nodejs.org/en/)
-   Linux only: latest available `poppler-data` and `poppler-utils` binaries
-   Linux and macOS only: latest available `unrtf` binary

## Deployment

### Standard Deployment

1. Navigate to the repo
2. Run `npm install --ignore-scripts --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the environment variables in `.env`
5. Run `npm start`

The service should now be up and running on the port set in the config. You should see the following output in stdout or the log file specified using the `LOG_ROTATION_FILENAME` environment variable:

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

1. Make a copy of `.env.template` in the root directory and rename to `.env`
2. Configure the application using the global variables in `.env`
3. Run `docker-compose up`

### Deploying Using PM2

If you are unable to deploy this into production using Docker, it is recommended that you use a process manager such as [PM2](https://pm2.keymetrics.io/).

1. Navigate to the repo
2. Run `npm install --ignore-scripts --production` to install dependencies
3. Make a copy of `.env.template` in the root directory and rename to `.env`
4. Configure the application using the global variables in `.env`
5. Run `npm install -g pm2` to install pm2 globally
6. Launch application with `pm2 start .pm2.config.js`
7. Check the application has been deployed using `pm2 list` or `pm2 monit`

#### To Install as a Windows Service:

If using a Microsoft Windows OS utilise [pm2-installer](https://github.com/jessety/pm2-installer) to install PM2 as a Windows service.

**Note:** PM2 has been configured to automatically restart the application if modifications are made to `.env`.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for more details regarding contributing to this project.

## License

`doccon` is licensed under the [MIT](./LICENSE) license.
