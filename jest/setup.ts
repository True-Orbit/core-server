import dotenv from 'dotenv';
dotenv.config({ path: '.env.test' });

console.error = jest.fn();