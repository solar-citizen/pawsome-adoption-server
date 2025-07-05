import { type MigrationInterface, type QueryRunner } from 'typeorm';

export class CreatePetsTable1740565185815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE pets (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        breed VARCHAR(100) NOT NULL,
        is_available BOOLEAN NOT NULL DEFAULT FALSE,
        is_house_trained BOOLEAN NOT NULL DEFAULT FALSE,
        health VARCHAR(255),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE IF EXISTS pets;`);
  }
}
