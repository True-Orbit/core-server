import 'module-alias/register';

import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import * as routes from '@/routes';

dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

for (const [name, route] of Object.entries(routes)) {
  app.use(`/${name}`, route);
}

app.use('*', (req, res) => {
  res.status(404).send('Route not found');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
