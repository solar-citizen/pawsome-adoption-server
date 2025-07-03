import 'reflect-metadata';

import { DataSource } from 'typeorm';

import Env from '#src/shared/config/env';
import { Pet } from '#src/shared/entities/Pet';
import { paths } from '#src/shared/lib/constants';

const { dbConfig, nodeEnv } = Env;
const { migrations } = paths;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbConfig,
  entities: [Pet],
  logging: true,
  migrations: [nodeEnv === 'production' ? migrations.prod : migrations.local],
});
