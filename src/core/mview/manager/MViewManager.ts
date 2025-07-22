import { loggers, type MViewLogger } from '../logging';
import { type MViewStatus, queries } from '../queries';
import { effects, type MViewConfig } from '../scheduling';
import { MViewStateManager } from './MViewStateManager';

export class MViewManager {
  private readonly stateManager = new MViewStateManager();
  private readonly taskCleanupMap = new Map<string, () => Promise<void>>();

  constructor(private logger: MViewLogger) {}

  registerView(config: MViewConfig): void {
    this.stateManager.registerView(config);
    loggers.logViewRegistered(config.name, config.schedule);
  }

  async scheduleRefreshView(viewName: string): Promise<void> {
    const view = this.stateManager.getView(viewName);
    if (!view) {
      throw new Error(`View ${viewName} not registered. Call registerView() first.`);
    }

    if (view.task) {
      loggers.logWarning(`View ${viewName} is already scheduled`);
      return;
    }

    const refreshFn = () => this.refreshView(viewName);
    const task = effects.createScheduledTask(view.config, refreshFn);

    this.taskCleanupMap.set(viewName, async () => {
      await task.stop();
      await task.destroy();
      this.taskCleanupMap.delete(viewName);
    });

    this.stateManager.scheduleView(viewName, task);
    await task.start();
    loggers.logViewScheduled(viewName);
  }

  async unscheduleRefreshView(viewName: string): Promise<void> {
    const view = this.stateManager.getView(viewName);
    if (!view?.task) {
      loggers.logWarning(`View ${viewName} is not scheduled`);
      return;
    }

    const cleanup = this.taskCleanupMap.get(viewName);
    if (cleanup) {
      await cleanup();
    }

    this.stateManager.unscheduleView(viewName);
    loggers.logViewUnscheduled(viewName);
  }

  async scheduleAllRefresh(): Promise<void> {
    const viewNames = this.stateManager.getViewNames();
    await Promise.all(viewNames.map(name => this.scheduleRefreshView(name)));
    loggers.logAllViewsStarted(viewNames.length);
  }

  async unscheduleAllRefresh(): Promise<void> {
    const viewNames = this.stateManager.getViewNames();
    await Promise.all(viewNames.map(name => this.unscheduleRefreshView(name)));
    loggers.logAllViewsStopped();
  }

  async refreshView(viewName: string): Promise<void> {
    const view = this.stateManager.getView(viewName);
    if (!view) {
      throw new Error(`View ${viewName} not registered`);
    }

    if (view.isRunning) {
      loggers.logWarning(`View ${viewName} is already refreshing, skipping`);
      return;
    }

    if (view.abortController.signal.aborted) {
      loggers.logWarning(`View ${viewName} refresh was aborted`);
      return;
    }

    this.stateManager.setViewRunning(viewName, true);

    try {
      await this.logger.executeWithLogging(viewName, async () => {
        await effects.executeRefresh(view.config, view.abortController.signal);
      });
      const timestamp = new Date();
      this.stateManager.setViewRefreshed(viewName, timestamp);
      loggers.logViewRefreshed(viewName, timestamp);
    } catch (err) {
      const error = err instanceof Error ? err : new Error(String(err));
      this.stateManager.setViewError(viewName, error);
      loggers.logViewError(viewName, error);
      throw error;
    } finally {
      this.stateManager.setViewRunning(viewName, false);
    }
  }

  async refreshAll(): Promise<void> {
    const viewNames = this.stateManager.getViewNames();
    const results = await Promise.allSettled(
      viewNames.map(viewName =>
        this.refreshView(viewName).catch((err: unknown) => {
          loggers.logViewError(viewName, err instanceof Error ? err : new Error(String(err)));
          return err;
        }),
      ),
    );

    const failures = results.filter(r => r.status === 'rejected').length;
    loggers.logAllViewsRefreshed(failures);
  }

  getViewStatus(viewName: string): MViewStatus | null {
    return queries.getViewStatus(this.stateManager.getState(), viewName) ?? null;
  }

  getAllStatuses(): MViewStatus[] {
    return queries.getAllStatuses(this.stateManager.getState());
  }

  isAnyRefreshing(): boolean {
    return queries.isAnyRefreshing(this.stateManager.getState());
  }

  getRegisteredViews(): string[] {
    return queries.getRegisteredViews(this.stateManager.getState());
  }

  async cleanup(): Promise<void> {
    await this.unscheduleAllRefresh();
    this.taskCleanupMap.clear();
    this.stateManager.clear();
  }

  getState() {
    return this.stateManager.getState();
  }
}
