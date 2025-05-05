import { CORS_ORIGINS } from '#/shared/env';

export const corsConfig = {
  origin(origin: string | undefined, callback: (arg0: Error, arg1?: boolean) => void): void {
    if (!origin || CORS_ORIGINS.some(val => origin.match(val))) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  maxAge: 86400,
  headers: ['Accept', 'Authorization', 'Content-Type', 'If-None-Match'],
  exposedHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  credentials: true,
};
