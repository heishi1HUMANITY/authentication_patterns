import { Router } from 'express';
import fetch from 'node-fetch';

declare module 'express-session' {
  interface SessionData {
    token?: string
  }
}

export const AUTH_ROUTER = Router();

AUTH_ROUTER.post('/signin', async (req, res) => {
  try {
    const fetchRes = await fetch('http://authenticator:8000/signin', {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(req.body),
    });
    if (fetchRes.status !== 200) {
      res.status(fetchRes.status).send();
      return;
    }
    const { token }: { token?: string } = await fetchRes.json();
    req.session.token = token;
    res.status(200).send();
    return;
  } catch (e) {
    res.status(500).send();
    return;
  }
});
