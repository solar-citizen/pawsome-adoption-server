import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm'
import { constants } from '@/src/lib'

const { pets } = constants.tables

export class AddSpecieColumnToPetsTable1742586211509 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      pets,
      new TableColumn({
        name: 'specie',
        type: 'varchar(100)',
        isNullable: false,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn(pets, 'specie')
  }
}