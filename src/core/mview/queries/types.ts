import type { ScheduledTask } from 'node-cron';

import type { MViewConfig } from '../scheduling/types';

export type MViewStatus = {
  readonly name: string;
  readonly isRunning: boolean;
  readonly isScheduled: boolean;
  readonly lastRefresh?: Date;
  readonly lastError?: Error;
};

export type ViewState = {
  readonly config: MViewConfig;
  readonly task?: ScheduledTask;
  readonly isRunning: boolean;
  readonly lastRefresh?: Date;
  readonly lastError?: Error;
  readonly abortController: AbortController;
};

export type MViewState = {
  readonly views: ReadonlyMap<string, ViewState>;
};
