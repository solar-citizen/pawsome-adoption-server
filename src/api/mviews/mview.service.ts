import { type MViewConfig, MViewManager, type MViewStatus } from '#src/core';

export class MViewService {
  constructor(private manager: MViewManager = new MViewManager()) {}

  getAllViews() {
    return this.manager.getAllStatuses();
  }

  getViewDetails(viewName: string): MViewStatus | null {
    const status = this.manager.getViewStatus(viewName);
    if (!status) {
      throw new Error(`View '${viewName}' not found`);
    }
    return status;
  }

  async refreshView(viewName: string) {
    const startTime = Date.now();
    await this.manager.refreshView(viewName);
    return {
      viewName,
      refreshedAt: new Date().toISOString(),
      duration: `${(Date.now() - startTime).toString()}ms`,
    };
  }

  async refreshAllViews() {
    const startTime = Date.now();
    await this.manager.refreshAll();
    const allStatuses = this.manager.getAllStatuses();
    return {
      totalViews: allStatuses.length,
      duration: `${(Date.now() - startTime).toString()}ms`,
      results: allStatuses.map(status => ({
        viewName: status.name,
        success: !status.lastError,
        lastRefresh: status.lastRefresh,
        error: status.lastError?.message,
      })),
    };
  }

  async startScheduledRefresh(viewName: string) {
    await this.manager.scheduleRefreshView(viewName);
    return { message: `Scheduled refresh started for ${viewName}` };
  }

  async stopScheduledRefresh(viewName: string) {
    await this.manager.unscheduleRefreshView(viewName);
    return { message: `Scheduled refresh stopped for ${viewName}` };
  }

  async startAllScheduledRefresh() {
    await this.manager.scheduleAllRefresh();
    return { message: 'All scheduled refreshes started' };
  }

  async stopAllScheduledRefresh() {
    await this.manager.unscheduleAllRefresh();
    return { message: 'All scheduled refreshes stopped' };
  }

  getSystemHealth() {
    const allStatuses = this.manager.getAllStatuses();
    const scheduledViews = allStatuses.filter(s => s.isScheduled);
    const runningViews = allStatuses.filter(s => s.isRunning);

    return {
      totalViews: allStatuses.length,
      scheduledViews: scheduledViews.length,
      runningViews: runningViews.length,
      idleViews: allStatuses.length - scheduledViews.length,
      isAnyRefreshing: this.manager.isAnyRefreshing(),
      views: allStatuses.map(status => ({
        name: status.name,
        isScheduled: status.isScheduled,
        isRunning: status.isRunning,
        lastRefresh: status.lastRefresh,
        hasError: !!status.lastError,
      })),
    };
  }

  getRegisteredViews() {
    return this.manager.getRegisteredViews();
  }

  registerView(config: MViewConfig) {
    this.manager.registerView(config);
  }

  async cleanup() {
    await this.manager.cleanup();
    return { message: 'Cleanup completed' };
  }
}
