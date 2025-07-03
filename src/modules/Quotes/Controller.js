import {Quotes}from "./Model.js"
    
 /**
  * @description Get all Quotess
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  */
 export const index = async (req, res, next) => {
   try {
    //#swagger.tags = ['Quotes']
    //#swagger.description = 'Obtiene todos los quotes activos.'

     const quotes = await Quotes.findAll();
     res.status(200).json(quotes);
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Get a single Quotes
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const show = async (req, res, next) => {
   try {
    //#swagger.tags = ['Quotes']
    //#swagger.description = 'Obtiene un quote por id.'

     const quote = await Quotes.findByPk(req.params.id);
     if (!quote) {
       throw { status: 404, message: "quote not found" };
     }
     res.status(200).json(quote);
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Create a new Quotes
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const store = async (req, res, next) => {
   try {
    //#swagger.tags = ['Quotes']
    //#swagger.description = 'Crea un nuevo quote.'

     const quote = await Quotes.create(req.body, {
       validate: true,
     });
     res.status(201).json({
        status: "ok",
        message: "Quotes created successfully",
     });
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Update a Quotes
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 export const update = async (req, res, next) => {
   try {
    //#swagger.tags = ['Quotes']
    //#swagger.description = 'Actualiza un quote por id.'

     const quote = await QuotesfindByPk(req.params.id);
     if (!quote) {
       throw { status: 404, message: "Quotes not found" };
     }
     await quote.update(req.body);
     await quote.save();
      res.status(200).json({
        status: "ok",
        message: "Quotes updated successfully"
      });
   } catch (error) {
     next(error);
   }
 };
 
 /**
  * @description Delete a Quotes
  * @param {Request} req
  * @param {Response} res
  * @param {NextFunction} next
  * @returns {Promise<void>}
  */
 
 export const destroy = async (req, res, next) => {
   try {
    //#swagger.tags = ['Quotes']
    //#swagger.description = 'Elimina un quote por id.'

     const quote = await Quotes.findByPk(req.params.id);
     if (!quote) {
       throw { status: 404, message: "Quotes not found" };
     }
      await quote.destroy();
      res.status(204).json({
        status: "ok",
        message: "Quotes deleted successfully" 
      });
   } catch (error) {
     next(error);
   }
 };
 
 export default { index, show, store, update, destroy };

