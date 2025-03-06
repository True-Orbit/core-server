import jwt from 'jsonwebtoken';

import { models as accessTokenModels } from '@/resources/accessTokens';

const AUTH_SECRET = process.env.AUTH_SECRET!;

export const getTokenData = (token: string): accessTokenModels.Data => {
  try {
    const tokenData = jwt.verify(token, AUTH_SECRET);
    return tokenData as accessTokenModels.Data;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error(error);
    throw new Error('Token is invalid');
  }
};
