import { prisma } from '../db/prismaClient';

export async function resetDb() {
  try {
    await prisma.$executeRawUnsafe(`
            TRUNCATE TABLE
            "User",
            "Leaderboard",
            "ImageData"
            RESTART IDENTITY CASCADE;
            `);
    console.log('Database cleaned.');
  } catch (error) {
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}
