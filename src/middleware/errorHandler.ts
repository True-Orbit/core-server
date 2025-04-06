import { Request, Response, NextFunction } from 'express';
const ENV = process.env.NODE_ENV!;

type HandledError = Error & { status?: number; message?: string };

export const errorHandler = (err: HandledError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  if (ENV !== 'test') console.error('errorHandler', err);
  const { status, message = 'Internal Server Error' } = err;
  return res.status(status || 500).json({ error: { message } });
};
