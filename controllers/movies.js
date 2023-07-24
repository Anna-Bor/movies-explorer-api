const Movie = require('../models/movie');
const { ERROR_NAMES } = require('../utils/constants');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const ValidationError = require('../errors/ValidationError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.send(movies))
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;
  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.status(201).send(movie))
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

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .then((movie) => {
      if (!movie) {
        next(new NotFoundError());
        return;
      }
      if (req.user._id !== movie.owner.toString()) {
        next(new ForbiddenError());
        return;
      }
      Movie.deleteOne({
        _id: req.params.cardId,
      })
        .then((deleteResult) => {
          res.send(deleteResult);
        })
        .catch(next);
    })
    .catch(next);
};
