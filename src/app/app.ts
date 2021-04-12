import express, { Request, Response } from 'express';
import '../container/di.container';
import cors from 'cors';
import profileRouter from '../routes/profiles.router';
import morgan from 'morgan';
import AppError from '../error/app.error';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use('/api/v1', [profileRouter]);

app.all('*', (req, res, next) => {
  const error = new AppError('url does not exists', 500);
  next(error);
});

app.use((error: AppError, req: Request, res: Response) => {
  const statusCode = error.statusCode || 500;
  res.status(statusCode).json({
    statusCode: statusCode,
    data: error.message
  });
});

export default app;
