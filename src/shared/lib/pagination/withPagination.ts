import type { Request } from 'express';

import { extractPaginationParams } from '#src/shared';

/**
 * Helper function that extracts pagination parameters from request and calls the service function
 * @param req - Express request object containing pagination query parameters
 * @param serviceFn - Service function that accepts page, limit, and fullTextSearch parameters
 * @returns Promise with the result from the service function
 */
export async function withPagination<T>(
  req: Request,
  serviceFn: (page: number, limit: number, fullTextSearch: string | null) => Promise<T>,
): Promise<T> {
  const { page, limit, fullTextSearch } = extractPaginationParams(req);
  return await serviceFn(page, limit, fullTextSearch);
}
