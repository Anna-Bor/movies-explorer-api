const {
  ERROR_NAMES,
  ERROR_CODES,
  ERROR_MESSAGES,
} = require('../utils/constants');

class AuthorizationError extends Error {
  constructor(message) {
    super(message ?? ERROR_MESSAGES.AUTHORIZATION_ERROR);
    this.name = ERROR_NAMES.AUTHORIZATION_ERROR;
    this.statusCode = ERROR_CODES.AUTHORIZATION_ERROR;
  }
}

module.exports = AuthorizationError;
