import { Request, Response, NextFunction } from 'express';
import { dbConnection } from '@/db';

export const requireApiAuth = async (req: Request, res: Response, next: NextFunction) => {
  const api_key = req.headers['x-api-key'];
  if (!api_key) {
    return res.status(401).json({ error: 'API key missing' });
  } else {
    try {
      const service = await dbConnection('services').where({ api_key }).first();
      req.service = await dbConnection('services').where({ api_key }).first();
      next();
    } catch (err) {
      console.error(err)
      return res.status(401).json({ error: 'Invalid API key' });
    }
  }
};