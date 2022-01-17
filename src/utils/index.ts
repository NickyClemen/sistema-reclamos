import IReclamo from '@interfaces/IReclamo.interface';

function isObject(obj):boolean {
  return typeof obj === 'object';
}

function isArray(obj) {
  return Array.isArray(obj);
}

export function bodyIsEmpty(body:IReclamo):boolean {
  return isObject(body) && !isArray(body) && Object.keys(body).length !== 0;
}
