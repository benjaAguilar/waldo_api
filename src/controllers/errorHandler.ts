import { Request, Response, NextFunction, ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);
  console.log('----------');
  console.log(err.message);

  res.status(500).json({ success: false, message: 'Internal Server Error' });
};

export default errorHandler;
