export function ensureSingleItemOrNull<T>(
  arr: T[] | undefined | null,
): T | undefined | null {
  if (!arr) {
    return null;
  }
  if (arr.length !== 1) {
    console.error(
      `Expected exactly one item, but got ${arr.length} items. Returning the first element instead`,
    );
    return arr[0];
  }

  return arr[0];
}

export function ensureNoUndefinedOrNull<T>(data: T | undefined | null): T {
  if (!data) {
    throw new Error(`No data found`);
  }
  return data;
}
