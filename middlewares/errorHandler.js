function logErrors(err, req, res, next) {
  // console.log('logErrors');
  // console.error(err);
  next(err);
}

// Middlewares need to have the parameters "req, res, next" and if an error middleware it should be included err at the start.
function errorHandler(err, req, res, next) {
  // console.log('errorHandler');
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

module.exports = { logErrors, errorHandler, boomErrorHandler };