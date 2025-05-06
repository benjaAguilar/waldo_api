"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const prismaClient_1 = require("../db/prismaClient");
const dotenv_1 = __importDefault(require("dotenv"));
const customErrors_1 = require("../lib/customErrors");
dotenv_1.default.config();
function getAuthCookie(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['authToken'];
    }
    return token;
}
const secretJWT = process.env.SECRET_JWT;
if (!secretJWT) {
    throw new customErrors_1.InternalError('SECRET_JWT env variable is not defined', 500);
}
const jwtOptions = {
    jwtFromRequest: getAuthCookie,
    secretOrKey: secretJWT,
    algorithms: ['HS256'],
    jsonWebTokenOptions: {
        maxAge: '1h',
    },
};
const configurePassport = (passport) => {
    passport.use(new passport_jwt_1.Strategy(jwtOptions, (payload, done) => {
        const currentTime = Math.floor(Date.now() / 1000);
        if (payload.exp < currentTime) {
            return done(null, false, { message: 'Token expired' });
        }
        prismaClient_1.prisma.user
            .findUnique({
            where: {
                id: payload.sub,
            },
        })
            .then((user) => {
            if (user)
                return done(null, user);
            return done(null, false);
        })
            .catch((err) => done(err, false));
    }));
};
exports.default = configurePassport;
