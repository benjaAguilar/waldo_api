import { Request, Response, NextFunction } from 'express';

async function addWaldoImage(req: Request, res: Response, next: NextFunction) {
  const { x1, x2, y1, y2, width, height, imgRoute, name } = req.body;
}
