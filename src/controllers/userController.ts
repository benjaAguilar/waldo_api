import { Request, Response, NextFunction } from 'express';

async function createUser(req: Request, res: Response, next: NextFunction) {
  res.json({});
}

export { createUser };
