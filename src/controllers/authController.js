const authService = require("../services/authService");

const register = async (req, res, next) => {
  try {
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
      return res.status(400).json({
        error: "Email, nombre y contrasena son requeridos",
      });
    }

    const user = await authService.register({ email, name, password });

    res.status(201).json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email y contrasena son requeridos",
      });
    }

    const user = await authService.login({ email, password });

    res.status(200).json({
      status: "ok",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

const logout = (req, res) => {
  res.status(200).json({
    message: "Sesion cerrada correctamente",
  });
};

const me = async (req, res) => {
  res.json(req.user);
};

module.exports = {
  register,
  login,
  logout,
  me,
};
