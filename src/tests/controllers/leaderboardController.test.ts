import request from 'supertest';
import { resetDb } from '../../lib/resetTestDb';
import app from '../testApp';
import { addNewImage, addNewLeaderboard } from '../../db/queries';

beforeAll(async () => {
  await resetDb();
});

describe('Get /leaderboard/:id route', () => {
  it('should return a json with {sucess: true, leaderboard, [users]}', async () => {
    const image = await addNewImage(
      1,
      5,
      33,
      55,
      234,
      2344,
      '/waldo_test',
      'Waldo and testing',
    );
    const leaderboard = await addNewLeaderboard(image.name, image.id);

    await request(app)
      .get(`/leaderboard/${leaderboard.id}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.leaderboard).toBeDefined();
        expect(res.body.leaderboard).not.toBeNull();
        expect(res.body.users).toBeDefined();
      });
  });

  it('cant pass an unexistent leaderboard', async () => {
    await request(app)
      .get(`/leaderboard/9999`)
      .expect('Content-Type', /json/)
      .expect(404)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Leaderboard not found');
      });
  });

  it('cant pass NaN param', async () => {
    await request(app)
      .get(`/leaderboard/imNaN`)
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Provide a valid leaderboard param');
      });
  });
});
