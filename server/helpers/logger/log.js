const { createLogger, format, transports } = require('winston'),
	NODE_ENV = process.env.NODE_ENV;

const myFormat = format.printf(
	({ level, message, label, timestamp }) =>
		`${level}: ${timestamp} [${label}]: ${message}`
);

module.exports = moduleFilename => {
	const logger = createLogger({
		level: 'info',
		format: format.combine(
			format.timestamp({
				format: 'YYYY.MM.DD (HH:mm:ss)'
			}),
			format.errors(/* { stack: true } */),
			format.splat()
		),

		defaultMeta: { moduleFilename },
		transports: [
			new transports.Console({
				format: format.combine(
					format.colorize(),
					format.label({ label: moduleFilename }),
					myFormat
				)
			})
		]
	});

	if (NODE_ENV === 'production') {
		logger.add(
			new transports.File({
				filename: './error.log',
				level: 'error',
				format: format.combine(format.json())
			})
		);
	}

	return logger;
};
