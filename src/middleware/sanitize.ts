import { validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

interface Props {
  allowed: string[];
  object: string;
}

export const sanitize = ({ allowed, object }: Props) => (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const sourceObj = !!object ? req.body[object] : req.body;

  if (!(sourceObj && typeof sourceObj === 'object')) {
    throw new Error('Allow list error: Invalid source object');
  }
  const filtered: Record<string, unknown> = {};

  allowed.forEach(field => {
    if (sourceObj[field] !== undefined) {
      filtered[field] = sourceObj[field];
    }
  });

  req.sanitized[object || 'body'] = filtered;

  next();
}