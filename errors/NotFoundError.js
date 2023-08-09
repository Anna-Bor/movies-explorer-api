const {
  ERROR_NAMES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require('../utils/constants');

class NotFoundError extends Error {
  constructor(message) {
    super(message ?? ERROR_MESSAGES.NOT_FOUND_ERROR);
    this.name = ERROR_NAMES.NOT_FOUND_ERROR;
    this.statusCode = ERROR_CODES.NOT_FOUND_ERROR;
  }
}

module.exports = NotFoundError;
