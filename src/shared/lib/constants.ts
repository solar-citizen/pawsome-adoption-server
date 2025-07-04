export const routes = {
  api: '/api',
};

export const tables = {
  pets: 'pets',
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
