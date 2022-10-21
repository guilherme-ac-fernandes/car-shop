import express from 'express';
import errorHandler from './middlewares/error';
import carRouter from './routes/car.route';
import 'express-async-errors';

const app = express();

app.use(express.json());
app.use('/cars', carRouter);
app.use(errorHandler);

export default app;