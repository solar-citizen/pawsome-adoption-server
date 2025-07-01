import { ILike } from 'typeorm';

import { AppDataSource, Pet } from '#src/shared';

import type { CreatePetDto } from './dto/CreatePetDto';

const petRepository = AppDataSource.getRepository(Pet);

export const petService = {
  /**
   * Get paginated pets with optional filtering
   */
  getPaginatedPets: async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    const offset = (page - 1) * limit;

    // Fetch data and count based on pagination offset and params
    const [pets, petsTotal] = await Promise.all([
      petRepository.find({
        skip: offset,
        take: limit,
        where: fullTextSearch ? [{ name: ILike(`%${fullTextSearch}%`) }] : {},
        order: { lk_pet_code: 'ASC' },
      }),
      petRepository.count(),
    ]);

    // Calculate pagination metadata
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

  createPet: async (petData: CreatePetDto) => {
    const pet = petRepository.create(petData);
    return await petRepository.save(pet);
  },
};
