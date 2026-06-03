function getHealth(req, res) {
  res.status(200).json({
    status: "ok",
    message: "API funcionando correctamente",
  });
}

module.exports = {
  getHealth,
};
