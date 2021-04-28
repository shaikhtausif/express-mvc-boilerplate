const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const authRouter = require('./src/routes');


const app = express();
const debug = require('debug')('myapp:app');


// config
const config = require('./config/config');

// database config
const db = require('./config/db');

// view engine setup
app.set('views', path.join(__dirname, 'app/views'));
app.set('view engine', 'pug');

app.use(logger(config.isProd ? 'combined' : 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(favicon(path.join(__dirname, 'public', 'favicon/favicon.ico')));
app.use(express.static(path.join(__dirname, 'public')));

// bootstrap routes
// require('./app/routes')(app);
app.use('/', require('./src/routes'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message; // eslint-disable-line no-param-reassign
  res.locals.error = config.isDev ? err : {}; // eslint-disable-line no-param-reassign
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.use(express.json());

db.sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
    app.listen(config.server.port, config.server.hostname, () => {
      debug(`App listening on ${config.server.hostname} port: ${config.server.port}`);
      app.emit('appStarted');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = app;