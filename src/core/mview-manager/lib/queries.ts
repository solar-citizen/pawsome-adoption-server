import type { MViewState, MViewStatus } from './types';

function getViewStatus(state: MViewState, viewName: string): MViewStatus | undefined {
  const view = state.views.get(viewName);
  if (!view) return undefined;

  return {
    name: viewName,
    isRunning: view.isRunning,
    isScheduled: !!view.task,
    lastRefresh: view.lastRefresh,
    lastError: view.lastError,
  };
}

function getAllStatuses(state: MViewState): MViewStatus[] {
  return Array.from(state.views.keys())
    .map(viewName => getViewStatus(state, viewName))
    .filter((status): status is MViewStatus => status !== undefined);
}

function isAnyRefreshing(state: MViewState): boolean {
  return Array.from(state.views.values()).some(view => view.isRunning);
}

function getRegisteredViews(state: MViewState): string[] {
  return Array.from(state.views.keys());
}

export const queries = {
  getViewStatus,
  getAllStatuses,
  isAnyRefreshing,
  getRegisteredViews,
};
