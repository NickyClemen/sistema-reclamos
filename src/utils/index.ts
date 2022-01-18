function isObject(obj: object): boolean {
  return typeof obj === 'object';
}

function isArray(obj: object): boolean {
  return Array.isArray(obj);
}

export function objectIsEmpty(obj: object): boolean {
  return isObject(obj) && !isArray(obj) && Object.keys(obj).length !== 0;
}
