import { Router } from 'express';

import { mviewController } from './mview.controller';

const mviewRouter = Router();

const {
  getViews,
  getView,
  refreshView,
  refreshAllViews,
  startScheduledRefresh,
  stopScheduledRefresh,
  startAllScheduledRefresh,
  stopAllScheduledRefresh,
  getSystemHealth,
  getRegisteredViews,
  registerView,
} = mviewController;

// System health and status endpoints
mviewRouter.get('/health', getSystemHealth);

// View management endpoints
mviewRouter.get('/views', getViews);
mviewRouter.get('/views/names', getRegisteredViews);
mviewRouter.post('/views', registerView);

// Batch operations
mviewRouter.post('/views/refresh', refreshAllViews);
mviewRouter.post('/views/schedule/start', startAllScheduledRefresh);
mviewRouter.post('/views/schedule/stop', stopAllScheduledRefresh);

// Individual view operations
mviewRouter.get('/views/:viewName', getView);
mviewRouter.post('/views/:viewName/refresh', refreshView);
mviewRouter.post('/views/:viewName/schedule/start', startScheduledRefresh);
mviewRouter.post('/views/:viewName/schedule/stop', stopScheduledRefresh);

export { mviewRouter };
