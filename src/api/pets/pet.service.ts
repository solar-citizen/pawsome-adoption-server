import { Repository } from 'typeorm';
import { z, ZodError } from 'zod';
import { fromZodError } from 'zod-validation-error';

import {
  AppDataSource,
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalDetails,
  type IHorseDetails,
  type IPet,
  type IPetWithDetails,
  Pet,
  PetWithDetails,
} from '#src/shared';

import { getPaginatedPets } from './lib/getPaginatedPets';
import { processUploadedFilesWithRepos } from './lib/processUploadedFiles';
import { PetCreateSchema } from './pet.schema';

export class PetService {
  constructor(
    private readonly petRepo: Repository<Pet> = AppDataSource.getRepository(Pet),
    private readonly petWithDetailsRepo: Repository<PetWithDetails> = AppDataSource.getRepository(
      PetWithDetails,
    ),
  ) {}

  /**
   * Get paginated pets with optional filtering for general usage.
   */
  getPaginatedPets = async (page = 1, limit = 10, fullTextSearch: string | null = null) => {
    return getPaginatedPets(this.petRepo, 'pet', page, limit, fullTextSearch);
  };

  /**
   * Get a plain Pet by its lk_pet_code.
   */
  async getPetByCode(lk_pet_code: string): Promise<IPet | null> {
    return this.petRepo
      .createQueryBuilder('pet')
      .where('pet.lk_pet_code = :code', { code: lk_pet_code })
      .getOne();
  }

  /**
   * Get Pet with species-specific details joined.
   */
  async getPetByCodeWithSpeciesDetails(
    lk_pet_code: string,
  ): Promise<IPetWithDetails | IPet | null> {
    const result = await this.petRepo
      .createQueryBuilder('pet')
      .leftJoinAndSelect('pet.catDetails', 'catDetails')
      .leftJoinAndSelect('pet.dogDetails', 'dogDetails')
      .leftJoinAndSelect('pet.horseDetails', 'horseDetails')
      .leftJoinAndSelect('pet.farmAnimalDetails', 'farmAnimalDetails')
      .where('pet.lk_pet_code = :code', { code: lk_pet_code })
      .getOne();

    return result ?? null;
  }

  /**
   * Get Pet with species details and similar pets
   * filtered by specie, breed, and age.
   */
  async getPetByCodeWithSpeciesDetailsAndSimilarPets(
    lk_pet_code: string,
  ): Promise<{ main: IPetWithDetails | IPet | null; similar: IPet[] }> {
    const main = await this.getPetByCodeWithSpeciesDetails(lk_pet_code);

    if (!main) {
      return { main: null, similar: [] };
    }

    const qb = this.petRepo
      .createQueryBuilder('pet')
      .where('pet.lk_pet_code != :code', { code: lk_pet_code })
      .andWhere('pet.specie = :specie', { specie: main.specie });

    if ((main as IPet).breed) {
      qb.andWhere('pet.breed = :breed', { breed: main.breed });
    }

    if ((main as IPet).age_int != null) {
      qb.andWhere('pet.age_int = :age', { age: main.age_int });
    }

    const similar = await qb.getMany();

    return { main, similar };
  }

  /**
   * Get paginated pets with details from materialized view for reports.
   */
  getPaginatedPetsWithDetails = async (
    page = 1,
    limit = 10,
    fullTextSearch: string | null = null,
  ) => {
    return getPaginatedPets(this.petWithDetailsRepo, 'pwd', page, limit, fullTextSearch);
  };

  /**
   * Creates a new pet with optional file uploads (photos and documents).
   */
  async createPet(petData: unknown, files: Express.Multer.File[] | null): Promise<IPet> {
    let dataTyped: z.infer<typeof PetCreateSchema>;

    try {
      dataTyped = PetCreateSchema.parse(petData);
    } catch (error) {
      if (error instanceof ZodError) {
        throw new Error(fromZodError(error).toString());
      }
      throw error;
    }

    return processUploadedFilesWithRepos(
      this.petRepo,
      dataTyped as Partial<IPet> & (ICatDetails | IDogDetails | IFarmAnimalDetails | IHorseDetails),
      files,
    );
  }
}
