"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUsername = void 0;
const express_validator_1 = require("express-validator");
exports.validateUsername = [
    (0, express_validator_1.body)('username')
        .trim()
        .notEmpty()
        .withMessage('Username is required')
        .isLength({ min: 4, max: 20 })
        .withMessage('Username has to be at least 4 characters and a maximum of 20 characters')
        .isAlphanumeric()
        .withMessage('Username can only contain aplhanumeric caracters'),
];
