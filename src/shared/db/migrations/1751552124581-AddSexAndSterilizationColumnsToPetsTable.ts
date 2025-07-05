import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddSexAndSterilizationColumnsToPetsTable1751552124581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
        ADD COLUMN sex_txt VARCHAR(10) NOT NULL DEFAULT 'unknown',
        ADD COLUMN is_sterilized_flg BOOLEAN NOT NULL DEFAULT FALSE;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
        DROP COLUMN IF EXISTS is_sterilized_flg,
        DROP COLUMN IF EXISTS sex_txt;
    `);
  }
}
