import { Request, Response, NextFunction } from 'express';

export const catchErrors = (fn: (req: Request, res: Response, next: NextFunction) => {}) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err) => {
    console.error('error', err);
    res.status(500).json({ message: 'Internal Server Error' });
    next();
  });
};
