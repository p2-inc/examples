export function isNullOrUndefined(value: any): boolean {
  return value === undefined || value === null;
}

export function isDefined(value: any): boolean {
  return !isNullOrUndefined(value);
}
