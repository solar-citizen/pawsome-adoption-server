import { corsConfig } from './config/cors';
import { AppDataSource } from './config/dataSource';
import Env from './config/env';
import {
  CatDetails,
  DogDetails,
  FarmAnimalDetails,
  HorseDetails,
  Pet,
  PetWithDetails,
} from './entities/pets';
import {
  buildPaginationMeta,
  type EnvType,
  extractPaginationParams,
  extractStringParam,
  isString,
  logger,
  mViews,
  parsePositiveInt,
  paths,
  routes,
  tables,
  withPagination,
} from './lib';

export { CatDetails, DogDetails, FarmAnimalDetails, HorseDetails, Pet, PetWithDetails };
export {
  AppDataSource,
  buildPaginationMeta,
  corsConfig,
  Env,
  extractPaginationParams,
  extractStringParam,
  isString,
  logger,
  mViews,
  parsePositiveInt,
  paths,
  routes,
  tables,
  withPagination,
};

export type { EnvType };
