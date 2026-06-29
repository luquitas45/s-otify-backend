const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  //Autorizacion de la req.
  const authHeader = req.headers.authorization;

  //Si no hay token.
  if (!authHeader) {
    const error = new Error("Se necesita token");
    error.statusCode = 401;
    return next(error);
  }

  //Destructuring del token.
  const [type, token] = authHeader.split(" ");

  if (type !== "Bearer" || !token) {
    const error = new Error("Formato de token no valido.");
    error.statusCode = 401;
    return next(error);
  }

  //try si el token esta activo/coincide
  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (error) {
    const authError = new Error("Token no valido");
    authError.statusCode = 403;
    next(authError);
  }
};

module.exports = authMiddleware;
