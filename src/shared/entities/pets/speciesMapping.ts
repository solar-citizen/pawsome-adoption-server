import { CatDetails } from './details/CatDetails';
import { DogDetails } from './details/DogDetails';
import { FarmAnimalDetails } from './details/FarmAnimalDetails';
import { HorseDetails } from './details/HorseDetails';

export const SPECIES_MAPPING = {
  cat: { entity: CatDetails, key: 'catDetails' },
  dog: { entity: DogDetails, key: 'dogDetails' },
  horse: { entity: HorseDetails, key: 'horseDetails' },
  'farm-animal': { entity: FarmAnimalDetails, key: 'farmAnimalDetails' },
} as const;
