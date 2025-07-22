import type { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateMviewLogTable1752513222950 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "pgcrypto";`);

    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS mview_log (
            id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
            name TEXT NOT NULL,
            started_at TIMESTAMPTZ NOT NULL DEFAULT now(),
            finished_at TIMESTAMPTZ NULL,
            status TEXT NOT NULL DEFAULT 'TO BE STARTED',
            error TEXT NULL
        );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS mview_log;`);
  }
}
