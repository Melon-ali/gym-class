/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, Request, Response } from 'express';
import cors from 'cors';
// import config from './app/config';
import globalErrorHandler from './app/middlewares/globalErrorhandler';
import notFound from './app/middlewares/notFound';
import cookieParser from 'cookie-parser';
import router from './app/routes';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api/v1', router);


app.get('/', (req: Request, res: Response) => {
  res.send('Server Is Running');
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
