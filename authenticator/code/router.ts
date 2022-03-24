import { Router, Request, Response } from "express";
import { USERDATA } from "./userdata";
import { compare } from 'bcrypt';
import jwt from 'jsonwebtoken'
import { readFile } from 'fs/promises';
import path from 'path';

export const ROUTER = Router();

const PRIVATE_KEY = await readFile(path.join('.', 'key', 'secret.pem'));

ROUTER.post('/signin', async (req: Request, res: Response): Promise<void> => {
  const storedUserData: { username: string, password: string } | undefined = USERDATA.find(v => v.username === req.body.username);
  if (typeof storedUserData === 'undefined') {
    res.status(401).send();
    return;
  }
  if (await compare(req.body.password, storedUserData.password)) {
    const token = jwt.sign({ id: storedUserData.username }, PRIVATE_KEY, {
      algorithm: 'ES256',
      expiresIn: 60 * 10
    });
    res.status(200).json({ token });
  }
  res.status(406).send();
});
