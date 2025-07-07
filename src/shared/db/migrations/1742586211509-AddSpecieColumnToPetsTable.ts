import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class AddSpecieColumnToPetsTable1742586211509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TYPE specie AS ENUM ('cat', 'dog', 'horse', 'farm-animal', 'other');
    `);

    await queryRunner.query(`
      ALTER TABLE pets
      ADD COLUMN specie specie NOT NULL DEFAULT 'other';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      DROP COLUMN IF EXISTS specie;
    `);

    await queryRunner.query(`DROP TYPE IF EXISTS specie;`);
  }
}
