import { Request, Response, NextFunction } from 'express';
import {
  getLeaderboardByIdWhitoutImageData,
  getUsersByLeaderboard,
} from '../db/queries';
import { CustomError } from '../lib/customErrors';

async function getLeaderboard(req: Request, res: Response, next: NextFunction) {
  const leaderboardId = parseInt(req.params.id);

  if (isNaN(leaderboardId)) {
    return next(new CustomError('Provide a valid leaderboard param', 400));
  }

  const leaderboard = await getLeaderboardByIdWhitoutImageData(leaderboardId);
  const users = await getUsersByLeaderboard(leaderboardId);

  if (!leaderboard) {
    return next(new CustomError('Leaderboard not found', 404));
  }

  res.json({
    success: true,
    leaderboard,
    users,
  });
}

export { getLeaderboard };
