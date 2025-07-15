import type { EntityManager } from 'typeorm';

import { AppDataSource, withTransaction } from '#src/shared';

import type { MViewLogger } from './types';

export class DBMViewLogger implements MViewLogger {
  async executeWithLogging<T>(viewName: string, operation: () => Promise<T>): Promise<T> {
    return withTransaction(async (manager: EntityManager) => {
      const insertResult = await manager
        .createQueryBuilder()
        .insert()
        .into('mview_log')
        .values({ name: viewName, status: 'STARTED' })
        .returning('id')
        .execute();

      const logId = (insertResult.raw as [{ id: string }])[0].id;
      const result = await operation();

      await manager
        .createQueryBuilder()
        .update('mview_log')
        .set({ finished_at: () => 'now()', status: 'SUCCEEDED' })
        .where('id = :id', { id: logId })
        .execute();

      return result;
    }).catch(async (err: unknown) => {
      await AppDataSource.createQueryBuilder()
        .insert()
        .into('mview_log')
        .values({
          name: viewName,
          status: 'FAILED',
          error: err instanceof Error ? err.message : String(err),
          finished_at: () => 'now()',
        })
        .execute();

      throw err;
    });
  }
}
