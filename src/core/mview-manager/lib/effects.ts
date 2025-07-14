import { schedule, type ScheduledTask } from 'node-cron';

import { AppDataSource } from '#src/shared';

import type { MViewConfig } from './types';

async function executeRefresh(config: MViewConfig, signal?: AbortSignal): Promise<void> {
  if (signal?.aborted) {
    throw new Error('Refresh aborted');
  }

  const concurrentClause = config.concurrent ? 'CONCURRENTLY' : '';
  await AppDataSource.query(`REFRESH MATERIALIZED VIEW ${concurrentClause} ${config.name};`);
}

function createScheduledTask(config: MViewConfig, refreshFn: () => Promise<void>): ScheduledTask {
  return schedule(config.schedule, refreshFn);
}

export const effects = {
  executeRefresh,
  createScheduledTask,
};
