import jwt from "jsonwebtoken";
import config from "#config/index.js";

/**
 * @description Middleware to verify if the token is valid
 * @param {object} req - Request object
 * @param {object} res - Response object
 * @param {function} next - Next function
 * @returns {object} - Status code and message
 */
export function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token || req.headers["authorization"];

    if (!token) {
      return res
        .status(401)
        .json({ message: "Access denied. No token provided." });
    }

    const decoded = jwt.verify(token, config.jwtSecret);

    req.auth = decoded;

    next();

  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token has expired." });
    }
    res.status(400).json({ message: "Invalid token." });
  }
}

export default authMiddleware;
