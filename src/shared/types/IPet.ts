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
  thumbnails: Record<'800x600' | '640x480' | '400x300', string[]> | null;
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

// Shared types
export type IPetFiles = {
  photos?: string[];
  documents?: string[];
};

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

/**
 * Possible detail payloads for each species.
 */
export type ISpeciesDetailsData = {
  catDetails?: Omit<
    ICatDetails,
    'id' | 'lk_pet_code' | 'pet_id' | 'created_at' | 'updated_at' | 'pet'
  >;
  dogDetails?: Omit<
    IDogDetails,
    'id' | 'lk_pet_code' | 'pet_id' | 'created_at' | 'updated_at' | 'pet'
  >;
  horseDetails?: Omit<
    IHorseDetails,
    'id' | 'lk_pet_code' | 'pet_id' | 'created_at' | 'updated_at' | 'pet'
  >;
  farmAnimalDetails?: Omit<
    IFarmAnimalDetails,
    'id' | 'lk_pet_code' | 'pet_id' | 'created_at' | 'updated_at' | 'pet'
  >;
};
