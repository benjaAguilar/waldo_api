"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const customErrors_1 = require("../lib/customErrors");
const errorHandler = (err, req, res, next) => {
    console.error(err);
    console.error(err.message);
    if (err instanceof customErrors_1.CustomError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
        });
        return;
    }
    if (err instanceof customErrors_1.DbError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            dbErr: err.dbErr,
        });
        return;
    }
    if (err instanceof customErrors_1.ValidationError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            validationErrors: err.validationErrors,
        });
    }
    res.status(500).json({ success: false, message: 'Internal Server Error' });
};
exports.default = errorHandler;
