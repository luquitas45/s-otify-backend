/*
Responde cuando se solicita ruta no existente
GET http://localhost:3000/api/no-existo
Responde: http 404
*/

function notFound(req, res, next) {
  res
    .status(404)
    .json({ error: "No encontrado", message: "Ruta no encontrada" });
}

module.exports = notFound;
