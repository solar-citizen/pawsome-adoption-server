import 'reflect-metadata';

import { DataSource } from 'typeorm';

import { Env, paths, Pet } from '#src/shared';

const { dbConfig, nodeEnv } = Env;
const { migrations } = paths;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbConfig,
  entities: [Pet],
  logging: true,
  migrations: [nodeEnv === 'production' ? migrations.prod : migrations.local],
});
