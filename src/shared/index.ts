import { corsConfig } from './config/cors';
import { AppDataSource } from './config/dataSource';
import Env from './config/env';
import { CatDetails, DogDetails, FarmAnimalDetails, HorseDetails, Pet } from './entities/pets';
import { mViews, paths, routes, tables } from './lib/constants';
import { logger } from './lib/logger';
import type { EnvType } from './lib/types';

export { CatDetails, DogDetails, FarmAnimalDetails, HorseDetails, Pet };
export { AppDataSource, corsConfig, Env, logger, mViews, paths, routes, tables };

export type { EnvType };
