import { type MigrationInterface, type QueryRunner } from 'typeorm';

import { Pet } from '#src/shared/entities/Pet';

import { petUpdates } from './sample-data/petData';

export class UpdatePetsDataWithSexAndSterilization1751552256312 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const update of petUpdates) {
      await queryRunner.manager.update(
        Pet,
        { lk_pet_code: update.lk_pet_code },
        {
          sex_txt: update.sex_txt,
          is_sterilized_flg: update.is_sterilized_flg,
        },
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.update(
      Pet,
      {},
      {
        sex_txt: 'unknown',
        is_sterilized_flg: false,
      },
    );
  }
}
