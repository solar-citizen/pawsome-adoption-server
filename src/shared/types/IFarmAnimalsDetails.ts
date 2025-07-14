import type { IPet, IPetFiles } from '#src/shared';

export type IFarmAnimalDetails = {
  id: number;
  lk_pet_code: string;
  pet_id: number;
  is_fence_trained: boolean;
  primary_purpose: string;
  requires_special_housing: boolean;
  housing_requirements: string;
  good_with_herd: boolean;
  needs_companion: boolean;
  special_care_needs: string;
  pasture_size_needed: string;
  files: IPetFiles | null;
  created_at: Date;
  updated_at: Date;
  pet?: IPet;
};
