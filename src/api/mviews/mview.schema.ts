import type { NextFunction, Request, Response } from 'express';
import type { ParamsDictionary } from 'express-serve-static-core';
import type { ParsedQs } from 'qs';
import { z, type ZodSchema } from 'zod';

import type { MViewConfig } from '#src/core';

export const MViewConfigSchema = z.object({
  name: z.string().min(1, 'View name is required').max(100, 'View name too long'),
  schedule: z.string().min(1, 'Schedule is required'),
  //   refreshQuery: z.string().optional(),
  //   dependencies: z.array(z.string()).optional(),
  //   timeout: z.number().positive().optional(),
});

// export const ViewNameParamSchema = z.object({
//   viewName: z.string().min(1, 'View name is required'),
// });

export function validateBody<T extends MViewConfig>(schema: z.ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validatedBody = schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

export function validateParams<T extends ParamsDictionary>(schema: ZodSchema<T>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validatedParams = schema.parse(req.params);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid parameters',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}

export function validateQuery<Q extends ParsedQs>(schema: ZodSchema<Q>) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      req.validatedQuery = schema.parse(req.query);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({
          success: false,
          error: 'Invalid query parameters',
          details: error.errors.map(err => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        });
      }
      next(error);
    }
  };
}
