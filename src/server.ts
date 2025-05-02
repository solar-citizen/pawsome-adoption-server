import express, { Express, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'

import { config } from 'dotenv'
import { StatusCodes } from 'http-status-codes'

import { corsConfig, AppDataSource } from '#/config'
import { router } from '#/routes'

config()

const app = express()

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'))
} else {
  app.use(
    morgan('tiny', {
      skip: (_req, res) => res.statusCode < 400,
    }),
  )
}

if (process.env.NODE_ENV === 'production') {
  app.use(helmet())
}

app.use(cors(corsConfig))
app.use(express.json())
app.use(router)

app.use((_req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({ error: 'Resource not found' })
})

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

/**
 * Initialize the application asynchronously to ensure all required components (database, etc.) are
 * ready before the app starts.
 */
const init = async (): Promise<Express> => {
  try {
    await AppDataSource.initialize()
    console.log('Database connection established successfully')
    return app
  } catch (error) {
    console.error('Failed to initialize application:', error)
    throw error
  }
}

export default init
