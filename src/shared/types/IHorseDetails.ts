import type { IPet } from '#src/shared';

export type IHorseDetails = {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_saddle_trained: boolean;
  is_ground_trained: boolean;
  riding_level: string;
  height_hands: number;
  weight_lbs: number;
  discipline: string;
  temperament: string;
  suitable_for_beginners: boolean;
  created_at: Date;
  updated_at: Date;
  pet?: IPet;
};
