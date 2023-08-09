const {
  ERROR_MESSAGES,
  ERROR_NAMES,
  ERROR_CODES,
} = require('../utils/constants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message ?? ERROR_MESSAGES.FORBIDDEN_ERROR);
    this.name = ERROR_NAMES.FORBIDDEN_ERROR;
    this.statusCode = ERROR_CODES.FORBIDDEN_ERROR;
  }
}

module.exports = ForbiddenError;
