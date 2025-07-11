export const LK_PET_CODE_LENGTH = 17;

export const unionValues = {
  SPECIES: ['cat', 'dog', 'horse', 'farm-animal', 'other'] as const,

  // toDo: to re-do these as enums
  TRAINING_LEVELS: ['basic', 'intermediate', 'advanced'] as const,
  ENERGY_LEVELS: ['low', 'moderate', 'high', 'very_high'] as const,
};

export const routes = {
  api: '/api',
};

export const tables = {
  pets: 'pets',
  adopters: 'adopters',

  catDetails: 'cat_details',
  dogDetails: 'dog_details',
  horseDetails: 'horse_details',
  farmAnimalsDetails: 'farm_animals_details',
};

export const mViews = {
  petsWithDetails: 'pets_with_details',
};

export const paths = {
  migrations: {
    prod: 'dist/migrations/*.js',
    local: 'src/shared/db/migrations/*.ts',
  },
};
