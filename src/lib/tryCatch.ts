import { Request, Response, NextFunction } from 'express';
import { CustomError, DbError } from './customErrors';

const tryCatch =
  (controller: Function) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      return next(error);
    }
  };

const tryQuery = async (query: Function) => {
  try {
    const res = await query();
    return res;
  } catch (error) {
    throw new DbError(
      'Oops! there was a problem on the database. Try again.',
      500,
      error instanceof Error ? error : new Error(String(error)),
    );
  }
};

export { tryCatch, tryQuery };
