import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddLkPetCodeColumnToPetsTable1742586211507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      ADD COLUMN lk_pet_code VARCHAR(20) NOT NULL;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_lk_pet_code
      ON pets(lk_pet_code);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_lk_pet_code;
    `);
    await queryRunner.query(`
      ALTER TABLE pets
      DROP COLUMN IF EXISTS lk_pet_code;
    `);
  }
}
