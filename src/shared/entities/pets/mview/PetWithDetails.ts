import { ViewColumn, ViewEntity } from 'typeorm';

@ViewEntity('pets_with_details')
export class PetWithDetails {
  @ViewColumn()
  id: number;

  @ViewColumn()
  lk_pet_code: string;

  @ViewColumn()
  name: string;

  @ViewColumn()
  breed: string;

  @ViewColumn()
  specie: string;

  @ViewColumn()
  sex_txt: string;

  @ViewColumn()
  is_available: boolean;

  @ViewColumn()
  is_sterilized_flg: boolean;

  @ViewColumn()
  health: string;

  @ViewColumn()
  created_at: Date;

  @ViewColumn()
  updated_at: Date;

  // Cat Details
  @ViewColumn()
  cat_is_litter_trained: boolean;

  @ViewColumn()
  cat_is_indoor_only: boolean;

  @ViewColumn()
  cat_is_declawed: boolean;

  @ViewColumn()
  cat_personality_type: string;

  @ViewColumn()
  cat_good_with_children: boolean;

  @ViewColumn()
  cat_good_with_other_cats: boolean;

  @ViewColumn()
  cat_good_with_dogs: boolean;

  @ViewColumn()
  cat_needs_special_diet: boolean;

  // Dog Details
  @ViewColumn()
  dog_is_house_trained: boolean;

  @ViewColumn()
  dog_training_level: string;

  @ViewColumn()
  dog_good_with_children: boolean;

  @ViewColumn()
  dog_good_with_other_dogs: boolean;

  @ViewColumn()
  dog_good_with_cats: boolean;

  @ViewColumn()
  dog_energy_level: string;

  @ViewColumn()
  dog_exercise_needs: number;

  // Horse Details
  @ViewColumn()
  horse_is_saddle_trained: boolean;

  @ViewColumn()
  horse_is_ground_trained: boolean;

  @ViewColumn()
  horse_riding_level: string;

  @ViewColumn()
  horse_height_hands: number;

  @ViewColumn()
  horse_weight_lbs: number;

  @ViewColumn()
  horse_discipline: string;

  @ViewColumn()
  horse_temperament: string;

  @ViewColumn()
  horse_suitable_for_beginners: boolean;

  // Farm Animal Details
  @ViewColumn()
  farm_is_fence_trained: boolean;

  @ViewColumn()
  farm_primary_purpose: string;

  @ViewColumn()
  farm_requires_special_housing: boolean;

  @ViewColumn()
  farm_housing_requirements: string;

  @ViewColumn()
  farm_good_with_herd: boolean;

  @ViewColumn()
  farm_needs_companion: boolean;

  @ViewColumn()
  farm_special_care_needs: string;

  @ViewColumn()
  farm_pasture_size_needed: number;
}
