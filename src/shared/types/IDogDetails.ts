import type { IPet, IPetFiles } from '#src/shared';

export type IDogDetails = {
  id: number;
  pet_id: number;
  lk_pet_code: string;
  is_house_trained: boolean;
  training_level: TrainingLevel;
  good_with_children: boolean;
  good_with_other_dogs: boolean;
  good_with_cats: boolean;
  energy_level: EnergyLevel;
  exercise_needs_minutes: number;
  files: IPetFiles | null;
  created_at: Date;
  updated_at: Date;
  pet?: IPet;
};

export type TrainingLevel = 'basic' | 'intermediate' | 'advanced';
export type EnergyLevel = 'low' | 'moderate' | 'high' | 'very_high';

export type CreateDogDetailsInput = Omit<IDogDetails, 'id' | 'created_at' | 'updated_at' | 'pet'>;
export type UpdateDogDetailsInput = Partial<
  Omit<IDogDetails, 'id' | 'created_at' | 'updated_at' | 'pet'>
> & {
  id: number;
};
