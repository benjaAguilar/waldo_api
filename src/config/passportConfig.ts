import { Strategy as jwtStrategy } from 'passport-jwt';
import { Request } from 'express';
import { prisma } from '../db/prismaClient';
import { Algorithm } from 'jsonwebtoken';

import dotenv from 'dotenv';
import { InternalError } from '../lib/customErrors';

dotenv.config();

function getAuthCookie(req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['authToken'];
  }
  return token;
}

const secretJWT = process.env.SECRET_JWT;

if (!secretJWT) {
  throw new InternalError('SECRET_JWT env variable is not defined', 500);
}

const jwtOptions = {
  jwtFromRequest: getAuthCookie,
  secretOrKey: secretJWT,
  algorithms: ['HS256' as Algorithm],
  jsonWebTokenOptions: {
    maxAge: '1h',
  },
};

const configurePassport = (passport: any) => {
  passport.use(
    new jwtStrategy(jwtOptions, (payload, done) => {
      const currentTime = Math.floor(Date.now() / 1000);
      if (payload.exp < currentTime) {
        return done(null, false, { message: 'Token expired' });
      }

      prisma.user
        .findUnique({
          where: {
            id: payload.sub,
          },
        })
        .then((user) => {
          if (user) return done(null, user);
          return done(null, false);
        })
        .catch((err) => done(err, false));
    }),
  );
};

export default configurePassport;
