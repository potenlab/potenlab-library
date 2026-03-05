// src/features/user-management/utils/format.ts

/**
 * Formats a number with comma separators.
 * @example formatNumber(100000) -> "100,000"
 * @example formatNumber(0) -> "0"
 */
export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}
