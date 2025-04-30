import { ErrorRequestHandler } from 'express';
import { CustomError, DbError } from '../lib/customErrors';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.error(err);
  console.error(err.message);

  if (err instanceof CustomError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
    return;
  }

  if (err instanceof DbError) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
      dbErr: err.dbErr,
    });
    return;
  }

  res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default errorHandler;
