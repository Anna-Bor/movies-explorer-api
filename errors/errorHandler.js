const { ERROR_CODES, ERROR_MESSAGES } = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || ERROR_CODES.GENERAL_ERROR;
  const message = statusCode === ERROR_CODES.GENERAL_ERROR
    ? ERROR_MESSAGES.GENERAL_ERROR
    : err.message;
  res.status(statusCode).send({ message });
  next();
};

module.exports = errorHandler;
