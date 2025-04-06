import { Request, Response, NextFunction } from 'express';
import { dbConnection } from '@/db';

export const requireApiAuth = async (req: Request, res: Response, next: NextFunction) => {
  const api_key = req.headers['x-api-key'];
  if (!api_key) {
    return next({ status: 401, error: 'API key missing' });
  } else {
    try {
      req.service = await dbConnection('services').where({ api_key }).first();
      if (!req.service) {
        return next({ status: 401, error: 'Invalid API key' });
      }
      next();
    } catch (err) {
      console.error(err);
      return next({ status: 401, error: 'Invalid API key' });
    }
  }
};
