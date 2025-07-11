import type { Repository } from 'typeorm';

import type { Pet, PetWithDetails } from '#src/shared';

/**
 * Builds a paginated TypeORM query for pets with optional full-text search
 *
 * Searches across pet name, breed, and species fields using case-insensitive ILIKE matching.
 * Results are ordered by pet code and paginated using offset/limit.
 *
 * @param repository - TypeORM repository for Pet or PetWithDetails entity
 * @param alias - Table alias to use in the query builder
 * @param offset - Number of records to skip for pagination
 * @param limit - Maximum number of records to return
 * @param fullTextSearch - Optional search term to filter pets by name, breed, or species
 * @returns Promise resolving to object containing pets array and total count
 */
export async function buildPaginatedPetsQuery<T extends Pet | PetWithDetails>(
  repository: Repository<T>,
  alias: string,
  offset: number,
  limit: number,
  fullTextSearch: string | null,
) {
  const qb = repository.createQueryBuilder(alias);

  if (fullTextSearch) {
    const query = `%${fullTextSearch}%`;
    qb.where(`${alias}.name ILIKE :query`, { query })
      .orWhere(`${alias}.breed ILIKE :query`, { query })
      .orWhere(`${alias}.specie ILIKE :query`, { query });
  }

  qb.skip(offset)
    .take(limit)
    .orderBy(`${alias}.created_at`, 'DESC')
    .addOrderBy(`${alias}.lk_pet_code`, 'ASC');

  const [pets, petsTotal] = await qb.getManyAndCount();

  return { pets, petsTotal };
}
