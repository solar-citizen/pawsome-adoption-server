import { type MigrationInterface, type QueryRunner, TableColumn } from 'typeorm';

import { tables } from '#src/shared/lib/constants';

const { pets } = tables;

export class AddSexAndSterilizationColumnsToPetsTable1751552124581 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      pets,
      new TableColumn({
        name: 'sex_txt',
        type: 'varchar(10)',
        isNullable: false,
        default: "'unknown'",
      }),
    );

    await queryRunner.addColumn(
      pets,
      new TableColumn({
        name: 'is_sterilized_flg',
        type: 'boolean',
        default: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(pets, 'is_sterilized_flg');
    await queryRunner.dropColumn(pets, 'sex_txt');
  }
}
