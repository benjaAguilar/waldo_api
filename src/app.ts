import express from 'express';
import router from './routes/indexRoute';
import errorHandler from './controllers/errorHandler';
import dotenv from 'dotenv';

const app = express();

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', router);

app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
