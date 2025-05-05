import path from 'path'
import { transports } from 'winston'

import 'winston-daily-rotate-file'

const { DailyRotateFile, Console } = transports

export function createErrorTransport(logDir: string) {
  return new DailyRotateFile({
    filename: path.join(logDir, 'error-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    level: 'error',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
  })
}

export function createCombinedTransport(logDir: string) {
  return new DailyRotateFile({
    filename: path.join(logDir, 'combined-%DATE%.log'),
    datePattern: 'YYYY-MM-DD',
    maxSize: '20m',
    maxFiles: '14d',
    zippedArchive: true,
  })
}

export const consoleTransport = new Console()
