import type { Request } from 'express';

import { extractStringParam, parsePositiveInt } from '#src/shared';

type PaginationParams = { page: number; limit: number; fullTextSearch: string | null };

/**
 * Parses pagination and optional full‑text search parameters from
 * an Express request's query string.
 *
 * @param {Request} req - Incoming Express request.
 * @returns {PaginationParams}
 *   An object containing:
 *   - `page`: the current page number (defaults to 1 if missing or invalid).
 *   - `limit`: items per page (defaults to 10 if missing or invalid).
 *   - `fullTextSearch`: the raw full‐text search term, or `null` if not provided.
 */
export function extractPaginationParams(req: Request): PaginationParams {
  const page = parsePositiveInt(req.query.page, 1);
  const limit = parsePositiveInt(req.query.limit, 10);
  const fullTextSearch = extractStringParam(req.query.full_text_search);

  return { page, limit, fullTextSearch };
}
