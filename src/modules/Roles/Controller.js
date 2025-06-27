import { Roles } from "./Model.js"

/**
 * @description Get all Roless
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Roles']
    //#swagger.description = 'Obtiene todos los roles activos.'

    const roles = await Roles.findAll();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Roles
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Roles']
    //#swagger.description = 'Obtiene un role por id.'

    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      throw { status: 404, message: "role not found" };
    }
    res.status(200).json(role);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Roles
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Roles']
    //#swagger.description = 'Crea un nuevo role.'
    const { name, description } = req.body;
    if (!name || !description) {
      throw { status: 400, message: "Name and description are required" };
    }
    if (typeof name !== 'string' || typeof description !== 'string') {
      throw { status: 400, message: "Name and description must be strings" };
    }
    if (name.length < 3 || name.length > 50) {
      throw { status: 400, message: "Name must be between 3 and 50 characters" };
    }
    const role = await Roles.create(req.body, {
      validate: true,
    });
    res.status(201).json({
      status: "ok",
      message: "Roles created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Roles
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Roles']
    //#swagger.description = 'Actualiza un role por id.'

    const role = await RolesfindByPk(req.params.id);
    if (!role) {
      throw { status: 404, message: "Roles not found" };
    }
    await role.update(req.body);
    await role.save();
    res.status(200).json({
      status: "ok",
      message: "Roles updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Roles
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Roles']
    //#swagger.description = 'Elimina un role por id.'

    const role = await Roles.findByPk(req.params.id);
    if (!role) {
      throw { status: 404, message: "Roles not found" };
    }
    await role.destroy();
    res.status(204).json({
      status: "ok",
      message: "Roles deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };

