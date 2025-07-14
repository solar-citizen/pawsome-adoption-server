import type { ScheduledTask } from 'node-cron';

import type { MViewConfig, MViewState, ViewState } from './lib';

export class MViewStateManager {
  private state: MViewState = { views: new Map() };

  getState(): MViewState {
    return this.state;
  }

  registerView(config: MViewConfig): void {
    const newViews = new Map(this.state.views);
    newViews.set(config.name, {
      config,
      isRunning: false,
      abortController: new AbortController(),
    });
    this.state = { views: newViews };
  }

  scheduleView(viewName: string, task: ScheduledTask): void {
    const view = this.state.views.get(viewName);
    if (!view) return;

    const newViews = new Map(this.state.views);
    newViews.set(viewName, { ...view, task });
    this.state = { views: newViews };
  }

  unscheduleView(viewName: string): void {
    const view = this.state.views.get(viewName);
    if (!view) return;

    view.abortController.abort();
    const newViews = new Map(this.state.views);
    newViews.set(viewName, {
      ...view,
      task: undefined,
      abortController: new AbortController(),
    });
    this.state = { views: newViews };
  }

  setViewRunning(viewName: string, isRunning: boolean): void {
    const view = this.state.views.get(viewName);
    if (!view) return;

    const newViews = new Map(this.state.views);
    newViews.set(viewName, { ...view, isRunning });
    this.state = { views: newViews };
  }

  setViewRefreshed(viewName: string, timestamp: Date): void {
    const view = this.state.views.get(viewName);
    if (!view) return;

    const newViews = new Map(this.state.views);
    newViews.set(viewName, {
      ...view,
      lastRefresh: timestamp,
      lastError: undefined,
    });
    this.state = { views: newViews };
  }

  setViewError(viewName: string, error: Error): void {
    const view = this.state.views.get(viewName);
    if (!view) return;

    const newViews = new Map(this.state.views);
    newViews.set(viewName, { ...view, lastError: error });
    this.state = { views: newViews };
  }

  getView(viewName: string): ViewState | undefined {
    return this.state.views.get(viewName);
  }

  getAllViews(): ViewState[] {
    return Array.from(this.state.views.values());
  }

  getViewNames(): string[] {
    return Array.from(this.state.views.keys());
  }

  clear(): void {
    for (const view of this.state.views.values()) {
      view.abortController.abort();
    }
    this.state = { views: new Map() };
  }
}
