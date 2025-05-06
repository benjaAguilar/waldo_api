"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetDb = resetDb;
const prismaClient_1 = require("../db/prismaClient");
async function resetDb() {
    try {
        await prismaClient_1.prisma.$executeRawUnsafe(`
            TRUNCATE TABLE
            "User",
            "Leaderboard",
            "ImageData"
            RESTART IDENTITY CASCADE;
            `);
        console.log('Database cleaned.');
    }
    catch (error) {
        console.error(error);
    }
    finally {
        await prismaClient_1.prisma.$disconnect();
    }
}
