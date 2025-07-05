import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePetDetailsTables1751567604733 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // 1. Create cat_details
    await queryRunner.query(`
      CREATE TABLE cat_details (
        id SERIAL PRIMARY KEY,
        pet_id INT NOT NULL,
        lk_pet_code VARCHAR(20),
        is_litter_trained BOOLEAN NOT NULL DEFAULT FALSE,
        is_indoor_only   BOOLEAN NOT NULL DEFAULT FALSE,
        is_declawed      BOOLEAN NOT NULL DEFAULT FALSE,
        personality_type VARCHAR(50),
        good_with_children    BOOLEAN NOT NULL DEFAULT FALSE,
        good_with_other_cats  BOOLEAN NOT NULL DEFAULT FALSE,
        good_with_dogs        BOOLEAN NOT NULL DEFAULT FALSE,
        needs_special_diet    BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(`
      ALTER TABLE cat_details
        ADD CONSTRAINT fk_cat_details_pet_id
          FOREIGN KEY (pet_id) REFERENCES pets(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_cat_details_pet_id
        ON cat_details(pet_id);
    `);

    // 2. Create dog_details
    await queryRunner.query(`
      CREATE TABLE dog_details (
        id SERIAL PRIMARY KEY,
        pet_id INT NOT NULL,
        lk_pet_code VARCHAR(20),
        is_house_trained BOOLEAN NOT NULL DEFAULT FALSE,
        training_level   VARCHAR(50),
        good_with_children BOOLEAN NOT NULL DEFAULT FALSE,
        good_with_other_dogs BOOLEAN NOT NULL DEFAULT FALSE,
        good_with_cats      BOOLEAN NOT NULL DEFAULT FALSE,
        energy_level     VARCHAR(50),
        exercise_needs_minutes INT,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(`
      ALTER TABLE dog_details
        ADD CONSTRAINT fk_dog_details_pet_id
          FOREIGN KEY (pet_id) REFERENCES pets(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_dog_details_pet_id
        ON dog_details(pet_id);
    `);

    // 3. Create horse_details
    await queryRunner.query(`
      CREATE TABLE horse_details (
        id SERIAL PRIMARY KEY,
        pet_id INT NOT NULL,
        lk_pet_code VARCHAR(20),
        is_saddle_trained BOOLEAN NOT NULL DEFAULT FALSE,
        is_ground_trained BOOLEAN NOT NULL DEFAULT FALSE,
        riding_level     VARCHAR(50),
        height_hands     DECIMAL(5,2),
        weight_lbs       INT,
        discipline       VARCHAR(50),
        temperament      VARCHAR(50),
        suitable_for_beginners BOOLEAN NOT NULL DEFAULT FALSE,
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(`
      ALTER TABLE horse_details
        ADD CONSTRAINT fk_horse_details_pet_id
          FOREIGN KEY (pet_id) REFERENCES pets(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_horse_details_pet_id
        ON horse_details(pet_id);
    `);

    // 4. Create farm_animals_details
    await queryRunner.query(`
      CREATE TABLE farm_animals_details (
        id SERIAL PRIMARY KEY,
        pet_id INT NOT NULL,
        lk_pet_code VARCHAR(20),
        is_fence_trained BOOLEAN NOT NULL DEFAULT FALSE,
        primary_purpose VARCHAR(50),
        requires_special_housing BOOLEAN NOT NULL DEFAULT FALSE,
        housing_requirements VARCHAR(255),
        good_with_herd   BOOLEAN NOT NULL DEFAULT FALSE,
        needs_companion  BOOLEAN NOT NULL DEFAULT FALSE,
        special_care_needs VARCHAR(100),
        pasture_size_needed VARCHAR(50),
        created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
        updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `);
    await queryRunner.query(`
      ALTER TABLE farm_animals_details
        ADD CONSTRAINT fk_farm_animals_details_pet_id
          FOREIGN KEY (pet_id) REFERENCES pets(id)
          ON DELETE CASCADE ON UPDATE CASCADE;
    `);
    await queryRunner.query(`
      CREATE UNIQUE INDEX idx_farm_animals_details_pet_id
        ON farm_animals_details(pet_id);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // 1. Drop farm_animals_details
    await queryRunner.query(`
      ALTER TABLE farm_animals_details
        DROP CONSTRAINT IF EXISTS fk_farm_animals_details_pet_id;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_farm_animals_details_pet_id;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS farm_animals_details;
    `);

    // 2. Drop horse_details
    await queryRunner.query(`
      ALTER TABLE horse_details
        DROP CONSTRAINT IF EXISTS fk_horse_details_pet_id;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_horse_details_pet_id;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS horse_details;
    `);

    // 3. Drop dog_details
    await queryRunner.query(`
      ALTER TABLE dog_details
        DROP CONSTRAINT IF EXISTS fk_dog_details_pet_id;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_dog_details_pet_id;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS dog_details;
    `);

    // 4. Drop cat_details
    await queryRunner.query(`
      ALTER TABLE cat_details
        DROP CONSTRAINT IF EXISTS fk_cat_details_pet_id;
    `);
    await queryRunner.query(`
      DROP INDEX IF EXISTS idx_cat_details_pet_id;
    `);
    await queryRunner.query(`
      DROP TABLE IF EXISTS cat_details;
    `);
  }
}
