/*
Manejo errores forzados o errores que lleguen con next(error)
*/
function errorHandler(err, req, res, next) {
  res.status(500).json({
    error: "Error interno del servidor",
    message: err.message,
  });
}
module.exports = errorHandler;
