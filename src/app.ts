import express from 'express';
import router from './routes/indexRoute';

const app = express();

app.use(express.json());

app.use('/', router);

const PORT = 3000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));
