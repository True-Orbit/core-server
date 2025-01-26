import 'module-alias/register';

import express, { Application, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';

import { home, health, users, smurf } from '@/routes/index';
console.log('alsk: ', smurf);
dotenv.config();

const PORT = process.env.PORT || 4000;

const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

app.use((err: Error, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

app.get('/', home);
app.get('/health', health);
app.get('/users', users);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
