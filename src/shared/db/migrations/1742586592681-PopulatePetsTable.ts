import { MigrationInterface, QueryRunner } from 'typeorm';

import { Pet } from '#src/shared/entities/Pet';

import { petCodes, petData } from './sample-data/petData';

export class PopulatePetsTable1742586592681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.manager.save(Pet, petData);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await Promise.all(petCodes.map(code => queryRunner.manager.delete(Pet, { lk_pet_code: code })));
  }
}
