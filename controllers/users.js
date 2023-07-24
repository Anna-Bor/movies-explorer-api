const { hash } = require('bcryptjs');
const { sign } = require('jsonwebtoken');
const { JWT_DEFAULT_SECRET, JWT_EXPIRES_IN } = require('../environment');
const { ERROR_NAMES } = require('../utils/constants');
const User = require('../models/user');
const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

const { JWT_SECRET = JWT_DEFAULT_SECRET } = process.env;

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  hash(password, 10)
    .then((code) => User.create({
      name,
      email,
      password: code,
    }))
    .then((user) => {
      res.send({
        name,
        email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError());
        return;
      }
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

module.exports.updateCurrentUser = (req, res, next) => {
  const { name, email } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    {
      name,
      email,
    },
    { new: true, runValidators: true },
  )
    .then((user) => {
      if (!user) {
        next(new NotFoundError());
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then(({ _id }) => {
      res.send({
        token: sign({ _id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN }),
      });
    })
    .catch((err) => {
      switch (err.name) {
        case ERROR_NAMES.VALIDATION_ERROR:
          next(new ValidationError());
          break;
        default:
          next(err);
      }
    });
};
