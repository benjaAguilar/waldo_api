import { Request, Response, NextFunction } from 'express';
import { calcUserTime, createJWT } from '../lib/utils';
import { Leaderboard, User } from '@prisma/client';
import {
  createUser,
  getLeaderboardById,
  updateUserEndDateAndTime,
  updateUserStartDate,
  updateUserUsername,
} from '../db/queries';
import { CustomError, ValidationError } from '../lib/customErrors';
import { validateUsername } from '../config/validator';
import { tryCatch } from '../lib/tryCatch';
import { validationResult } from 'express-validator';

interface CreateUserBody {
  leaderboardId?: string;
  dateISO?: Date;
  username?: string;
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
  const body = req.body as CreateUserBody;

  if (!body || !body.dateISO) {
    return next(new CustomError('Missing Date', 400));
  }

  const user: User | undefined = req.user;

  if (!user) {
    return next(new CustomError('Session expired', 400));
  }

  const { dateISO } = body;
  const date = new Date(dateISO);

  if (isNaN(date.getTime())) {
    return next(new CustomError('Provide a valid date', 400));
  }

  const userWithStartDate = await updateUserStartDate(user.id, date);

  res.json({
    success: true,
    userWithStartDate,
  });
}

async function updateEndDate(req: Request, res: Response, next: NextFunction) {
  const body = req.body as CreateUserBody;

  if (!body || !body.dateISO) {
    return next(new CustomError('Missing Date', 400));
  }

  const user: User | undefined = req.user;

  if (!user) {
    return next(new CustomError('Session expired', 400));
  }

  if (!user.startDate) {
    return next(new CustomError('There was a problem with the time', 400));
  }

  const { dateISO } = body;
  const date = new Date(dateISO);

  if (isNaN(date.getTime())) {
    return next(new CustomError('Provide a valid date', 400));
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

const putUpdateUsername = [
  ...validateUsername,
  tryCatch(async (req: Request, res: Response, next: NextFunction) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return next(
        new ValidationError(
          'Please provide a valid username',
          400,
          validationErrors.array(),
        ),
      );
    }

    const body = req.body as CreateUserBody;

    if (!body || !body.username) {
      return next(new CustomError('Please provide a valid username', 400));
    }

    const authUser: User | undefined = req.user;

    if (!authUser) {
      return next(new CustomError('Session expired', 400));
    }

    const { username } = body;
    const user = await updateUserUsername(authUser.id, username);

    res.clearCookie('authToken');

    res.json({ success: true, user });
  }),
];

export { postCreateUser, updateStartDate, updateEndDate, putUpdateUsername };
