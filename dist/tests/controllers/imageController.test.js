"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const resetTestDb_1 = require("../../lib/resetTestDb");
const testApp_1 = __importDefault(require("../testApp"));
beforeAll(async () => {
    await (0, resetTestDb_1.resetDb)();
});
describe('Post /image route', () => {
    it('should create an image with his leaderboard', async () => {
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
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
        await (0, supertest_1.default)(testApp_1.default)
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
