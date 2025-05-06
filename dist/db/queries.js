"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsersByLeaderboard = exports.updateUserUsername = exports.updateUserEndDateAndTime = exports.updateUserStartDate = exports.getLeaderboardByIdWhitoutImageData = exports.getLeaderboardById = exports.createUser = exports.addNewLeaderboard = exports.getImages = exports.addNewImage = void 0;
const tryCatch_1 = require("../lib/tryCatch");
const prismaClient_1 = require("./prismaClient");
const addNewImage = async (x1, x2, y1, y2, width, height, imgRoute, name) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.imageData.create({
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
    }));
};
exports.addNewImage = addNewImage;
const getImages = async () => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.imageData.findMany({ include: { leaderboard: true } }));
};
exports.getImages = getImages;
const addNewLeaderboard = async (name, imageId) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.leaderboard.create({
        data: {
            name: name,
            imageDataId: imageId,
        },
    }));
};
exports.addNewLeaderboard = addNewLeaderboard;
const createUser = async (leaderboardId) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.user.create({
        data: {
            leaderboardId: leaderboardId,
        },
    }));
};
exports.createUser = createUser;
const getLeaderboardById = async (id) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.leaderboard.findUnique({
        where: {
            id: id,
        },
        include: {
            imageData: true,
        },
    }));
};
exports.getLeaderboardById = getLeaderboardById;
const getLeaderboardByIdWhitoutImageData = async (id) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.leaderboard.findUnique({
        where: {
            id: id,
        },
    }));
};
exports.getLeaderboardByIdWhitoutImageData = getLeaderboardByIdWhitoutImageData;
const updateUserStartDate = async (id, startDate) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.user.update({
        where: {
            id: id,
        },
        data: {
            startDate: startDate,
        },
    }));
};
exports.updateUserStartDate = updateUserStartDate;
const updateUserEndDateAndTime = async (id, endDate, timeInMs, time) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.user.update({
        where: {
            id: id,
        },
        data: {
            endDate: endDate,
            timeInMs: timeInMs,
            time: time,
        },
    }));
};
exports.updateUserEndDateAndTime = updateUserEndDateAndTime;
const updateUserUsername = async (id, username) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.user.update({
        where: {
            id: id,
        },
        data: {
            username: username,
        },
    }));
};
exports.updateUserUsername = updateUserUsername;
const getUsersByLeaderboard = async (leaderboardId) => {
    return (0, tryCatch_1.tryQuery)(() => prismaClient_1.prisma.user.findMany({
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
    }));
};
exports.getUsersByLeaderboard = getUsersByLeaderboard;
