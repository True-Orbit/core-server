import express, { Router, Express } from 'express';
import cookieParser from 'cookie-parser';
import { errorHandler } from '@/middleware';

export const createApp = (router: Router): Express => {
  const app: Express = express();
  app.use(express.json());
  app.use(cookieParser());
  app.use('/', router);
  app.use(errorHandler);
  return app;
};