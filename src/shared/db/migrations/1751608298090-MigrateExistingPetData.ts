import { MigrationInterface, QueryRunner } from 'typeorm';

export class MigrateExistingPetData1751608298090 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      INSERT INTO dog_details (
        pet_id,
        lk_pet_code,
        is_house_trained,
        training_level,
        good_with_children,
        good_with_other_dogs,
        good_with_cats,
        energy_level,
        exercise_needs_minutes
      )
      SELECT
        p.id,
        p.lk_pet_code,
        COALESCE(is_house_trained, FALSE),
        'basic',
        TRUE,
        TRUE,
        FALSE,
        'moderate',
        60
      FROM pets AS p
      WHERE LOWER(specie) = 'dog';
    `);

    await queryRunner.query(`
      INSERT INTO cat_details (
        pet_id,
        lk_pet_code,
        is_litter_trained,
        is_indoor_only,
        is_declawed,
        personality_type,
        good_with_children,
        good_with_other_cats,
        good_with_dogs,
        needs_special_diet
      )
      SELECT
        p.id,
        p.lk_pet_code,
        COALESCE(is_house_trained, FALSE),
        FALSE,
        FALSE,
        'calms',
        TRUE,
        TRUE,
        FALSE,
        FALSE
      FROM pets AS p
      WHERE LOWER(specie) = 'cat';
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DELETE FROM dog_details;`);
    await queryRunner.query(`DELETE FROM cat_details;`);
  }
}
