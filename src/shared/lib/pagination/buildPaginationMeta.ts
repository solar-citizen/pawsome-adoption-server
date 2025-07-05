/**
 * Builds pagination metadata for API responses
 *
 * Calculates pagination information including current page position, record ranges,
 * and total pages. Handles edge cases like empty result sets and ensures minimum
 * last page value of 1.
 *
 * @param page - Current page number (1-based)
 * @param limit - Number of records per page
 * @param total - Total number of records available
 * @param offset - Number of records skipped for current page
 * @returns Object containing pagination metadata with current page, ranges, and totals
 */
export function buildPaginationMeta(page: number, limit: number, total: number, offset: number) {
  const from = total > 0 ? offset + 1 : 0;
  const to = total > 0 ? Math.min(offset + limit, total) : 0;
  const lastPage = Math.max(Math.ceil(total / limit), 1);

  return {
    currentPage: page,
    perPage: limit,
    lastPage,
    from,
    to,
    total,
  };
}
