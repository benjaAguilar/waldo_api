import express from 'express';
import router from './routes/indexRoute';
import errorHandler from './controllers/errorHandler';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configurePassport from './config/passportConfig';
import cors from 'cors';

const app = express();

dotenv.config();

const client = process.env.WHITELIST_CLIENT;
if (client) {
  app.use(cors({ origin: client, credentials: true }));
}

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configurePassport(passport);
app.use(passport.initialize());

app.use('/', router);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
