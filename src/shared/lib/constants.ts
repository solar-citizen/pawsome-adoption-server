export const routes = {
  api: '/api',
};

export const tables = {
  pets: 'pets',
};

export const paths = {
  migrations: {
    prod: 'dist/migrations/*.js',
    local: 'src/shared/db/migrations/*.ts',
  },
};
