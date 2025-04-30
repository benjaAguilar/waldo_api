import { Request, Response, NextFunction } from 'express';
import { calcUserTime, createJWT } from '../lib/utils';
import { Leaderboard, User } from '@prisma/client';
import {
  createUser,
  getLeaderboardById,
  updateUserEndDateAndTime,
  updateUserStartDate,
} from '../db/queries';
import { CustomError } from '../lib/customErrors';

interface CreateUserBody {
  leaderboardId?: string;
}

async function postCreateUser(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateUserBody;

  if (!body || !body.leaderboardId) {
    return next(new CustomError('Missing leaderboard', 400));
  }

  const leaderboard = await getLeaderboardById(parseInt(body.leaderboardId));

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

  const userWithStartDate = await updateUserStartDate(user.id, date);

  res.json({
    success: true,
    userWithStartDate,
  });
}

async function updateEndDate(req: Request, res: Response, next: NextFunction) {
  const { date } = req.body;
  const user: User | undefined = req.user;

  if (!user) {
    return next(new CustomError('Session expired', 400));
  }

  if (!user.startDate) {
    return next(new CustomError('There was a problem with the time', 400));
  }

  const totalTimeInMs = date.getTime() - user.startDate.getTime();
  const totalTime = calcUserTime(totalTimeInMs);

  const userWithEndDateAndTime = await updateUserEndDateAndTime(
    user.id,
    date,
    totalTimeInMs,
    totalTime,
  );

  res.json({
    success: true,
    userWithEndDateAndTime,
  });
}

export { postCreateUser, updateStartDate, updateEndDate };
