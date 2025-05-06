"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWaldoImage = addWaldoImage;
exports.getAllImages = getAllImages;
const queries_1 = require("../db/queries");
const customErrors_1 = require("../lib/customErrors");
async function addWaldoImage(req, res, next) {
    const body = req.body;
    let hasEmptyFields = false;
    for (const [key, value] of Object.entries(body)) {
        if (value === undefined || value === null || value === '')
            hasEmptyFields = true;
    }
    if (!body || hasEmptyFields) {
        return next(new customErrors_1.CustomError('Cannot send empty fields', 400));
    }
    const { x1, x2, y1, y2, width, height, imgRoute, name } = body;
    const checkNaN = (value) => isNaN(value);
    const hasNaNValues = [x1, x2, y1, y2, width, height].some(checkNaN);
    if (hasNaNValues) {
        return next(new customErrors_1.CustomError('Coords and sizes must be numbers', 400));
    }
    const image = await (0, queries_1.addNewImage)(parseInt(x1), parseInt(x2), parseInt(y1), parseInt(y2), parseInt(width), parseInt(height), imgRoute, name);
    const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
    res.json({ success: true, image, leaderboard });
}
async function getAllImages(req, res, next) {
    const images = await (0, queries_1.getImages)();
    res.json({
        success: true,
        images,
    });
}
