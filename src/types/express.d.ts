import { models as accessTokenModels } from '@/resources/accessTokens';
import { MODELS as serviceModels } from '@/resources/service';

declare global {
  namespace Express {
    interface Request {
      authUser?: accessTokenModels.Data;
      service?: serviceModels.Service;
    }
  }
}