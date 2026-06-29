const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const prisma = require("../prisma/prismaClient");

const register = async ({name, email, password}) => {
    const existingUser = await prisma.user.findUnique({
        where: { email: email },
    });

    if (existingUser) {
        throw new Error("El usuario ya existe");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });

    delete user.password; 

    return user;
};  

const login = async ({email, password}) => {
    const user = await prisma.user.findUnique({
        where: { email: email },
    });

    if(!user) {
        throw new Error("Usuario no encontrado");
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if(!validPassword) {
        throw new Error("Contraseña incorrecta");
    }   

    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '7d' });

    return { token, user: { id: user.id, name: user.name, email: user.email } };
}


const me = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { id: true, name: true, email: true, createdAt: true }})
    return user;
};

module.exports = {
    register,
    login,
    me
}