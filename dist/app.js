"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const indexRoute_1 = __importDefault(require("./routes/indexRoute"));
const errorHandler_1 = __importDefault(require("./controllers/errorHandler"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const passport_1 = __importDefault(require("passport"));
const passportConfig_1 = __importDefault(require("./config/passportConfig"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const client = process.env.WHITELIST_CLIENT;
if (client) {
    app.use((0, cors_1.default)({ origin: client, credentials: true }));
}
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
(0, passportConfig_1.default)(passport_1.default);
app.use(passport_1.default.initialize());
app.use('/', indexRoute_1.default);
app.use(errorHandler_1.default);
const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
