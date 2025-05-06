import { createLogger } from 'winston';

import Env from '#/shared/env';

import { developmentFormat, productionFormat } from './formats';
import { consoleTransport, createCombinedTransport, createErrorTransport } from './transports';

const { logConfig, nodeEnv } = Env;
const { logLevel, logDir } = logConfig;

const format = nodeEnv === 'production' ? productionFormat : developmentFormat;

export const logger = createLogger({
  level: logLevel,
  format,
  transports: [createErrorTransport(logDir), createCombinedTransport(logDir)],
  exitOnError: false,
});

if (nodeEnv !== 'production') {
  logger.add(consoleTransport);
}
