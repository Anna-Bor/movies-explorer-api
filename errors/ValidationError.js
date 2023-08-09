const {
  ERROR_NAMES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require('../utils/constants');

class ValidationError extends Error {
  constructor(message) {
    super(message ?? ERROR_MESSAGES.VALIDATION_ERROR);
    this.name = ERROR_NAMES.VALIDATION_ERROR;
    this.statusCode = ERROR_CODES.VALIDATION_ERROR;
  }
}

module.exports = ValidationError;
