import express from 'express';
import request from 'supertest';
import { health } from '..';

describe('Health API', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use('/', health);
  });

  it('should return a healthy API response', async () => {
    const res = await request(app).get('/');
    
    expect(res.status).toBe(200);
    
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('message', 'API is healthy');
    
    expect(res.body).toHaveProperty('time');
    const isoTime = new Date(res.body.time).toISOString();
    expect(isoTime).toBe(res.body.time);

    expect(res.body).toHaveProperty('uptime');
    expect(typeof res.body.uptime).toBe('number');

    expect(res.body).toHaveProperty('memoryUsage');
    expect(typeof res.body.memoryUsage).toBe('object');
  });
});
