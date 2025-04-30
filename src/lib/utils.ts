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
