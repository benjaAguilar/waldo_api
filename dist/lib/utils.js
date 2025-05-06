"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createJWT = createJWT;
exports.calcUserTime = calcUserTime;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const customErrors_1 = require("./customErrors");
function createJWT(user) {
    const id = user.id;
    const expiresIn = '1h';
    const payload = {
        sub: id,
        iat: Math.floor(Date.now() / 1000),
    };
    const secret = process.env.SECRET_JWT;
    if (!secret) {
        throw new customErrors_1.InternalError('SECRET_JWT is not defined on env variables', 500);
    }
    const signedToken = jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expiresIn,
        algorithm: 'HS256',
    });
    return {
        token: signedToken,
        expires: expiresIn,
    };
}
function calcUserTime(differenceMs) {
    const min = Math.floor(differenceMs / 60000)
        .toString()
        .padStart(2, '0');
    const sec = Math.floor((differenceMs % 60000) / 1000)
        .toString()
        .padStart(2, '0');
    const ms = Math.floor((differenceMs % 1000) / 10)
        .toString()
        .padStart(2, '0');
    return `${min}:${sec}.${ms}`;
}
