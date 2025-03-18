import { Request, Response, NextFunction } from 'express';

type HandledError = Error & { status?: number };

export const errorHandler = (err: HandledError, _req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) return next(err);

  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error'
    }
  });
}

