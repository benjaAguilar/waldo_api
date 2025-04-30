import request from 'supertest';
import { resetDb } from '../../lib/resetTestDb';
import app from '../testApp';
import { addNewImage, addNewLeaderboard } from '../../db/queries';

beforeAll(async () => {
  await resetDb();
});

describe('Post /users route', () => {
  it('should return JSON with { success: true, user }', async () => {
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
      .post('/user')
      .send({ leaderboardId: leaderboard.id })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.user).toBeDefined();
      });
  });

  it('Cant access without a existent leaderboard id', async () => {
    await request(app)
      .post('/user')
      .send({ leaderboardId: '' })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Missing leaderboard');
      });
  });

  it('Cant access without a existent leaderboard id', async () => {
    await request(app)
      .post('/user')
      .send({ leaderboardId: '99999999' })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Leaderboard does not exist');
      });
  });
});
