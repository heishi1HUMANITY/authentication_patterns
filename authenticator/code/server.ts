#! /usr/bin/env node

import express from 'express';
import { Express } from 'express';
import cors from 'cors';
import { ROUTER } from './router';

const app: Express = express();
app.use(cors({
  origin: '*'
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', ROUTER);

app.listen(process.env.PORT, () => console.log(`${process.env.PORT}`));
