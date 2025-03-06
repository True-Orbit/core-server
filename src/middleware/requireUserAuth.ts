import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { models as accessTokenModels, ACCESS_TOKEN_COOKIE_NAME } from '@/resources/accessTokens';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const requireUserAuth = (req: Request, res: Response, next: NextFunction) => {
  const authToken: string = req.cookies?.[ACCESS_TOKEN_COOKIE_NAME];

  if (!authToken) {
    return res.status(401).json({ error: 'Authentication token missing' });
  }

  try {
    const decoded: accessTokenModels.Data = jwt.verify(authToken, AUTH_SECRET) as accessTokenModels.Data;
    req.authUser = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};
