import { format } from 'winston';

const { combine, json, printf, colorize, errors, timestamp } = format;

const baseFormat = combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }), errors({ stack: true }));

export const productionFormat = combine(baseFormat, json());
export const developmentFormat = combine(
  baseFormat,
  printf(({ level, message, timestamp, ...meta }) => {
    return `[${timestamp as string}] - ${level.toUpperCase()} - ${message as string} ${
      Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ''
    }`;
  }),
  colorize({ all: true }),
);
