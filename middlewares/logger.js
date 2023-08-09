const { format, transports } = require('winston');
const { errorLogger: winstonErrorLogger, logger } = require('express-winston');

const requestLogger = logger({
  transports: [new transports.File({ filename: 'request.log' })],
  format: format.json(),
});

const errorLogger = winstonErrorLogger({
  transports: [new transports.File({ filename: 'error.log' })],
  format: format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
