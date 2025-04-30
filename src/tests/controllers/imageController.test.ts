import request from 'supertest';
import { resetDb } from '../../lib/resetTestDb';
import app from '../testApp';

beforeAll(async () => {
  await resetDb();
});

describe('Post /image route', () => {
  it('should create an image with his leaderboard', async () => {
    await request(app)
      .post('/image')
      .send({
        x1: '1',
        x2: '5',
        y1: '33',
        y2: '55',
        width: '234',
        height: '2344',
        imgRoute: '/waldo_test',
        name: 'Waldo and testing',
      })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.image).toBeDefined();
        expect(res.body.leaderboard).toBeDefined();
      });
  });
});

describe('Post /image route', () => {
  it('Cant send empty values', async () => {
    await request(app)
      .post('/image')
      .send({
        x1: '1',
        x2: null,
        y1: undefined,
        y2: '',
        width: '234',
        height: '2344',
        imgRoute: '',
        name: '',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Cannot send empty fields');
      });
  });
});

describe('Post /image route', () => {
  it('Cant sent NaN values', async () => {
    await request(app)
      .post('/image')
      .send({
        x1: 'rock',
        x2: 'asd',
        y1: 'null',
        y2: '311',
        width: '234',
        height: '2344',
        imgRoute: '/asd',
        name: 'asd',
      })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Coords and sizes must be numbers');
      });
  });
});
