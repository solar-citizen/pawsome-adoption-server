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
  LK_PET_CODE_LENGTH,
  logger,
  mViews,
  parsePositiveInt,
  paths,
  routes,
  tables,
  unionValues,
  withPagination,
} from './lib';
import type {
  EnergyLevel,
  ICatDetails,
  IDogDetails,
  IFarmAnimalDetails,
  IHorseDetails,
  IPet,
  Specie,
  TrainingLevel,
} from './types';

export { CatDetails, DogDetails, FarmAnimalDetails, HorseDetails, Pet, PetWithDetails };
export type {
  EnergyLevel,
  ICatDetails,
  IDogDetails,
  IFarmAnimalDetails,
  IHorseDetails,
  IPet,
  Specie,
  TrainingLevel,
};
export {
  AppDataSource,
  buildPaginationMeta,
  corsConfig,
  Env,
  extractPaginationParams,
  extractStringParam,
  isString,
  LK_PET_CODE_LENGTH,
  logger,
  mViews,
  parsePositiveInt,
  paths,
  routes,
  tables,
  unionValues,
  withPagination,
};
export type { EnvType };
