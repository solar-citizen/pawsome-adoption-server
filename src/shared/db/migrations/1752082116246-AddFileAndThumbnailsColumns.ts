import { type MigrationInterface, QueryRunner } from 'typeorm';

export class AddFileAndThumbnailsColumns1752082116246 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE pets ADD COLUMN thumbnails JSONB;');
    await queryRunner.query(`
        ALTER TABLE cat_details ADD COLUMN files JSONB;
        ALTER TABLE dog_details ADD COLUMN files JSONB;
        ALTER TABLE horse_details ADD COLUMN files JSONB;
        ALTER TABLE farm_animals_details ADD COLUMN files JSONB;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE pets DROP COLUMN IF EXISTS thumbnails;');
    await queryRunner.query(`
        ALTER TABLE cat_details DROP COLUMN IF EXISTS files;
        ALTER TABLE dog_details DROP COLUMN IF EXISTS files;
        ALTER TABLE horse_details DROP COLUMN IF EXISTS files;
        ALTER TABLE farm_animals_details DROP COLUMN IF EXISTS files;
    `);
  }
}
