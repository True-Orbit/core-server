import 'module-alias/register';

import express, { Application } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';

import * as routes from '@/routes';
import { errorHandler } from '@/middleware';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 4000;

const app: Application = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

for (const [name, route] of Object.entries(routes)) {
  app.use(`/api/${name}`, route);
}

app.use('*', (_req, res) => {
  res.status(404).send('Route not found');
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
