"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InternalError = exports.CustomError = exports.ValidationError = exports.DbError = void 0;
class CustomError extends Error {
    constructor(message, statusCode) {
        super(message), (this.statusCode = statusCode);
    }
}
exports.CustomError = CustomError;
class ValidationError extends Error {
    constructor(message, statusCode, validationErrors) {
        super(message), (this.statusCode = statusCode);
        this.validationErrors = validationErrors;
    }
}
exports.ValidationError = ValidationError;
class InternalError extends Error {
    constructor(message, statusCode) {
        super(message), (this.statusCode = statusCode);
    }
}
exports.InternalError = InternalError;
class DbError extends Error {
    constructor(message, statusCode, dbErr) {
        super(message), (this.statusCode = statusCode);
        this.dbErr = dbErr;
    }
}
exports.DbError = DbError;
