import type { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';

import { MViewConfigSchema } from './mview.schema';
import { MViewService } from './mview.service';

const mviewService = new MViewService();

export const mviewController = {
  getViews: asyncHandler((_req: Request, res: Response) => {
    const views = mviewService.getAllViews();
    res.json(views);
  }),

  getView: asyncHandler((req: Request, res: Response) => {
    const { viewName } = req.params;
    const view = mviewService.getViewDetails(viewName);

    if (!view) {
      res.status(404).json({ error: `View '${viewName}' not found` });
      return;
    }

    res.json(view);
  }),

  refreshView: asyncHandler(async (req: Request, res: Response) => {
    const { viewName } = req.params;

    try {
      const result = await mviewService.refreshView(viewName);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: `Failed to refresh view '${viewName}'`,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),

  refreshAllViews: asyncHandler(async (_req: Request, res: Response) => {
    const results = await mviewService.refreshAllViews();
    res.json(results);
  }),

  startScheduledRefresh: asyncHandler(async (req: Request, res: Response) => {
    const { viewName } = req.params;

    try {
      const result = await mviewService.startScheduledRefresh(viewName);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: `Failed to start scheduled refresh for '${viewName}'`,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),

  stopScheduledRefresh: asyncHandler(async (req: Request, res: Response) => {
    const { viewName } = req.params;

    try {
      const result = await mviewService.stopScheduledRefresh(viewName);
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: `Failed to stop scheduled refresh for '${viewName}'`,
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),

  startAllScheduledRefresh: asyncHandler(async (_req: Request, res: Response) => {
    try {
      const result = await mviewService.startAllScheduledRefresh();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to start all scheduled refreshes',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),

  stopAllScheduledRefresh: asyncHandler(async (_req: Request, res: Response) => {
    try {
      const result = await mviewService.stopAllScheduledRefresh();
      res.json(result);
    } catch (error) {
      res.status(500).json({
        error: 'Failed to stop all scheduled refreshes',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),

  getSystemHealth: asyncHandler((_req: Request, res: Response) => {
    const health = mviewService.getSystemHealth();
    res.json(health);
  }),

  getRegisteredViews: asyncHandler((_req: Request, res: Response) => {
    const viewNames = mviewService.getRegisteredViews();
    res.json({ views: viewNames });
  }),

  registerView: asyncHandler((req: Request, res: Response) => {
    const config = MViewConfigSchema.parse(req.body);

    try {
      mviewService.registerView(config);
      res.status(201).json({ success: true });
    } catch (error) {
      res.status(400).json({
        error: 'Failed to register view',
        details: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  }),
};
