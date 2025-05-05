import { createLogger } from 'winston'

import { LOG_DIR, LOG_LEVEL, NODE_ENV } from '#/shared/env'

import { productionFormat, developmentFormat } from './formats'
import { createErrorTransport, createCombinedTransport, consoleTransport } from './transports'

const format = NODE_ENV === 'production' ? productionFormat : developmentFormat

export const logger = createLogger({
  level: LOG_LEVEL,
  format,
  transports: [createErrorTransport(LOG_DIR), createCombinedTransport(LOG_DIR)],
  exitOnError: false,
})

if (NODE_ENV !== 'production') {
  logger.add(consoleTransport)
}
