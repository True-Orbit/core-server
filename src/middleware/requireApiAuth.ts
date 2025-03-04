import { Request, Response, NextFunction } from 'express';
import { dbConnection } from '@/db';

export const requireApiAuth = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers['x-api-key'];
  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' });
  } else {
    try {
      req.service = await dbConnection('services').where({ apiKey }).first();
      next();
    } catch (err) {
      return res.status(401).json({ error: 'Invalid API key' });
    }
  }
};