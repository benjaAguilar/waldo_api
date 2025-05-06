"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const resetTestDb_1 = require("../../lib/resetTestDb");
const testApp_1 = __importDefault(require("../testApp"));
const queries_1 = require("../../db/queries");
beforeAll(async () => {
    await (0, resetTestDb_1.resetDb)();
});
describe('Get /leaderboard/:id route', () => {
    it('should return a json with {sucess: true, leaderboard, [users]}', async () => {
        const image = await (0, queries_1.addNewImage)(1, 5, 33, 55, 234, 2344, '/waldo_test', 'Waldo and testing');
        const leaderboard = await (0, queries_1.addNewLeaderboard)(image.name, image.id);
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
            .get(`/leaderboard/9999`)
            .expect('Content-Type', /json/)
            .expect(404)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Leaderboard not found');
        });
    });
    it('cant pass NaN param', async () => {
        await (0, supertest_1.default)(testApp_1.default)
            .get(`/leaderboard/imNaN`)
            .expect('Content-Type', /json/)
            .expect(400)
            .expect((res) => {
            expect(res.body.success).toBe(false);
            expect(res.body.message).toBe('Provide a valid leaderboard param');
        });
    });
});
