import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddSpecieColumnToPetsTable1742586211509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      ADD COLUMN specie VARCHAR(100) NOT NULL;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      DROP COLUMN IF EXISTS specie;
    `);
  }
}
