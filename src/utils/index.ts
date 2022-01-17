import { ReclamoParameters } from '@types';

function isObject(obj):boolean {
  return typeof obj === 'object';
}

function isArray(obj) {
  return Array.isArray(obj);
}

export function objectIsEmpty(obj:object):boolean {
  return isObject(obj) && !isArray(obj) && Object.keys(obj).length !== 0;
}
