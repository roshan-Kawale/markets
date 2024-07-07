export const errorHandler = (statusCode , message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export const errormiddleware = (err , req , res , next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    })
  }