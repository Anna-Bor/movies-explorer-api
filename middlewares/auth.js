const jwt = require('jsonwebtoken');
const { JWT_DEFAULT_SECRET, JWT_HEADER_NAME } = require('../environment');
const AuthorizationError = require('../errors/AuthorizationError');

const { JWT_SECRET = JWT_DEFAULT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies[JWT_HEADER_NAME] || req.headers[JWT_HEADER_NAME];
  if (!token) {
    next(new AuthorizationError());
    return;
  }

  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    next(new AuthorizationError());
    return;
  }

  req.user = payload;

  next();
};
