import request from 'supertest';
import express from 'express';

import { createApp } from '@/jest/helpers';
import { dbConnection } from '@/db';
import jwt from 'jsonwebtoken';
import usersRouter from '../router';

const AUTH_SECRET = process.env.AUTH_SECRET!;
const CSRF_SECRET = process.env.CSRF_SECRET!;

const generateAuthToken = (user: any) => jwt.sign(user, AUTH_SECRET, { expiresIn: '5m' });
const generateCsrfToken = () => jwt.sign({}, CSRF_SECRET);

describe('User Routes', () => {
  let app: express.Express;
  let testUser: {
    id: string;
    auth_id: string;
    first_name: string;
    last_name: string;
    handle: string;
    profile_url: string;
    avatar_url: string;
  };

  beforeAll(async () => {
    app = createApp(usersRouter);
  });

  beforeEach(async () => {
    const [user] = await dbConnection('users')
      .insert({
        auth_id: 'auth123',
        first_name: 'Test',
        last_name: 'User',
        handle: 'testuser',
        profile_url: 'http://example.com/testuser',
        avatar_url: 'http://example.com/avatar.jpg',
      })
      .returning('*');
    testUser = user;
  });

  afterEach(async () => {
    await dbConnection('users').where({ id: testUser.id }).del();
  });

  afterAll(async () => {
    await dbConnection.destroy();
  });

  describe('GET /me', () => {
    it('returns the authenticated user', async () => {
      const accessToken = generateAuthToken({ id: testUser.auth_id, role: 'basic' });
      const csrfToken = generateCsrfToken();

      const res = await request(app)
        .get('/me')
        .set('Cookie', [`accessToken=${accessToken}`])
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(200);
      expect(res.body.handle).toBe(testUser.handle);
      expect(res.body.firstName).toBe(testUser.first_name);
    });
  });

  describe('PATCH /me', () => {
    it('updates user fields successfully', async () => {
      const accessToken = generateAuthToken({ id: testUser.auth_id, role: 'basic' });
      const csrfToken = generateCsrfToken();

      const res = await request(app)
        .patch('/me')
        .set('Cookie', `accessToken=${accessToken}`)
        .set('x-csrf-token', csrfToken)
        .send({ me: { firstName: 'Updated', lastName: 'User', handle: 'handle' } });

      expect(res.status).toBe(200);
      expect(res.body.firstName).toBe('Updated');
    });
  });

  describe('GET /:id', () => {
    it('fetches user by id', async () => {
      const accessToken = generateAuthToken({ id: testUser.auth_id, role: 'basic' });
      const csrfToken = generateCsrfToken();

      const res = await request(app)
        .get(`/${testUser.id}`)
        .set('Cookie', `accessToken=${accessToken}`)
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(200);
      expect(res.body.handle).toBe(testUser.handle);
    });
  });

  describe('POST /create', () => {
    it('creates a new user', async () => {
      const res = await request(app)
        .post('/create')
        .set('x-api-key', `testAuthApiKey`)
        .send({
          user: {
            authId: 'authNewUser',
            first_name: 'Test',
            last_name: 'User',
          },
        });

      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('auth_id', 'authNewUser');

      await dbConnection('users').where({ auth_id: 'authNewUser' }).del();
    });
  });

  describe('Unauthenticated requests', () => {
    it('rejects unauthenticated requests', async () => {
      const endpoints = ['/me', `/me`, `/${testUser.id}`];
      for (const endpoint of endpoints) {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      }
    });
  });
});
