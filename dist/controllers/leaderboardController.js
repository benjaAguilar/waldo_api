"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLeaderboard = getLeaderboard;
const queries_1 = require("../db/queries");
const customErrors_1 = require("../lib/customErrors");
async function getLeaderboard(req, res, next) {
    const leaderboardId = parseInt(req.params.id);
    if (isNaN(leaderboardId)) {
        return next(new customErrors_1.CustomError('Provide a valid leaderboard param', 400));
    }
    const leaderboard = await (0, queries_1.getLeaderboardByIdWhitoutImageData)(leaderboardId);
    const users = await (0, queries_1.getUsersByLeaderboard)(leaderboardId);
    if (!leaderboard) {
        return next(new customErrors_1.CustomError('Leaderboard not found', 404));
    }
    res.json({
        success: true,
        leaderboard,
        users,
    });
}
