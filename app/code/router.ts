import { Router } from 'express';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import session from 'express-session';

declare module 'express-session' {
  interface SessionData {
    username: string
  }
}

export const ROUTER = Router();

const REDIS_STORE = connectRedis(session);
const REDIS_CLIENT = new Redis(parseInt(process.env.REDIS_PORT), 'redis');

ROUTER.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 30
  },
  store: new REDIS_STORE({ client: REDIS_CLIENT }),
}));

ROUTER.get('/', (req, res): void => {
  if (typeof req.session.username === 'undefined') {
    res.status(401).send();
    return;
  }
  res.send(req.session.username);
  return
});
