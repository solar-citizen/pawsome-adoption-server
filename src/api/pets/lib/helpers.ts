import { omit } from 'lodash-es';
import type { DeepPartial, EntityTarget, ObjectLiteral, QueryRunner } from 'typeorm';

import {
  type ICatDetails,
  type IDogDetails,
  type IFarmAnimalDetails,
  type IHorseDetails,
  type IPet,
  type IPetWithDetails,
  SPECIES_MAPPING,
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

export function getSpeciesFiles(pet: IPetWithDetails | IPet | null): {
  photos: string[];
  documents: string[];
} {
  if (pet === null) {
    return { photos: [], documents: [] };
  }

  const detailsKeys = Object.values(SPECIES_MAPPING).map(config => config.key);
  const files = detailsKeys.map(key => pet[key]?.files).find(files => files !== undefined);

  return {
    photos: files?.photos ?? [],
    documents: files?.documents ?? [],
  };
}

export function stripFiles(main: IPetWithDetails | IPet): IPetWithDetails | IPet {
  for (const { key } of Object.values(SPECIES_MAPPING)) {
    if (key in main && main[key]) {
      return { ...main, [key]: omit(main[key], 'files') };
    }
  }
  return main;
}
