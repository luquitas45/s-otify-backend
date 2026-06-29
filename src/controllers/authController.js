const authService = require("../services/authService");

const register = async (req, res) => {
    const { email, name, password } = req.body;

    if(email && name && password) {
        const user = await authService.register({ email, name, password });
        res.status(201).json({
            status: "ok",
            data: user,
        });
    } else {
        res.status(400).json({ error: "Email, nombre y contraseña son requeridos" });
    }
}


const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                message: "Email y contraseña son requeridos",
            });
        }

        const user = await authService.login({ email, password });

        return res.status(200).json({
            status: "ok",
            data: user,
        });
    } catch (error) {
        return res.status(error.status || 500).json({
            message: error.message || "Error interno del servidor",
        });
    }
};



const logout = (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
    res.status(200).json({ message: "Sesión cerrada correctamente" });
};

const me = async (req, res) => {
    res.json(req.user);
};

module.exports = {
    register,
    login,
    logout,
    me
};