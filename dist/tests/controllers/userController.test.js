"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const resetTestDb_1 = require("../../lib/resetTestDb");
const testApp_1 = __importDefault(require("../testApp"));
const queries_1 = require("../../db/queries");
const utils_1 = require("../../lib/utils");
beforeAll(async () => {
    await (0, resetTestDb_1.resetDb)();
});
describe('Post /users route', () => {
    it('should return JSON with { success: true, user }', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test', 'Waldo and testing');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
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
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test2', 'Waldo and testing 2');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/startDate')
            .send({ dateISO: new Date().toISOString() })
            .expect(401);
    });
    it('cant send empty date', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test3', 'Waldo and testing 3');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, supertest_1.default)(testApp_1.default)
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
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test4', 'Waldo and testing 4');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, supertest_1.default)(testApp_1.default)
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
describe('Put /user/endDate route', () => {
    it('should return JSON with {success: true, userWithEndDateAndTime}', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test5', 'Waldo and testing 5');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, queries_1.updateUserStartDate)(user.id, new Date());
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/endDate')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ dateISO: new Date().toISOString() })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.userWithEndDateAndTime).toBeDefined();
            expect(res.body.userWithEndDateAndTime.startDate).not.toBeNull();
            expect(res.body.userWithEndDateAndTime.endDate).not.toBeNull();
            expect(res.body.userWithEndDateAndTime.timeInMs).not.toBeNull();
            expect(res.body.userWithEndDateAndTime.time).not.toBeNull();
        });
    });
    it('cant send empty date', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test6', 'Waldo and testing 6');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, queries_1.updateUserStartDate)(user.id, new Date());
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/endDate')
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
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test8', 'Waldo and testing 8');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, queries_1.updateUserStartDate)(user.id, new Date());
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/endDate')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ dateISO: 'random string' })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Provide a valid date');
        });
    });
    it('cant access without a startDate', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test7', 'Waldo and testing 7');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        //remove the start date
        //await updateUserStartDate(user.id, new Date());
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/endDate')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ dateISO: new Date().toISOString() })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('There was a problem with the time');
        });
    });
});
describe('Put /user/username route', () => {
    it('should return JSON with {success: true, user}', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test8', 'Waldo and testing 8');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, queries_1.updateUserStartDate)(user.id, new Date());
        await (0, queries_1.updateUserEndDateAndTime)(user.id, new Date(), 0, '00:00.00');
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/username')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ username: 'Billy' })
            .expect('Content-Type', /json/)
            .expect(200)
            .expect((res) => {
            expect(res.body.success).toBe(true);
            expect(res.body.user).toBeDefined();
            expect(res.body.user.startDate).not.toBeNull();
            expect(res.body.user.endDate).not.toBeNull();
            expect(res.body.user.timeInMs).not.toBeNull();
            expect(res.body.user.time).not.toBeNull();
            expect(res.body.user.username).toBe('Billy');
        });
    });
    it('cant send invalid usernames', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test9', 'Waldo and testing 9');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        const user = await (0, queries_1.createUser)(leaderboard.id);
        const tokenObject = (0, utils_1.createJWT)(user);
        await (0, queries_1.updateUserStartDate)(user.id, new Date());
        await (0, queries_1.updateUserEndDateAndTime)(user.id, new Date(), 0, '00:00.00');
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/username')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ username: '' })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Please provide a valid username');
            expect(res.body.validationErrors).toBeDefined();
        });
        await (0, supertest_1.default)(testApp_1.default)
            .put('/user/username')
            .set('Cookie', [`authToken=${tokenObject.token}`])
            .send({ username: '/rick%' })
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Please provide a valid username');
            expect(res.body.validationErrors).toBeDefined();
        });
    });
});
