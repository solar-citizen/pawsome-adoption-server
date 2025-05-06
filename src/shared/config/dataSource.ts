import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Pet } from '#/shared/entities/Pet';
import Env from '#/shared/env';

const { dbConfig, nodeEnv } = Env;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbConfig,
  entities: [Pet],
  logging: true,
  migrations: [`src/shared/db/migrations/*.${nodeEnv === 'production' ? 'js' : 'ts'}`],
});
