import { Router, Request, Response } from "express";
import { USERDATA } from "./userdata";
import session from 'express-session';
import { compare } from 'bcrypt';

declare module 'express-session' {
  interface SessionData {
    username: string
  }
}

export const ROUTER = Router();

ROUTER.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 30
  }
}));

ROUTER.post('/signin', async (req: Request, res: Response): Promise<void> => {
  const storedUserData: { username: string, password: string } | undefined = USERDATA.find(v => v.username === req.body.username);
  if (typeof storedUserData === 'undefined') {
    res.status(401).send();
    return;
  }
  if (await compare(req.body.password, storedUserData.password)) {
    req.session.username = storedUserData.username;
    res.status(200).send(req.session.username);
    return;
  }
  res.status(406).send();
  return;
});

ROUTER.get('/signout', (req: Request, res: Response): void => {
  const username = req.session.username;
  req.session.destroy((err => {
    res.status(500).send();
    return;
  }));
  res.send(username);
  return
});

ROUTER.get('/verify', (req: Request, res: Response) => {
  const username = req.session.username;
  res.json({ username }).send();
  return;
});