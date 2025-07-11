import { EntityManager, type EntityTarget, Repository } from 'typeorm';

import { AppDataSource } from '#src/shared/config/dataSource';

export function getRepository<T extends object>(entity: EntityTarget<T>): Repository<T> {
  return AppDataSource.getRepository(entity);
}

export async function withTransaction<T>(
  operation: (manager: EntityManager) => Promise<T>,
): Promise<T> {
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const result = await operation(queryRunner.manager);
    await queryRunner.commitTransaction();
    return result;
  } catch (error) {
    await queryRunner.rollbackTransaction();
    throw error;
  } finally {
    await queryRunner.release();
  }
}
