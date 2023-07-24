const express = require('express');
const { connect, connection } = require('mongoose');
const {
  EXPRESS_ENABLE_EXTENDED_URL_ENCODE,
  EXPRESS_RATE_LIMIT_LEGACY_HEADERS,
  EXPRESS_RATE_LIMIT_MAX,
  EXPRESS_RATE_LIMIT_STANDARD_HEADERS,
  EXPRESS_RATE_LIMIT_WINDOW_MS,
  EXPRESS_SERVER_PORT,
  MONGOOSE_AUTO_INDEX,
  MONGOOSE_CONNECTION_STRING,
  MONGOOSE_USE_NEW_URL_PARSER,
  MONGOOSE_USE_UNIFIED_TOPOLOGY,
} = require('./environment');
const { requestLogger, errorLogger } = require('./middlewares/logger');

require('dotenv').config();

const { PORT = EXPRESS_SERVER_PORT } = process.env;

connect(MONGOOSE_CONNECTION_STRING, {
  useUnifiedTopology: MONGOOSE_USE_UNIFIED_TOPOLOGY,
  useNewUrlParser: MONGOOSE_USE_NEW_URL_PARSER,
  autoIndex: MONGOOSE_AUTO_INDEX,
});
connection.syncIndexes().catch(global.console.error);

const app = express();

app.use(require('cors')());

app.use(express.json());
app.use(express.urlencoded({ extended: EXPRESS_ENABLE_EXTENDED_URL_ENCODE }));
app.use(require('cookie-parser')());

app.use(
  require('express-rate-limit')({
    windowMs: EXPRESS_RATE_LIMIT_WINDOW_MS,
    max: EXPRESS_RATE_LIMIT_MAX,
    standardHeaders: EXPRESS_RATE_LIMIT_STANDARD_HEADERS,
    legacyHeaders: EXPRESS_RATE_LIMIT_LEGACY_HEADERS,
  }),
);

app.use(require('helmet')());

app.use(requestLogger);

app.use(require('./routes'));

app.use(errorLogger);

app.use(require('celebrate').errors());

app.use(require('./errors/errorHandler'));

app.listen(PORT, () => {
  global.console.log(`App listening on port ${PORT}`);
});
