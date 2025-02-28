import { models as accessTokenModels } from '@/resources/accessTokens';

declare global {
  namespace Express {
    interface Request {
      user?: accessTokenModels.Data;
    }
  }
}