import { type MigrationInterface, type QueryRunner, Table } from 'typeorm';

import { tables } from '#src/shared/lib/constants';

const { pets } = tables;

export class CreatePetsTable1740565185815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: pets,
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'breed',
            type: 'varchar(100)',
            isNullable: false,
          },
          {
            name: 'is_available',
            type: 'boolean',
            default: false,
          },
          {
            name: 'is_house_trained',
            type: 'boolean',
            default: false,
          },
          {
            name: 'health',
            type: 'varchar(255)',
          },
          {
            name: 'created_at',
            type: 'timestamptz',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamptz',
            default: 'now()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(pets);
  }
}
