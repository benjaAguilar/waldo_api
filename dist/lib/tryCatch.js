"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryQuery = exports.tryCatch = void 0;
const customErrors_1 = require("./customErrors");
const tryCatch = (controller) => async (req, res, next) => {
    try {
        await controller(req, res, next);
    }
    catch (error) {
        return next(error);
    }
};
exports.tryCatch = tryCatch;
const tryQuery = async (query) => {
    try {
        const res = await query();
        return res;
    }
    catch (error) {
        throw new customErrors_1.DbError('Oops! there was a problem on the database. Try again.', 500, error instanceof Error ? error : new Error(String(error)));
    }
};
exports.tryQuery = tryQuery;
