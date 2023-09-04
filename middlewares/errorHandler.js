const { ValidationError, Sequelize } = require('sequelize');
const boom = require('@hapi/boom');

function logErrors(err, req, res, next) {
  console.log('logErrors');
  console.error(err);
  next(err);
}

// Middlewares need to have the parameters "req, res, next" and if an error middleware it should be included err at the start.
function errorHandler(err, req, res, next) {
  console.log('errorHandler');
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  }
}

function ormErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      erros: err.errors,
    });
  }
  next(err);
}

// Create a middleware function
function handleSQLError(err, req, res, next) {
  if (err instanceof Sequelize.BaseError) {
    res.status(409).json({ message: err.name, erros: err.errors });
  }
  next(err);
}

module.exports = {
  logErrors,
  errorHandler,
  boomErrorHandler,
  ormErrorHandler,
  handleSQLError,
};
