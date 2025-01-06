// src/index.ts

import express, { Application, Request, Response, NextFunction } from 'express';

// Initialize the Express application
const app: Application = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

// Example of a more complex route
app.post('/data', (req: Request, res: Response) => {
  const data = req.body;
  res.json({
    message: 'Data received successfully',
    data,
  });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Define the port
const PORT: number | string = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
