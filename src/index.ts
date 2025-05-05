import { logger } from '#/shared'

import init from './server'

const port = process.env.APP_PORT
const env = process.env.NODE_ENV

init()
  .then(app => {
    app.listen(port, () => {
      logger.info(`Server running on port ${port}`)
      logger.info(`Environment: ${env}`)
    })
  })
  .catch(error => {
    console.error('Failed to start server:', error)
    process.exit(1)
  })
