import 'reflect-metadata';

import { Env, logger } from '#/shared';

import init from './server';

const { appPort, nodeEnv } = Env;

init()
  .then(app => {
    app.listen(appPort, () => {
      logger.info(`Server running on port ${appPort.toString()}`);
      logger.info(`Environment: ${nodeEnv}`);
    });
  })
  .catch((error: unknown) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });
