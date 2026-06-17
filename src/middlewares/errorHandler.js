
function errorHandler(err, req, res, next) {
  const status = err.statusCode || 500;
  const response = {
    error: status === 500 ? "Error interno del servidor" : err.message,
  };

  if (err.details) {
    response.details = err.details;
  }

  res.status(status).json(response);
}
module.exports = errorHandler;
