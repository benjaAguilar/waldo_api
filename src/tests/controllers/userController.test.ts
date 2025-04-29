import router from '../../routes/indexRoute';
import request from 'supertest';
import express from 'express';

const app = express();
app.use('/', router);

describe('Post /users route', () => {
  it('should return JSON with { imageData }', async () => {
    await request(app)
      .post('/user')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect({ route: true });
  });
});
