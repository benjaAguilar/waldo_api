"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.putUpdateUsername = void 0;
exports.postCreateUser = postCreateUser;
exports.updateStartDate = updateStartDate;
exports.updateEndDate = updateEndDate;
const utils_1 = require("../lib/utils");
const queries_1 = require("../db/queries");
const customErrors_1 = require("../lib/customErrors");
const validator_1 = require("../config/validator");
const tryCatch_1 = require("../lib/tryCatch");
const express_validator_1 = require("express-validator");
async function postCreateUser(req, res, next) {
    const body = req.body;
    if (!body || !body.leaderboardId) {
        return next(new customErrors_1.CustomError('Missing leaderboard', 400));
    }
    const leaderboard = await (0, queries_1.getLeaderboardById)(parseInt(body.leaderboardId));
    if (!leaderboard) {
        return next(new customErrors_1.CustomError('Leaderboard does not exist', 400));
    }
    const user = await (0, queries_1.createUser)(leaderboard.id);
    const tokenObject = (0, utils_1.createJWT)(user);
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
async function updateStartDate(req, res, next) {
    const body = req.body;
    if (!body || !body.dateISO) {
        return next(new customErrors_1.CustomError('Missing Date', 400));
    }
    const user = req.user;
    if (!user) {
        return next(new customErrors_1.CustomError('Session expired', 400));
    }
    const { dateISO } = body;
    const date = new Date(dateISO);
    if (isNaN(date.getTime())) {
        return next(new customErrors_1.CustomError('Provide a valid date', 400));
    }
    const userWithStartDate = await (0, queries_1.updateUserStartDate)(user.id, date);
    res.json({
        success: true,
        userWithStartDate,
    });
}
async function updateEndDate(req, res, next) {
    const body = req.body;
    if (!body || !body.dateISO) {
        return next(new customErrors_1.CustomError('Missing Date', 400));
    }
    const user = req.user;
    if (!user) {
        return next(new customErrors_1.CustomError('Session expired', 400));
    }
    if (!user.startDate) {
        return next(new customErrors_1.CustomError('There was a problem with the time', 400));
    }
    const { dateISO } = body;
    const date = new Date(dateISO);
    if (isNaN(date.getTime())) {
        return next(new customErrors_1.CustomError('Provide a valid date', 400));
    }
    const totalTimeInMs = date.getTime() - user.startDate.getTime();
    const totalTime = (0, utils_1.calcUserTime)(totalTimeInMs);
    const userWithEndDateAndTime = await (0, queries_1.updateUserEndDateAndTime)(user.id, date, totalTimeInMs, totalTime);
    res.json({
        success: true,
        userWithEndDateAndTime,
    });
}
const putUpdateUsername = [
    ...validator_1.validateUsername,
    (0, tryCatch_1.tryCatch)(async (req, res, next) => {
        const validationErrors = (0, express_validator_1.validationResult)(req);
        if (!validationErrors.isEmpty()) {
            return next(new customErrors_1.ValidationError('Please provide a valid username', 400, validationErrors.array()));
        }
        const body = req.body;
        if (!body || !body.username) {
            return next(new customErrors_1.CustomError('Please provide a valid username', 400));
        }
        const authUser = req.user;
        if (!authUser) {
            return next(new customErrors_1.CustomError('Session expired', 400));
        }
        const { username } = body;
        const user = await (0, queries_1.updateUserUsername)(authUser.id, username);
        res.clearCookie('authToken');
        res.json({ success: true, user });
    }),
];
exports.putUpdateUsername = putUpdateUsername;
