const Fastify = require("fastify");
const startServer = require("./server");
const getConfig = require("./config");

/**
 * @author Frazer Smith
 * @description Start server.
 */
const main = async () => {
	process.on("unhandledRejection", (err) => {
		// eslint-disable-next-line no-console
		console.error(err);
		process.exit(1);
	});

	const config = await getConfig();

	const server = Fastify(config.fastifyInit);
	server.register(startServer, config);
	await server.listen(config.fastify);

	["SIGINT", "SIGTERM"].forEach((signal) => {
		// Use once() so that double signals exits the app
		process.once(signal, async () => {
			server.log.info({ signal }, "Closing application");
			try {
				await server.close();
				server.log.info({ signal }, "Application closed");
				process.exit(0);
			} catch (err) {
				server.log.error({ err }, "Error closing the application");
				process.exit(1);
			}
		});
	});
};

main();
