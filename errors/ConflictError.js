const {
  ERROR_MESSAGES,
  ERROR_NAMES,
  ERROR_CODES,
} = require('../utils/constants');

class ConflictError extends Error {
  constructor(message) {
    super(message ?? ERROR_MESSAGES.CONFLICT_ERROR);
    this.name = ERROR_NAMES.CONFLICT_ERROR;
    this.statusCode = ERROR_CODES.CONFLICT_ERROR;
  }
}

module.exports = ConflictError;
