import { MigrationInterface, QueryRunner } from 'typeorm';

import { petCodes, petData } from './sample-data/petData';

export class PopulatePetsTable1742586592681 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const rows = petData.map(p => {
      const vals = [
        `'${p.lk_pet_code}'`,
        `'${p.name.replace(/'/g, "''")}'`,
        `'${p.breed.replace(/'/g, "''")}'`,
        `'${p.specie.replace(/'/g, "''")}'`,
        p.is_available,
        p.is_house_trained,
        `'${p.health.replace(/'/g, "''")}'`,
      ].join(', ');
      return `(${vals})`;
    });

    await queryRunner.query(`
      INSERT INTO pets
        (lk_pet_code, name, breed, specie, is_available, is_house_trained, health)
      VALUES
        ${rows.join(',\n        ')}
      ;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const codeList = petCodes.map(c => `'${c}'`).join(', ');

    await queryRunner.query(`
      DELETE FROM pets
      WHERE lk_pet_code IN (${codeList});
    `);
  }
}
