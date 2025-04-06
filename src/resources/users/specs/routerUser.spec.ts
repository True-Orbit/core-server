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

  let service: {
    id: string;
    name: string;
    api_key: string;
  };

  beforeAll(async () => {
    app = createApp(usersRouter);

    const [dbService] = await dbConnection('services')
      .insert({
        api_key: 'testAuthApiKey',
        name: 'testService',
      })
      .returning('*');
    service = dbService;
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
    await dbConnection('services').where({ id: service.id }).del();
    await dbConnection.destroy();
  });

  xdescribe('GET /:id', () => {
    it('fetches user by id', async () => {
      const accessToken = generateAuthToken({
        id: testUser.auth_id,
        role: 'basic',
      });
      const csrfToken = generateCsrfToken();

      const res = await request(app)
        .get(`/${testUser.id}`)
        .set('Cookie', [`accessToken=${accessToken}`])
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(200);
      expect(res.body.handle).toBe(testUser.handle);
    });

    it('returns 404 for non-existent user id', async () => {
      const accessToken = generateAuthToken({
        id: 'someId',
        role: 'basic',
      });
      const csrfToken = generateCsrfToken();

      const res = await request(app)
        .get('/nonexistentId')
        .set('Cookie', [`accessToken=${accessToken}`])
        .set('x-csrf-token', csrfToken);

      expect(res.status).toBe(404);
    });
  });

  describe('POST /create', () => {
    xit('creates a new user successfully', async () => {
      const res = await request(app)
        .post('/create')
        .set('x-api-key', service.api_key)
        .send({
          user: {
            authId: 'authNewUser',
          },
        });

      expect(res.status).toBe(200);
      expect(res.body[0]).toHaveProperty('auth_id', 'authNewUser');

      await dbConnection('users').where({ auth_id: 'authNewUser' }).del();
    });

    xit('returns an error when required user fields are missing', async () => {
      const res = await request(app)
        .post('/create')
        .set('x-api-key', service.api_key)
        .send({
          user: {
            last_name: 'User',
          },
        });

      expect(res.status).toBe(400);
    });

    it('rejects request with missing API key', async () => {
      const res = await request(app)
        .post('/create')
        .send({
          user: {
            authId: 'authNewUser',
          },
        });

      expect(res.status).toBe(401);
    });
  });

  xdescribe('Unauthenticated requests', () => {
    const endpoints = ['/me', `/me`, `/${'someId'}`];

    endpoints.forEach((endpoint) => {
      it(`rejects unauthenticated request to ${endpoint}`, async () => {
        const res = await request(app).get(endpoint);
        expect(res.status).toBe(401);
      });
    });
  });
});
