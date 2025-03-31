import { validationResult, ValidationChain } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const validate =
  (validators: ValidationChain[] = []) =>
  async (req: Request, _res: Response, next: NextFunction) => {
    await Promise.allSettled(validators.map(async (validator) => await validator.run(req)));
    const errors = validationResult(req);
    errors.isEmpty() ? next() : next({ message: errors.array() });
  };
