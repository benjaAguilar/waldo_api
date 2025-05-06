import { ImageData, Leaderboard, User } from '@prisma/client';
import { tryQuery } from '../lib/tryCatch';
import { prisma } from './prismaClient';

export const addNewImage = async (
  x1: number,
  x2: number,
  y1: number,
  y2: number,
  width: number,
  height: number,
  imgRoute: string,
  name: string,
): Promise<ImageData> => {
  return tryQuery(() =>
    prisma.imageData.create({
      data: {
        x1: x1,
        x2: x2,
        y1: y1,
        y2: y2,
        width: width,
        height: height,
        imgRoute: imgRoute,
        name: name,
      },
    }),
  );
};

export const getImages = async (): Promise<ImageData[]> => {
  return tryQuery(() =>
    prisma.imageData.findMany({ include: { leaderboard: true } }),
  );
};

export const addNewLeaderboard = async (
  name: string,
  imageId: number,
): Promise<Leaderboard> => {
  return tryQuery(() =>
    prisma.leaderboard.create({
      data: {
        name: name,
        imageDataId: imageId,
      },
    }),
  );
};

export const createUser = async (leaderboardId: number): Promise<User> => {
  return tryQuery(() =>
    prisma.user.create({
      data: {
        leaderboardId: leaderboardId,
      },
    }),
  );
};

export const getLeaderboardById = async (
  id: number,
): Promise<Leaderboard | null> => {
  return tryQuery(() =>
    prisma.leaderboard.findUnique({
      where: {
        id: id,
      },
      include: {
        imageData: true,
      },
    }),
  );
};

export const getLeaderboardByIdWhitoutImageData = async (
  id: number,
): Promise<Leaderboard | null> => {
  return tryQuery(() =>
    prisma.leaderboard.findUnique({
      where: {
        id: id,
      },
    }),
  );
};

export const updateUserStartDate = async (
  id: number,
  startDate: Date,
): Promise<User> => {
  return tryQuery(() =>
    prisma.user.update({
      where: {
        id: id,
      },
      data: {
        startDate: startDate,
      },
    }),
  );
};

export const updateUserEndDateAndTime = async (
  id: number,
  endDate: Date,
  timeInMs: number,
  time: string,
): Promise<User> => {
  return tryQuery(() =>
    prisma.user.update({
      where: {
        id: id,
      },
      data: {
        endDate: endDate,
        timeInMs: timeInMs,
        time: time,
      },
    }),
  );
};

export const updateUserUsername = async (
  id: number,
  username: string,
): Promise<User> => {
  return tryQuery(() =>
    prisma.user.update({
      where: {
        id: id,
      },
      data: {
        username: username,
      },
    }),
  );
};

export const getUsersByLeaderboard = async (
  leaderboardId: number,
): Promise<[User]> => {
  return tryQuery(() =>
    prisma.user.findMany({
      where: {
        leaderboardId: leaderboardId,
        startDate: { not: null },
        endDate: { not: null },
        time: { not: null },
        timeInMs: { not: null },
        username: { not: null },
      },
      orderBy: {
        timeInMs: 'asc',
      },
    }),
  );
};
