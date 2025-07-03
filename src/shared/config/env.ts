import 'dotenv/config';

import type { EnvType } from '#src/shared';

type EnvConfig = {
  appPort: number;
  nodeEnv: EnvType;
  corsOrigins: string[];
  logConfig: {
    logDir: string;
    logLevel: string;
  };
  dbConfig: {
    database: string;
    host: string;
    password: string;
    port: number;
    username: string;
  };
};

const Env: EnvConfig = {
  appPort: Number(process.env.APP_PORT),
  nodeEnv: (process.env.NODE_ENV || 'development') as EnvType,

  corsOrigins: process.env.CORS_ORIGINS?.split('|') || [],

  logConfig: {
    logDir: process.env.LOG_DIR || 'logs',
    logLevel: process.env.LOG_LEVEL || 'info',
  },

  dbConfig: {
    database: process.env.DB_NAME || '',
    host: process.env.DB_HOST || '',
    password: process.env.DB_PASS || '',
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER || '',
  },
};

export default Env;
