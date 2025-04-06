import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import cors from 'cors';

import { models as accessTokenModels } from '@/resources/accessTokens';

const DOMAIN = process.env.DOMAIN!;
const AUTH_SECRET = process.env.AUTH_SECRET!;

const csrfTokenName = 'x-csrf-token';
const CSRF_SECRET = process.env.CSRF_SECRET!;

const corsOptions = {
  origin: DOMAIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', csrfTokenName],
  credentials: true,
};

export const requireUserAuth = (req: Request, res: Response, next: NextFunction) => {
  cors(corsOptions)(req, res, (corsErr) => {
    if (corsErr) {
      console.error('CORS error:', corsErr);
      return next(corsErr)
    }
    const accessToken = req.cookies?.accessToken;
    const csrfToken = req.headers[csrfTokenName] as string;
    
    try {
      jwt.verify(csrfToken, CSRF_SECRET);
    } catch (error) {
      console.error(error);
      return next({ status: 401, error: 'Invalid csrf token' });
    }

    try {
      const decoded: accessTokenModels.Data = jwt.verify(accessToken, AUTH_SECRET) as accessTokenModels.Data;
      req.authUser = decoded;

      next();
    } catch (err) {
      console.error(err);
      return next({ status: 401, error: 'Invalid authentication token' });
    }
  });
};
