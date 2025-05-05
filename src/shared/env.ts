import { config } from 'dotenv'
config()

export const DB_NAME = process.env.DB_NAME
export const DB_HOST = process.env.DB_HOST
export const DB_PASS = process.env.DB_PASS
export const DB_PORT = Number(process.env.DB_PORT)
export const DB_USER = process.env.DB_USER

export const CORS_ORIGINS = process.env.CORS_ORIGINS.split('|')

export const LOG_DIR = process.env.LOG_DIR
export const LOG_LEVEL = process.env.LOG_LEVEL
export const NODE_ENV = process.env.NODE_ENV
