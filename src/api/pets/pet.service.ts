import { fromZodError } from 'zod-validation-error';

import { AppDataSource, Pet } from '#src/shared';

import { PetSchema } from './pet.schema';

const petRepository = AppDataSource.getRepository(Pet);

export const petService = {
  /**
   * Get paginated pets with optional filtering
   */
  getPaginatedPets: async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    const offset = (page - 1) * limit;

    const qb = petRepository.createQueryBuilder('pet');

    if (fullTextSearch) {
      const query = `%${fullTextSearch}%`;
      qb.where('pet.name ILIKE :query', { query })
        .orWhere('pet.breed ILIKE :query', { query })
        .orWhere('pet.specie ILIKE :query', { query });
    }

    qb.skip(offset).take(limit).orderBy('pet.lk_pet_code', 'ASC');

    const [pets, petsTotal] = await qb.getManyAndCount();

    const petsFrom = petsTotal > 0 ? offset + 1 : 0;
    const petsTo = petsTotal > 0 ? Math.min(offset + limit, petsTotal) : 0;
    const lastPage = Math.max(Math.ceil(petsTotal / limit), 1);

    return {
      data: pets,
      meta: {
        currentPage: page,
        perPage: limit,
        lastPage,
        petsFrom,
        petsTo,
        petsTotal,
      },
    };
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
