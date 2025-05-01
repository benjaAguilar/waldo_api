import express from 'express';
import router from '../routes/indexRoute';
import errorHandler from '../controllers/errorHandler';
import passport from 'passport';
import configurePassport from '../config/passportConfig';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
configurePassport(passport);
app.use(passport.initialize());

app.use('/', router);

app.use(errorHandler);

export default app;
