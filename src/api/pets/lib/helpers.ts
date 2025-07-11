import type { DeepPartial, EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';

import type {
  ICatDetails,
  IDogDetails,
  IFarmAnimalDetails,
  IHorseDetails,
  IPet,
} from '#src/shared';

type SpeciesDetailsData =
  | ICatDetails
  | IDogDetails
  | IFarmAnimalDetails
  | IHorseDetails
  | undefined;

export async function createSpeciesDetails<T extends ObjectLiteral>(
  queryRunner: QueryRunner,
  entityClass: EntityTarget<T>,
  detailData: SpeciesDetailsData,
  pet: IPet,
  files: { photos: string[]; documents: string[] },
): Promise<void> {
  const repo = queryRunner.manager.getRepository(entityClass);
  const details = repo.create({
    ...detailData,
    pet,
    files,
  } as unknown as DeepPartial<T>);
  await repo.save(details);
}
