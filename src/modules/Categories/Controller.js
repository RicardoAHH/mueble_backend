import { Categories } from "./Model.js"

/**
 * @description Get all Categoriess
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Obtiene todos los categories activos.'

    const categories = await Categories.findAll();
    res.status(200).json(categories);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Categories
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Obtiene un categorie por id.'

    const categorie = await Categories.findByPk(req.params.id);
    if (!categorie) {
      throw { status: 404, message: "categorie not found" };
    }
    res.status(200).json(categorie);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Categories
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Crea un nuevo categorie.'
    const { name, description, icon } = req.body;
    if (!name || !description) {
      throw { status: 400, message: "Name and description are required" };
    }
    if (icon && typeof icon !== 'string') {
      throw { status: 400, message: "Icon must be a string" };
    }
    const categorie = await Categories.create(req.body, {
      validate: true,
    });
    res.status(201).json({
      status: "ok",
      message: "Categories created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Categories
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Actualiza un categorie por id.'

    const categorie = await CategoriesfindByPk(req.params.id);
    if (!categorie) {
      throw { status: 404, message: "Categories not found" };
    }
    await categorie.update(req.body);
    await categorie.save();
    res.status(200).json({
      status: "ok",
      message: "Categories updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Categories
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Categories']
    //#swagger.description = 'Elimina un categorie por id.'

    const categorie = await Categories.findByPk(req.params.id);
    if (!categorie) {
      throw { status: 404, message: "Categories not found" };
    }
    await categorie.destroy();
    res.status(204).json({
      status: "ok",
      message: "Categories deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };

