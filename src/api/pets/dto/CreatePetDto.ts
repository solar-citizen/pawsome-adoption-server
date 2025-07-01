export type CreatePetDto = {
  lk_pet_code: string;
  name: string;
  breed: string;
  specie: string;
  is_available?: boolean;
  is_house_trained?: boolean;
  health?: string;
};
