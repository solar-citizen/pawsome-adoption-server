import { Repository } from 'typeorm';

import { buildPaginationMeta, type Pet, type PetWithDetails } from '#src/shared';

import { buildPaginatedPetsQuery } from './buildPaginatedPetsQuery';

/**
 * Retrieves paginated pets with optional search filtering and metadata
 *
 * Handles page-based pagination by converting page numbers to offsets and builds
 * pagination metadata including current page, total pages, and record ranges.
 * Supports full-text search across pet name, breed, and species fields.
 *
 * @param repository - TypeORM repository for Pet or PetWithDetails entity
 * @param alias - Table alias to use in the query builder
 * @param page - Page number starting from 1 (defaults to 1)
 * @param limit - Number of records per page (defaults to 10)
 * @param fullTextSearch - Search term to filter pets by name, breed, or species
 * @returns Promise resolving to object with data array and pagination metadata
 */
export async function getPaginatedPets<T extends Pet | PetWithDetails>(
  repository: Repository<T>,
  alias: string,
  page = 1,
  limit = 10,
  fullTextSearch: string | null = null,
) {
  const offset = (page - 1) * limit;
  const { pets, petsTotal } = await buildPaginatedPetsQuery(
    repository,
    alias,
    offset,
    limit,
    fullTextSearch,
  );

  return {
    data: pets,
    meta: buildPaginationMeta(page, limit, petsTotal, offset),
  };
}
