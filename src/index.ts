import express = require('express')
import cors = require('cors')

import { Request, Response, NextFunction } from 'express'
import { config } from 'dotenv'

import { logger } from '#/middleware'
import { router } from '#/routes'
import { AppDataSource } from '#/config'

config()

const app = express()

app.use(cors())
app.use(logger)
app.use(express.json())
app.use(router)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Internal Server Error' })
})

const APP_PORT = process.env.APP_PORT

AppDataSource.initialize()
  .then(() => {
    app.listen(APP_PORT, () => {
      console.log(`Server running on port ${APP_PORT}`)
    })
  })
  .catch(error => console.log('Database connection error:', error))
