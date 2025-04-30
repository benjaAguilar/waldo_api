import { Request, Response, NextFunction } from 'express';
import { createJWT } from '../lib/utils';
import { Leaderboard, User } from '@prisma/client';
import {
  createUser,
  getLeaderboardById,
  updateUserStartDate,
} from '../db/queries';
import { CustomError } from '../lib/customErrors';

async function postCreateUser(req: Request, res: Response, next: NextFunction) {
  const { leaderboardId } = req.body;

  const leaderboard: Leaderboard | null = await getLeaderboardById(
    parseInt(leaderboardId),
  );

  if (!leaderboard) {
    return next(new CustomError('Leaderboard does not exist', 400));
  }

  const user: User = await createUser(leaderboard.id);
  const tokenObject = createJWT(user);

  res.cookie('authToken', tokenObject.token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'none',
    maxAge: 60 * 60 * 1000,
  });

  res.json({
    success: true,
    user,
  });
}

async function updateStartDate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { date } = req.body;
  const user: User | undefined = req.user;

  if (!user) {
    return next(new CustomError('Session expired', 400));
  }

  const startDate = await updateUserStartDate(user.id, date);

  res.json({
    success: true,
    startDate,
  });
}

export { postCreateUser, updateStartDate };
