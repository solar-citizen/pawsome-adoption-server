import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { Pet } from '../entities' // ToDo: fix to "@/src/entities" if possible
import { config } from 'dotenv'

config()

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  entities: [Pet],
  logging: true,
  migrations: ['src/migrations/*.ts'],
})