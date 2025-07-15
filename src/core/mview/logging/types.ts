export type MViewLogger = {
  executeWithLogging<T>(viewName: string, operation: () => Promise<T>): Promise<T>;
};
export type LogLevel = 'info' | 'warn' | 'error';
export type DBMViewStatus = 'TO BE STARTED' | 'STARTED' | 'SUCCEEDED' | 'FAILED';
