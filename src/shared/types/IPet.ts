import {
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalDetails,
  type IHorseDetails,
  unionValues,
} from '#src/shared';

export type IPet = {
  id: number;
  lk_pet_code: string;
  name: string;
  breed: string;
  specie: Specie;
  sex_txt: string;
  special_needs: string | null;
  health: string | null;
  is_available: boolean;
  is_sterilized_flg: boolean;
  created_at: Date;
  updated_at: Date;
  dogDetails?: IDogDetails;
  catDetails?: ICatDetails;
  horseDetails?: IHorseDetails;
  farmAnimalDetails?: IFarmAnimalDetails;
};

export type Specie = (typeof unionValues.SPECIES)[number];

// Mixed types
export type IPetWithDogDetails = IPet & {
  dogDetails: IDogDetails;
};

export type IPetWithCatDetails = IPet & {
  catDetails: ICatDetails;
};

export type IPetWithHorseDetails = IPet & {
  horseDetails: IHorseDetails;
};

export type IPetWithFarmAnimalDetails = IPet & {
  farmAnimalDetails: IFarmAnimalDetails;
};

export type IPetWithDetails =
  | IPetWithDogDetails
  | IPetWithCatDetails
  | IPetWithHorseDetails
  | IPetWithFarmAnimalDetails;
