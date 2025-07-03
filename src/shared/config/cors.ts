import Env from '#src/shared/config/env';

const { corsOrigins } = Env;

export const corsConfig = {
  origin(origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void): void {
    if (!origin || corsOrigins.some(val => origin.match(val))) {
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
