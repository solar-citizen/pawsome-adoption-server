import 'dotenv/config';

import path from 'path';
import type { DeepPartial, EntityTarget, ObjectLiteral, QueryRunner, Repository } from 'typeorm';

import {
  cleanupFiles,
  type IPet,
  type ISpeciesDetailsData,
  MulterFilesObject,
  multerUtils,
  Pet,
  processImage,
  SPECIES_MAPPING,
} from '#src/shared';

const host = process.env.HOST;

type ProcessedFileData = {
  thumbnails: {
    '800x600': string[];
    '640x480': string[];
    '400x300': string[];
  };
  filePaths: {
    photos: string[];
    documents: string[];
  };
  allFiles: Express.Multer.File[];
};

async function processFilesForPet(
  files: Express.Multer.File[] | MulterFilesObject | null,
): Promise<ProcessedFileData> {
  const { photos, documents, allFiles } = multerUtils.processFiles(files);

  const thumbnails = {
    '800x600': [] as string[],
    '640x480': [] as string[],
    '400x300': [] as string[],
  };

  for (const file of photos) {
    const sizes = await processImage(file.path);
    for (const key of Object.keys(sizes) as (keyof typeof sizes)[]) {
      const thumbnailPath = path.relative(process.cwd(), sizes[key]).replace(/\\/g, '/');
      thumbnails[key].push(`${host || ''}/${thumbnailPath}`);
    }
  }

  const filePaths = {
    photos: photos.map(file => {
      const originalPath = file.path;
      const baseFilename = path
        .basename(originalPath)
        .replace(/\.(jpg|jpeg|png|bmp|webp|avif)$/i, '');
      const webpPath = path.join(path.dirname(originalPath), `${baseFilename}.webp`);
      const imgPath = path.relative(process.cwd(), webpPath).replace(/\\/g, '/');
      return `${host || ''}/${imgPath}`;
    }),
    documents: documents.map(file => {
      const docPath = path.relative(process.cwd(), file.path).replace(/\\/g, '/');
      return `${host || ''}/${docPath}`;
    }),
  };

  return { thumbnails, filePaths, allFiles };
}

export async function processUploadedFilesWithRepos(
  petRepository: Repository<Pet>,
  petData: Partial<IPet> & ISpeciesDetailsData,
  files: Express.Multer.File[] | MulterFilesObject | null,
): Promise<IPet> {
  const { thumbnails, filePaths, allFiles } = await processFilesForPet(files);

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
      thumbnails: allFiles.length ? thumbnails : null,
    });

    const savedPet = await repo.save(petEntity);
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
  filePaths: { photos: string[]; documents: string[] },
): Promise<void> {
  const specie = petData.specie as keyof typeof SPECIES_MAPPING | undefined;
  if (!specie) return;

  const { entity, key } = SPECIES_MAPPING[specie];
  const detailData = petData[key];
  if (!detailData) return;

  const repo = queryRunner.manager.getRepository(entity as EntityTarget<ObjectLiteral>);
  const details = repo.create({
    ...detailData,
    lk_pet_code: pet.lk_pet_code,
    pet_id: pet.id,
    files: filePaths,
  } as DeepPartial<ObjectLiteral>);

  await repo.save(details);
}
