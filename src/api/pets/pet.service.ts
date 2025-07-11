import { z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import {
  AppDataSource,
  ICatDetails,
  IDogDetails,
  IFarmAnimalDetails,
  IHorseDetails,
  IPet,
  Pet,
  PetWithDetails,
} from '#src/shared';

import { getPaginatedPets } from './lib/getPaginatedPets';
import { processUploadedFilesWithRepos } from './lib/processUploadedFiles';
import { PetCreateSchema } from './pet.schema';

const petRepository = AppDataSource.getRepository(Pet);
const petWithDetailsRepository = AppDataSource.getRepository(PetWithDetails);

export const petService = {
  /**
   * Get paginated pets with optional filtering from the table
   * for general usage
   */
  getPaginatedPets: async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    return getPaginatedPets(petRepository, 'pet', page, limit, fullTextSearch);
  },

  /**
   * Get paginated pets with optional filtering from materialized view
   * mainly for reports
   */
  getPaginatedPetsWithDetails: async (
    page = 1,
    limit = 10,
    fullTextSearch: string | null = null,
  ) => {
    return getPaginatedPets(petWithDetailsRepository, 'pwd', page, limit, fullTextSearch);
  },

  /**
   * Creates a new pet with optional file uploads (photos and documents).
   *
   * @param {unknown} petData
   * Raw pet data to be validated and processed. Must conform to PetCreateSchema
   * @param {Express.Multer.File[] | null} files
   * Array of uploaded files (photos/documents) or null if no files
   * @returns {Promise<IPet>}
   * Promise that resolves to the created pet entity with generated thumbnails
   * @throws {Error} Throws validation error if petData doesn't match PetCreateSchema
   * @throws {Error} Throws database or file processing errors during pet creation
   */
  createPet: async (petData: unknown, files: Express.Multer.File[] | null): Promise<IPet> => {
    let dataTyped: z.infer<typeof PetCreateSchema>;

    try {
      dataTyped = PetCreateSchema.parse(petData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(fromZodError(error).toString());
      }
      throw error;
    }

    return await processUploadedFilesWithRepos(
      petRepository,
      dataTyped as Partial<IPet> & (ICatDetails | IDogDetails | IFarmAnimalDetails | IHorseDetails),
      files,
    );
  },
};
