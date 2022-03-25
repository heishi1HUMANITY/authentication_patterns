import { Router } from 'express';
import fetch from 'node-fetch';

declare module 'express-session' {
  interface SessionData {
    token?: string
  }
}

export const APP_ROUTER = Router();

APP_ROUTER.get('/', async (req, res) => {
  if (typeof req.session.token === 'undefined') {
    res.status(401).send();
    return;
  }
  
  try {
    const fetchRes = await fetch('http://app:8000/', {
      headers: {
        authorization: `Bearer ${req.session.token}`,
      }
    });
    if (fetchRes.status !== 200) {
      res.status(fetchRes.status).send();
      return;
    }
    res.status(200).send(await fetchRes.text());
    return;
  } catch (e) {
    res.status(500).send();
    return;
  }
});