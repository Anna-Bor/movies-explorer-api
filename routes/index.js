const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('/', require('./auth'));

router.use(require('../middlewares/auth'));

router.use('/users', require('./users'));

router.use('/movies', require('./movies'));

router.all('*', (req, res, next) => {
  next(new NotFoundError());
});

module.exports = router;
