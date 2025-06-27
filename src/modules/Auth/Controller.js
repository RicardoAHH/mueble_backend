import { Users } from "#modules/Users/Model.js";
import config from "#config/index.js";
import jwt from "jsonwebtoken";
import { compare, hash } from "bcrypt";


/**
 * Inicia sesión un usuario autenticado.
 *
 * @async
 * @function login
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene las credenciales del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Devuelve una respuesta HTTP con el estado de la autenticación.
 * 
 * @throws {Error} Si ocurre un error inesperado durante el proceso de inicio de sesión.
 * 
 * @description
 * Este controlador verifica las credenciales proporcionadas por el usuario. Si las credenciales son válidas,
 * genera un token JWT, lo almacena en una cookie segura y devuelve una respuesta exitosa. Si las credenciales
 * son inválidas o el usuario no está activo, devuelve un error de autenticación.
 */

async function login(req, res, next) {
  try {
    //#swagger.tags = ['Auth']
    const { jwtSecret, env } = config;
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await Users.findOne({ where: { email }, include: ["role"] });
    if (!user || user.status !== "active") {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const validPassword = await compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // para 24h -> expiresIn: "24h"
    const token = jwt.sign({ id: user.id }, jwtSecret, { expiresIn: "15m" });

    res.cookie("token", token, {
      httpOnly: true,
      secure: env === "production",
      // valores posibles: "strict" for same-site cookies, "lax" for cross-origin cookies, "none" for no restrictions
      sameSite: env === "production" ? "strict" : "lax",
      //  para 24 horas utilizar maxage: 24 * 60 * 60 * 1000
      maxAge: 15 * 60 * 1000,
    });

    res.status(200).json({
      status: "ok",
      message: "Login successful",
      token,
    });

  } catch (error) {
    next(error);
  }
}

/**
 * Registra un nuevo usuario en el sistema.
 *
 * @async
 * @function register
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.body - Cuerpo de la solicitud que contiene los datos del usuario.
 * @param {string} req.body.name - Nombre del usuario.
 * @param {string} req.body.lastname - Apellido del usuario.
 * @param {string} req.body.email - Correo electrónico del usuario.
 * @param {string} req.body.password - Contraseña del usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con un estado HTTP y un mensaje indicando el resultado del registro.
 * @throws {Error} Pasa cualquier error al middleware de manejo de errores.
 */
async function register(req, res, next) {
  try {
    //#swagger.tags = ['Auth']
    const { name, lastname, email, password } = req.body;

    if (!name || !lastname || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await hash(password, 10);
    const role_id = 2
    await Users.create({ name, lastname, email, role_id, password: hashedPassword });

    res.status(201).json({
      status: "ok",
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Cierra la sesión del usuario eliminando la cookie de autenticación.
 *
 * @async
 * @function logout
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @returns {void}
 * @throws {Error} Si ocurre un error durante el proceso de cierre de sesión.
 */
async function logout(req, res, next) {
  try {
    //#swagger.tags = ['Auth']
    res.clearCookie("token");
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    next(error);
  }
}


export { login, register, logout };