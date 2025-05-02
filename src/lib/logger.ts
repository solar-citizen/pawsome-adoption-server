import { config } from 'dotenv'
import { createLogger, format, transports } from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

const { Console, DailyRotateFile } = transports
const { combine, json, printf, colorize, errors, timestamp } = format

config()

const logDir = process.env.LOG_DIR
const logLevel = process.env.LOG_LEVEL

const baseFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }))
const productionFormat = combine(baseFormat, json())
const developmentFormat = combine(
  baseFormat,
  printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp}] - ${level.toUpperCase()} - ${message} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`
  }),
  colorize({ all: true }),
)

const selectedFormat = process.env.NODE_ENV === 'production' ? productionFormat : developmentFormat

const fileErrorTransport = new DailyRotateFile({
  filename: path.join(logDir, 'error-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  level: 'error',
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
})

const fileCombinedTransport = new DailyRotateFile({
  filename: path.join(logDir, 'combined-%DATE%.log'),
  datePattern: 'YYYY-MM-DD',
  maxSize: '20m',
  maxFiles: '14d',
  zippedArchive: true,
})

const logger = createLogger({
  level: logLevel,
  format: selectedFormat,
  transports: [fileErrorTransport, fileCombinedTransport],
  exitOnError: false,
})

if (process.env.NODE_ENV !== 'production') {
  logger.add(new Console())
}

export { logger }
