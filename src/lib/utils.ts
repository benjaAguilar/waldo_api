import { User } from '@prisma/client';
import jsonwebtoken from 'jsonwebtoken';
import { InternalError } from './customErrors';

export function createJWT(user: User) {
  const id = user.id;

  const expiresIn = '1h';

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000),
  };

  const secret = process.env.SECRET_JWT;
  if (!secret) {
    throw new InternalError('SECRET_JWT is not defined on env variables', 500);
  }

  const signedToken = jsonwebtoken.sign(payload, secret, {
    expiresIn: expiresIn,
    algorithm: 'HS256',
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}

export function calcUserTime(differenceMs: number) {
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
