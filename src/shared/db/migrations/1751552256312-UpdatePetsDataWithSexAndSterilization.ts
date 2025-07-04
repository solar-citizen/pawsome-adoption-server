import { type MigrationInterface, type QueryRunner } from 'typeorm';

import { petUpdates } from './sample-data/petData';

export class UpdatePetsDataWithSexAndSterilization1751552256312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const values = petUpdates
      .map(u => {
        const code = `'${u.lk_pet_code}'`;
        const sex = `'${u.sex_txt.replace(/'/g, "''")}'`;
        const isSterilizedFlg = u.is_sterilized_flg;
        return `(${code}, ${sex}, ${isSterilizedFlg.toString()})`;
      })
      .join(',\n        ');

    await queryRunner.query(`
      UPDATE pets AS tgt
      SET
        sex_txt = src.sex_txt,
        is_sterilized_flg = src.is_sterilized_flg
      FROM (
        VALUES
          ${values}
      ) AS src(lk_pet_code, sex_txt, is_sterilized_flg)
      WHERE tgt.lk_pet_code = src.lk_pet_code;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      UPDATE pets
      SET 
        sex_txt = 'unknown',
        is_sterilized_flg = FALSE;
    `);
  }
}
