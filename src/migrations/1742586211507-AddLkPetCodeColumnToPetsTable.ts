import { MigrationInterface, QueryRunner, TableColumn, TableIndex } from 'typeorm'
import { constants } from '#/lib'

const { pets } = constants.tables

export class AddLkPetCodeColumnToPetsTable1742586211507 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      pets,
      new TableColumn({
        name: 'lk_pet_code',
        type: 'varchar(20)',
        isNullable: false,
        isUnique: true,
      }),
    )

    await queryRunner.createIndex(
      pets,
      new TableIndex({
        name: 'idx_lk_pet_code',
        columnNames: ['lk_pet_code'],
        isUnique: true,
      }),
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropIndex(pets, 'idx_pet_code')
    await queryRunner.dropColumn(pets, 'pet_code')
  }
}
