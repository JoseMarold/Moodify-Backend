require("./instrument.js");

var createError = require('http-errors');
const Sentry = require("@sentry/node");
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var signinRouter = require('./routes/signin');
var loginRouter = require('./routes/login');
var verifRouter = require('./routes/verification');
var historicalRouter = require('./routes/historical');
var rekognitionRouter = require('./routes/rekognition');
var recommendationRouter = require('./routes/recommendation');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors({origin: "*"}));
app.use(logger('dev'));
require('dotenv').config();
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/signin', signinRouter);
app.use('/login', loginRouter);
app.use('/verify',verifRouter);
app.use('/historical',historicalRouter);
app.use('/useRekognition',rekognitionRouter);
app.use('/getRecommendations', recommendationRouter);

Sentry.setupExpressErrorHandler(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});

module.exports = app;
