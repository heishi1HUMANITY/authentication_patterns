#! /usr/bin/env node

import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import session from 'express-session';
import { AUTH_ROUTER as AUTH } from './authenticatorRouter';
import { APP_ROUTER as APP } from './appRouter';

const app: Express = express();
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false,
    maxAge: 1000 * 60 * 30
  }
}))
app.use('/authenticator', AUTH);
app.use('/app', APP);

app.listen(process.env.PORT, () => console.log(`${process.env.PORT}`));
