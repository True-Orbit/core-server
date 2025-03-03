import 'module-alias/register';

import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

import * as routes from '@/routes';
import { errorHandler } from '@/middleware';

dotenv.config();

const PORT: number = parseInt(process.env.PORT as string) || 4000;

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use(morgan('tiny'));

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

for (const [name, route] of Object.entries(routes)) {
  app.use(`/api/${name}`, route);
}

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.use(errorHandler);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
});
