import { Request, Response, NextFunction } from 'express';
import { addNewImage, addNewLeaderboard, getImages } from '../db/queries';
import { ImageData, Leaderboard } from '@prisma/client';
import { CustomError } from '../lib/customErrors';

interface CreateUserBody {
  x1: string;
  x2: string;
  y1: string;
  y2: string;
  width: string;
  height: string;
  imgRoute: string;
  name: string;
}

export async function addWaldoImage(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const body = req.body as CreateUserBody;

  let hasEmptyFields = false;
  for (const [key, value] of Object.entries(body)) {
    if (value === undefined || value === null || value === '')
      hasEmptyFields = true;
  }

  if (!body || hasEmptyFields) {
    return next(new CustomError('Cannot send empty fields', 400));
  }

  const { x1, x2, y1, y2, width, height, imgRoute, name } = body;

  const checkNaN = (value: any) => isNaN(value);
  const hasNaNValues = [x1, x2, y1, y2, width, height].some(checkNaN);

  if (hasNaNValues) {
    return next(new CustomError('Coords and sizes must be numbers', 400));
  }

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

  res.json({ success: true, image, leaderboard });
}

export async function getAllImages(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const images = await getImages();

  res.json({
    success: true,
    images,
  });
}
