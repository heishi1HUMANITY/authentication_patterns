import { Router } from 'express';
import fetch from 'node-fetch';

interface authenticatorResponse {
  username?: string
}

export const ROUTER = Router();

ROUTER.get('/', async (req, res): Promise<void> => {
  const cookie = req.headers['cookie'] ?? '';
  const fetchRes = await fetch('http://authenticator:8000/verify', {
    method: 'get',
    headers: {
      cookie
    }
  });

  const fetchJson: authenticatorResponse = await fetchRes.json();
  if (typeof fetchJson.username === 'undefined') {
    res.status(401).send();
    return;
  }
  res.send(fetchJson.username);
  return
});
