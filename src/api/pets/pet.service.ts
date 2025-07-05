import { fromZodError } from 'zod-validation-error';

import { AppDataSource, Pet, PetWithDetails } from '#src/shared';

import { getPaginatedPets } from './lib/getPaginatedPets';
import { PetSchema } from './pet.schema';

const petRepository = AppDataSource.getRepository(Pet);
const petWithDetailsRepository = AppDataSource.getRepository(PetWithDetails);

export const petService = {
  /**
   * Get paginated pets with optional filtering from materialized view
   */
  getPaginatedPets: async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    return getPaginatedPets(petWithDetailsRepository, 'pwd', page, limit, fullTextSearch);
  },

  /**
   * Get paginated pets with optional filtering from the table
   */
  getPaginatedPetsRaw: async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    return getPaginatedPets(petRepository, 'pet', page, limit, fullTextSearch);
  },

  createPet: async (petData: unknown): Promise<Pet> => {
    const result = PetSchema.create.safeParse(petData);
    const { success, error, data } = result;

    if (!success) {
      throw new Error(fromZodError(error).toString());
    }

    const pet = petRepository.create(data);
    return await petRepository.save(pet);
  },
};
