import { Request, Response, NextFunction } from 'express';

const defaultFunc = (req: Request, res: Response, next: NextFunction) => next();

export const catchErrors =
  (fn = defaultFunc) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error(err);
      next({ status: 500, message: 'Internal server error' });
    });
  };
