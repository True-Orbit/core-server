import request from 'supertest';
import express from 'express';
import { dbConnection } from '@/db';
import usersRouter from '../router';

describe('User Routes', () => {
  let app: express.Express;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    app.use('/', usersRouter);
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  describe('GET /me', () => {
    it('returns the authenticated user', async () => {
      const res = await request(app).get('/me');
      expect(res.status).toBe(401);
    });
  });

  describe('PATCH /:me', () => {
    it('rejects unauthenticated requests', async () => {
      const res = await request(app).patch('/me').send({ email: 'updated@example.com' });
      expect(res.status).toBe(401);
    });
  });

  describe('GET /:id', () => {
    it('rejects unauthenticated requests', async () => {
      const res = await request(app).get('/user456');
      expect(res.status).toBe(401);
    });
  });

  describe('POST /create', () => {
    it('rejects unauthenticated requests', async () => {
      const res = await request(app).post('/create').send({ user: { authId: 'authNewUser' } });
      expect(res.status).toBe(401);
    });
  });
});