import express from 'express';
import router from './routes/indexRoute';
import errorHandler from './controllers/errorHandler';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import configurePassport from './config/passportConfig';

const app = express();

dotenv.config();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

configurePassport(passport);
app.use(passport.initialize());

app.use('/', router);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
