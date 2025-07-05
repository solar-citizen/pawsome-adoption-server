import 'reflect-metadata';

import { DataSource } from 'typeorm';

import Env from '#src/shared/config/env';
import {
  CatDetails,
  DogDetails,
  FarmAnimalDetails,
  HorseDetails,
  Pet,
  PetWithDetails,
} from '#src/shared/entities';
import { paths } from '#src/shared/lib/constants';

const { dbConfig, nodeEnv } = Env;
const { migrations } = paths;

export const AppDataSource = new DataSource({
  type: 'postgres',
  ...dbConfig,
  entities: [CatDetails, DogDetails, FarmAnimalDetails, HorseDetails, Pet, PetWithDetails],
  logging: true,
  migrations: [nodeEnv === 'production' ? migrations.prod : migrations.local],
});
