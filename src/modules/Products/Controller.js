import { Products } from "./Model.js"

/**
 * @description Get all Productss
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
export const index = async (req, res, next) => {
  try {
    //#swagger.tags = ['Products']
    //#swagger.description = 'Obtiene todos los products activos.'

    const products = await Products.findAll();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Get a single Products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const show = async (req, res, next) => {
  try {
    //#swagger.tags = ['Products']
    //#swagger.description = 'Obtiene un product por id.'

    const product = await Products.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "product not found" };
    }
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Create a new Products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const store = async (req, res, next) => {
  try {
    //#swagger.tags = ['Products']
    //#swagger.description = 'Crea un nuevo product.'
    const { name, price, description, images, category_id } = req.body;
    if (!name || !price || !category_id || images && !Array.isArray(images)) {
      throw { status: 400, message: "Name, price, category_id and images are required" };
    }

    const product = await Products.create(req.body, {
      validate: true,
    });
    res.status(201).json({
      status: "ok",
      message: "Products created successfully",
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Update a Products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */
export const update = async (req, res, next) => {
  try {
    //#swagger.tags = ['Products']
    //#swagger.description = 'Actualiza un product por id.'
    const { name, price, description, images, category_id } = req.body;
    if (!name || !price || !category_id || (images && !Array.isArray(images))) {
      throw { status: 400, message: "Name, price, category_id and images are required" };
    }
    const product = await Products.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "Products not found" };
    }
    await product.update(req.body);
    await product.save();
    res.status(200).json({
      status: "ok",
      message: "Products updated successfully"
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @description Delete a Products
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 * @returns {Promise<void>}
 */

export const destroy = async (req, res, next) => {
  try {
    //#swagger.tags = ['Products']
    //#swagger.description = 'Elimina un product por id.'

    const product = await Products.findByPk(req.params.id);
    if (!product) {
      throw { status: 404, message: "Products not found" };
    }
    await product.destroy();
    res.status(204).json({
      status: "ok",
      message: "Products deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};

export default { index, show, store, update, destroy };

