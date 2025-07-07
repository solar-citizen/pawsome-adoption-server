import type { IPet } from '#src/shared';

export type ICatDetails = {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_litter_trained: boolean;
  is_indoor_only: boolean;
  is_declawed: boolean;
  personality_type: string;
  good_with_children: boolean;
  good_with_other_cats: boolean;
  good_with_dogs: boolean;
  needs_special_diet: boolean;
  created_at: Date;
  updated_at: Date;
  pet?: IPet;
};
