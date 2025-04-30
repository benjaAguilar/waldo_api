import { Request, Response, NextFunction } from 'express';
import { addNewImage, addNewLeaderboard } from '../db/queries';
import { ImageData, Leaderboard } from '@prisma/client';

export async function addWaldoImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { x1, x2, y1, y2, width, height, imgRoute, name } = req.body;

  const image: ImageData = await addNewImage(
    parseInt(x1),
    parseInt(x2),
    parseInt(y1),
    parseInt(y2),
    parseInt(width),
    parseInt(height),
    imgRoute,
    name,
  );

  const leaderboard: Leaderboard = await addNewLeaderboard(
    image.name,
    image.id,
  );

  res.json({ image, leaderboard });
}
