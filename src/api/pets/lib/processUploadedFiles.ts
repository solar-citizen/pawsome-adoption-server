import 'dotenv/config';

import path from 'path';
import type { DeepPartial, EntityTarget, ObjectLiteral, QueryRunner, Repository } from 'typeorm';

import {
  CatDetails,
  cleanupFiles,
  DogDetails,
  FarmAnimalDetails,
  HorseDetails,
  type IPet,
  type ISpeciesDetailsData,
  MulterFilesObject,
  multerUtils,
  Pet,
  processImage,
} from '#src/shared';

const host = process.env.HOST;

/**
 * Processes uploaded photos & documents, generates thumbnails,
 * persists Pet (and optional species details) in a single transaction,
 * and cleans up all uploaded files on error.
 */
export async function processUploadedFilesWithRepos(
  petRepository: Repository<Pet>,
  petData: Partial<IPet> & ISpeciesDetailsData,
  files: Express.Multer.File[] | MulterFilesObject | null,
): Promise<IPet> {
  const { photos, documents, allFiles } = multerUtils.processFiles(files);
  const thumbnailsBySize: {
    '800x600': string[];
    '640x480': string[];
    '400x300': string[];
  } = {
    '800x600': [],
    '640x480': [],
    '400x300': [],
  };

  for (const file of photos) {
    const sizes = await processImage(file.path);
    for (const key of Object.keys(sizes) as (keyof typeof sizes)[]) {
      const thumbnailPath = path.relative(process.cwd(), sizes[key]).replace(/\\/g, '/');
      thumbnailsBySize[key].push(`${host || ''}/${thumbnailPath}`);
    }
  }

  const filePaths = {
    photos: photos.map(file => {
      const imgPath = path.relative(process.cwd(), file.path).replace(/\\/g, '/');
      return `${host || ''}/${imgPath}`;
    }),
    documents: documents.map(file => {
      const docPath = path.relative(process.cwd(), file.path).replace(/\\/g, '/');
      return `${host || ''}/${docPath}`;
    }),
  };

  const queryRunner = petRepository.manager.connection.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const repo = queryRunner.manager.getRepository(Pet);
    const petEntity = repo.create({
      lk_pet_code: petData.lk_pet_code,
      name: petData.name,
      breed: petData.breed,
      specie: petData.specie,
      sex_txt: petData.sex_txt,
      special_needs: petData.special_needs,
      health: petData.health,
      is_available: petData.is_available,
      is_sterilized_flg: petData.is_sterilized_flg,
      thumbnails: allFiles.length ? thumbnailsBySize : null,
    });

    const savedPet = await repo.save(petEntity);

    // Save species details with the saved pet's ID and lk_pet_code
    await saveSpeciesDetails(queryRunner, savedPet, petData, filePaths);

    await queryRunner.commitTransaction();
    return savedPet;
  } catch (err) {
    await queryRunner.rollbackTransaction();
    if (allFiles.length) await cleanupFiles(allFiles);
    throw err;
  } finally {
    await queryRunner.release();
  }
}

async function saveSpeciesDetails(
  queryRunner: QueryRunner,
  pet: IPet,
  petData: Partial<IPet> & ISpeciesDetailsData,
  files: { photos: string[]; documents: string[] },
): Promise<void> {
  const map = {
    cat: { entity: CatDetails, key: 'catDetails' },
    dog: { entity: DogDetails, key: 'dogDetails' },
    horse: { entity: HorseDetails, key: 'horseDetails' },
    'farm-animal': { entity: FarmAnimalDetails, key: 'farmAnimalDetails' },
  } as const;

  const specie = petData.specie as keyof typeof map | undefined;
  if (!specie) return;

  const { entity, key } = map[specie];
  const detailData = petData[key];
  if (!detailData) return;

  const repo = queryRunner.manager.getRepository(entity as EntityTarget<ObjectLiteral>);

  // Create the details entity with the pet's ID and lk_pet_code
  const details = repo.create({
    ...detailData,
    lk_pet_code: pet.lk_pet_code,
    pet_id: pet.id,
    files,
  } as DeepPartial<ObjectLiteral>);

  await repo.save(details);
}
