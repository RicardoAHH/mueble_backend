/**
 * @module UsersController
 * @description Controlador para gestionar las operaciones relacionadas con los usuarios.
 */
import { hash } from "bcrypt";
import { Users } from "./Model.js"

/**
 * @description Obtiene todos los usuarios activos.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con una lista de usuarios activos.
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Obtiene todos los usuarios activos.'
    const users = await Users.findAll({
      where: { status: true },
      attributes: { exclude: ["password"] },
      include: ["role"],
    });
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Obtiene un usuario por su ID.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Number} req.params.id - ID del usuario a obtener.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con los datos del usuario solicitado.
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Obtiene un usuario por su ID.'

    const user = await Users.findByPk(req.params.id, {
      include: ["role"],
    });

    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Crea un nuevo usuario.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con un mensaje de éxito si el usuario es creado correctamente.
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Crea un nuevo usuario.'
    const { name, lastname, email, password } = req.body;
    if (!name || !lastname || !email || !password) {
      throw { status: 400, message: "Missing fields" };
    }

    const existingUser = await Users.findOne({ where: { email: req.body.email } });

    if (existingUser) {
      throw { status: 400, message: "Email already exists" };
    }

    req.body.password = await hash(req.body.password, 10);

    await Users.create(req.body, {
      validate: true,
    });

    res.status(201).json({
      status: "ok",
      message: "User created successfully"
    });

  } catch (error) {
    next(error);
  }
};

/**
 * @description Actualiza los datos de un usuario existente.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Number} req.params.id - ID del usuario a actualizar. 
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con los datos actualizados del usuario.
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Actualiza los datos de un usuario existente.'  
    const { name, lastname, email, password } = req.body;

    if (!name && !lastname && !email && !password) {
      throw { status: 400, message: "No data to update" };
    }

    const users = await Users.findByPk(req.params.id);
    if (!users) {
      throw { status: 404, message: "Users not found" };
    }
    await users.update(req.body);
    await users.save();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Elimina (desactiva) un usuario por su ID. (Borrado lógico)
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Number} req.params.id - ID del usuario a eliminar.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con un estado 204 si la operación es exitosa.
 */
export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Elimina (desactiva) un usuario por su ID. (Borrado lógico)'
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }
    await user.update({ status: false });
    await user.save();
    res.status(204).json();
  } catch (error) {
    next(error);
  }
};

/**
  * @description Restaura un usuario previamente desactivado.
  * @param {Request} req - Objeto de solicitud HTTP.
  * @param {Number} req.params.id - ID del usuario a restaurar.
  * @param {Response} res - Objeto de respuesta HTTP.
  * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
  * @returns {Promise<void>} Responde con los datos del usuario restaurado.
  */
export const restore = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Restaura un usuario previamente desactivado.'
    const user = await Users.findByPk(req.params.id);
    if (!user) {
      throw { status: 404, message: "Users not found" };
    }
    await user.update({ status: true });
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
}

/**
 * @description Obtiene el perfil del usuario autenticado.
 * @param {Request} req - Objeto de solicitud HTTP.
 * @param {Response} res - Objeto de respuesta HTTP.
 * @param {NextFunction} next - Función para pasar el control al siguiente middleware.
 * @returns {Promise<void>} Responde con los datos del perfil del usuario autenticado.
 */
export const profile = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    const user = await Users.findByPk(req.auth.id);
    if (!user) {
      throw { status: 404, message: "Users not found" };
    }

    res.status(200).json(user);

  } catch (error) {
    next(error);
  }
}

/**
 * Cambia la contraseña de un usuario autenticado.
 *
 * @async
 * @function changePassword
 * @param {Object} req - Objeto de solicitud HTTP.
 * @param {Object} req.auth - Información de autenticación del usuario.
 * @param {number} req.auth.id - ID del usuario autenticado.
 * @param {Object} req.body - Cuerpo de la solicitud HTTP.
 * @param {string} req.body.oldPassword - Contraseña actual del usuario.
 * @param {string} req.body.newPassword - Nueva contraseña para el usuario.
 * @param {Object} res - Objeto de respuesta HTTP.
 * @param {Function} next - Función para pasar el control al siguiente middleware.
 * @throws {Object} Si el usuario no es encontrado, lanza un error con estado 404.
 * @throws {Object} Si la contraseña actual es inválida, lanza un error con estado 401.
 * @returns {void} Responde con un mensaje de éxito si la contraseña se cambia correctamente.
 */
export const changePassword = async (req, res, next) => {
  try {
    //#swagger.tags = ['Users']
    //#swagger.description = 'Cambia la contraseña de un usuario autenticado.'
    const { id } = req.auth;
    const { oldPassword, newPassword } = req.body;

    const user = await Users.findByPk(id);
    if (!user) {
      throw { status: 404, message: "User not found" };
    }

    const validPassword = await compare(oldPassword, user.password);

    if (!validPassword) {
      throw { message: "Invalid email or password", status: 401 };
    }

    const hashedPassword = await hash(newPassword, 10);

    await user.update({ password: hashedPassword });
    await user.save();
    res.status(200).json({ message: "Password changed successfully" });
  } catch (error) {
    next(error);
  }

}


export default { index, show, store, update, destroy, restore, profile, changePassword };