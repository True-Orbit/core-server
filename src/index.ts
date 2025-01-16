import 'module-alias/register';

import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import { home, users } from '@/routes';
dotenv.config();

const PORT = process.env.PORT || 8080;

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', home);
app.get('/users', users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
