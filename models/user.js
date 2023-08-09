const { Schema, model } = require('mongoose');
const { isEmail } = require('validator');
const { compare } = require('bcryptjs');
const { VALIDATION_ERROR } = require('../utils/constants').ERROR_MESSAGES;
const AuthorizationError = require('../errors/AuthorizationError');

const userSchema = new Schema({
  name: {
    type: String,
    minLength: 2,
    maxLength: 30,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (email) => isEmail(email),
      message: VALIDATION_ERROR,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email }, { runValidators: true })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new AuthorizationError());
      }

      return compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new AuthorizationError());
        }

        return user;
      });
    });
};

module.exports = model('user', userSchema);
