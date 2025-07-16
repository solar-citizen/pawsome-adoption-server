import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDescriptionColumnToPetsTable1752677012671 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE pets ADD COLUMN description_txt TEXT;`);
    await queryRunner.query(`ALTER TABLE pets ADD COLUMN age_int SMALLINT;`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE pets DROP COLUMN IF EXISTS description_txt;`);
    await queryRunner.query(`ALTER TABLE pets DROP COLUMN IF EXISTS age_int;`);
  }
}
