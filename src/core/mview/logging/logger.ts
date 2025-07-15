import type { LogLevel } from './types';

function log(level: LogLevel, message: string, ...args: unknown[]): void {
  const timestamp = new Date().toISOString();
  const logMessage = `[${timestamp}] [MView] ${message}`;

  switch (level) {
    case 'info':
      console.log(logMessage, ...args);
      break;
    case 'warn':
      console.warn(logMessage, ...args);
      break;
    case 'error':
      console.error(logMessage, ...args);
      break;
  }
}

function logViewRegistered(viewName: string, schedule: string): void {
  log('info', `Registered view: ${viewName} with schedule: ${schedule}`);
}

function logViewScheduled(viewName: string): void {
  log('info', `Started scheduled refresh for: ${viewName}`);
}

function logViewUnscheduled(viewName: string): void {
  log('info', `Stopped scheduled refresh for: ${viewName}`);
}

function logViewRefreshed(viewName: string, timestamp: Date): void {
  log('info', `Refreshed ${viewName} at ${timestamp.toISOString()}`);
}

function logViewError(viewName: string, error: Error): void {
  log('error', `Failed to refresh ${viewName}:`, error);
}

function logWarning(message: string): void {
  log('warn', message);
}

function logAllViewsStarted(count: number): void {
  log('info', `Started all views (${count.toString()})`);
}

function logAllViewsStopped(): void {
  log('info', 'Stopped all views');
}

function logAllViewsRefreshed(failures: number): void {
  if (failures > 0) {
    log('warn', `Refreshed all views with ${failures.toString()} failures`);
  } else {
    log('info', 'Successfully refreshed all views');
  }
}

export const loggers = {
  logViewRegistered,
  logViewScheduled,
  logViewUnscheduled,
  logViewRefreshed,
  logViewError,
  logWarning,
  logAllViewsStarted,
  logAllViewsStopped,
  logAllViewsRefreshed,
};
