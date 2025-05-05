import { DataSource } from 'typeorm'

import 'reflect-metadata'

import { DB_NAME, DB_HOST, DB_PASS, DB_PORT, DB_USER } from '#/shared/env'
import { Pet } from '#/shared/entities/Pet'

export const AppDataSource = new DataSource({
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  password: DB_PASS,
  port: DB_PORT,
  username: DB_USER,
  entities: [Pet],
  logging: true,
  migrations: ['src/shared/db/migrations/*.ts'],
})
