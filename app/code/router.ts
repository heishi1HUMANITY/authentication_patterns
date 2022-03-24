import { Router } from 'express';
import jwt from 'jsonwebtoken'
import { readFile } from 'fs/promises';
import path from 'path';

export const ROUTER = Router();

const PUBLIC_KEY = await readFile(path.join('.', 'key', 'public.pem'));

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id?: string
  }

  function verify(token: string, secretOrPublicKey: jwt.Secret, options?: (jwt.VerifyOptions & { complete?: false | undefined; }) | undefined): jwt.JwtPayload
}

ROUTER.get('/', (req, res): void => {
  const authorization = req.headers['authorization'];
  if (typeof authorization !== 'undefined' && authorization.split(' ')[0].toLowerCase() === 'bearer') {
    const token = authorization.split(' ')[1];
    try {
      const payload: jwt.JwtPayload = jwt.verify(token, PUBLIC_KEY, { algorithms: ['ES256'] });
      res.status(200).send(payload.id);
    } catch (err) {
      res.status(401).send();
      return;
    }
  }
  res.status(401).send();
  return;
});
