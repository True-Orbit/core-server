import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

import { models as accessTokenModels } from '@/resources/accessTokens';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const requireUserAuth = (req: Request, res: Response, next: NextFunction) => {
  console.log('requireUserAuth cookies', req.cookies);
  const accessToken = req.cookies.accessToken;
  
  try {
    const decoded: accessTokenModels.Data = jwt.verify(accessToken, AUTH_SECRET) as accessTokenModels.Data;
    req.authUser = decoded;

    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({ error: 'Invalid authentication token' });
  }
};
