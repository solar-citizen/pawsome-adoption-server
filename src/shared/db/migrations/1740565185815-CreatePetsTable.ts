import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreatePetsTable1740565185815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        breed VARCHAR(100) NOT NULL,
        special_needs VARCHAR(255),
        health VARCHAR(255),
        is_available BOOLEAN NOT NULL DEFAULT FALSE,
        is_house_trained BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS pets;`);
  }
}
