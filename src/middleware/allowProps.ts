import { Request, Response, NextFunction } from 'express';

interface Props {
  allowed: string[];
  object: string;
}

export const allowProps =
  ({ allowed = [], object }: Props) =>
  (req: Request, _res: Response, next: NextFunction) => {
    const sourceObj = object ? req.body[object] : req.body;

    if (!(sourceObj && typeof sourceObj === 'object')) {
      return next({ message: 'Wrong Body Object' });
    }

    const filtered = allowed.reduce((acc, key) => ({ ...acc, [key]: sourceObj[key] }), {});

    req.allowed ||= {};
    req.allowed[object || 'body'] = filtered;

    next();
  };
