import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePetsWithDetailsMView1751643849972 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE MATERIALIZED VIEW IF NOT EXISTS pets_with_details AS
      SELECT
        p.id,
        p.lk_pet_code,
        p.name,
        p.breed,
        p.specie,
        p.sex_txt,
        p.is_available,
        p.is_sterilized_flg,
        p.health,
        p.created_at,
        p.updated_at,

        cd.is_litter_trained    AS cat_is_litter_trained,
        cd.is_indoor_only       AS cat_is_indoor_only,
        cd.is_declawed          AS cat_is_declawed,
        cd.personality_type     AS cat_personality_type,
        cd.good_with_children   AS cat_good_with_children,
        cd.good_with_other_cats AS cat_good_with_other_cats,
        cd.good_with_dogs       AS cat_good_with_dogs,
        cd.needs_special_diet   AS cat_needs_special_diet,

        dd.is_house_trained     AS dog_is_house_trained,
        dd.training_level       AS dog_training_level,
        dd.good_with_children   AS dog_good_with_children,
        dd.good_with_other_dogs AS dog_good_with_other_dogs,
        dd.good_with_cats       AS dog_good_with_cats,
        dd.energy_level         AS dog_energy_level,
        dd.exercise_needs_minutes AS dog_exercise_needs,

        hd.is_saddle_trained    AS horse_is_saddle_trained,
        hd.is_ground_trained    AS horse_is_ground_trained,
        hd.riding_level         AS horse_riding_level,
        hd.height_hands         AS horse_height_hands,
        hd.weight_lbs           AS horse_weight_lbs,
        hd.discipline           AS horse_discipline,
        hd.temperament          AS horse_temperament,
        hd.suitable_for_beginners AS horse_suitable_for_beginners,

        fd.is_fence_trained     AS farm_is_fence_trained,
        fd.primary_purpose      AS farm_primary_purpose,
        fd.requires_special_housing AS farm_requires_special_housing,
        fd.housing_requirements AS farm_housing_requirements,
        fd.good_with_herd       AS farm_good_with_herd,
        fd.needs_companion      AS farm_needs_companion,
        fd.special_care_needs   AS farm_special_care_needs,
        fd.pasture_size_needed  AS farm_pasture_size_needed

      FROM pets p
      LEFT JOIN cat_details   cd ON cd.pet_id = p.id
      LEFT JOIN dog_details   dd ON dd.pet_id = p.id
      LEFT JOIN horse_details hd ON hd.pet_id = p.id
      LEFT JOIN farm_animals_details fd ON fd.pet_id = p.id;
    `);

    // Add unique index on id
    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_pets_with_details_id
        ON pets_with_details(id);
    `);

    // Additional index on specie
    await queryRunner.query(`
      CREATE INDEX IF NOT EXISTS idx_pets_with_details_specie
        ON pets_with_details(specie);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_pets_with_details_specie;
    `);

    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_pets_with_details_id;
    `);

    await queryRunner.query(`
      DROP MATERIALIZED VIEW IF EXISTS pets_with_details;
    `);
  }
}
