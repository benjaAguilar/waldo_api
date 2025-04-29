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
) => {
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
