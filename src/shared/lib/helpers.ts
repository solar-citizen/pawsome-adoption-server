/**
 * Type guard to check if a value is a string
 */
export function isString(value: unknown): value is string {
  return typeof value === 'string';
}

/**
 * Safely parses a query parameter to a positive integer
 */
export function parsePositiveInt(value: unknown, defaultValue: number): number {
  if (!isString(value)) return defaultValue;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) || parsed < 1 ? defaultValue : parsed;
}

/**
 * Safely extracts a string parameter, returning null if not provided
 */
export function extractStringParam(value: unknown): string | null {
  if (!isString(value) || value.trim() === '') return null;
  return value.trim();
}
