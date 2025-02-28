import jwt from 'jsonwebtoken';

import { models as accessTokenModels } from '@/resources/accessTokens';

const AUTH_SECRET = process.env.AUTH_SECRET!

export const getTokenData = (token: any): accessTokenModels.Data => {
  try {
    const tokenData = jwt.verify(token, AUTH_SECRET);
    return tokenData as accessTokenModels.Data;
  } catch (error: any) {
    throw new Error("Token is invalid");
  }
};
