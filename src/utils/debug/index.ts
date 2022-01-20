import Debug from 'debug';

export default function debuggingLog(moduleName: string, str: string) {
  const debug = Debug(`sistema-reclamos:${moduleName}`);
  return debug(str);
}
