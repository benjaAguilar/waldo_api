import express from 'express';
import router from '../routes/indexRoute';
import errorHandler from '../controllers/errorHandler';

const app = express();

app.use(express.json());
app.use('/', router);
app.use(errorHandler);

export default app;
