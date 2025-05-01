import request from 'supertest';
import { resetDb } from '../../lib/resetTestDb';
import app from '../testApp';
import { addNewImage, addNewLeaderboard, createUser } from '../../db/queries';
import { createJWT } from '../../lib/utils';

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

describe('Put /users/startDate route', () => {
  it('should return JSON with {success: true, userWithNewDate}', async () => {
    const image = await addNewImage(
      1,
      5,
      33,
      55,
      234,
      2344,
      '/waldo_test2',
      'Waldo and testing 2',
    );
    const leaderboard = await addNewLeaderboard(image.name, image.id);
    const user = await createUser(leaderboard.id);
    const tokenObject = createJWT(user);

    await request(app)
      .put('/user/startDate')
      .set('Cookie', [`authToken=${tokenObject.token}`])
      .send({ dateISO: new Date().toISOString() })
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        expect(res.body.success).toBe(true);
        expect(res.body.userWithStartDate).toBeDefined();
        expect(res.body.userWithStartDate.startDate).not.toBeNull();
      });
  });

  it('Cant access without login', async () => {
    await request(app)
      .put('/user/startDate')
      .send({ dateISO: new Date().toISOString() })
      .expect(401);
  });

  it('cant send empty date', async () => {
    const image = await addNewImage(
      1,
      5,
      33,
      55,
      234,
      2344,
      '/waldo_test3',
      'Waldo and testing 3',
    );
    const leaderboard = await addNewLeaderboard(image.name, image.id);
    const user = await createUser(leaderboard.id);
    const tokenObject = createJWT(user);

    await request(app)
      .put('/user/startDate')
      .set('Cookie', [`authToken=${tokenObject.token}`])
      .send({ dateISO: '' })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Missing Date');
      });
  });

  it('cant send not date value', async () => {
    const image = await addNewImage(
      1,
      5,
      33,
      55,
      234,
      2344,
      '/waldo_test4',
      'Waldo and testing 4',
    );
    const leaderboard = await addNewLeaderboard(image.name, image.id);
    const user = await createUser(leaderboard.id);
    const tokenObject = createJWT(user);

    await request(app)
      .put('/user/startDate')
      .set('Cookie', [`authToken=${tokenObject.token}`])
      .send({ dateISO: 'im a simple text' })
      .expect('Content-Type', /json/)
      .expect(400)
      .expect((res) => {
        expect(res.body.success).toBe(false);
        expect(res.body.message).toBe('Provide a valid date');
      });
  });
});
