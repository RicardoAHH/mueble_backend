/** 
 * @description Log the error and pass it to the next middleware
 * @param {Error} err 
 */
export const LogError = (err, req, res, next) => {
    console.log("Logging error...");
    console.error(err);
    next(err);
}

/** 
 * @description Send the error message to the client
 * @param {Error} err
 */
export const ErrorHandler = (err, req, res, next) => {
    if (err.isJoi) {
        res.status(400).json({
            message: err.message,
            stack: err?.stack,
        });
        return;
    } 
    res.status(err.status || 500).json({
        message: err.message,
        stack: err?.stack,
    });
}

export default { LogError, ErrorHandler };
