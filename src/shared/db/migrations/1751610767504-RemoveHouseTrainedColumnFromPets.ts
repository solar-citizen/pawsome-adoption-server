import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveHouseTrainedColumnFromPets1751610767504 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      DROP COLUMN IF EXISTS is_house_trained;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE pets
      ADD COLUMN is_house_trained BOOLEAN NOT NULL DEFAULT FALSE;
    `);
  }
}
