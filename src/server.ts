import cors from 'cors';
import { config } from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';
import helmet from 'helmet';
import { StatusCodes } from 'http-status-codes';
import morgan from 'morgan';

import { router } from '#src/api';
import { AppDataSource, corsConfig } from '#src/shared';

config();

const app = express();

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
} else {
  app.use(
    morgan('tiny', {
      skip: (_req, res) => res.statusCode < 400,
    }),
  );
}

if (process.env.NODE_ENV === 'production') {
  app.use(helmet());
}

app.use(cors(corsConfig));
app.use(express.json());
app.use(router);

app.use((_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Resource not found' });
});

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});
// app.use((err: Error, _req: Request, res: Response) => {
//   console.error(err.stack);
//   res.status(500).json({ error: 'Internal Server Error' });
// });

/**
 * Initialize the application asynchronously to ensure all required components (database, etc.) are
 * ready before the app starts.
 */
const init = async (): Promise<Express> => {
  try {
    await AppDataSource.initialize();
    console.log('Database connection established successfully');
    return app;
  } catch (error) {
    console.error('Failed to initialize application:', error);
    throw error;
  }
};

export default init;
