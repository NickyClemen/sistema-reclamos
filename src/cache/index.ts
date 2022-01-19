import NodeCache from 'node-cache';

import ReclamoModel from '@models/Reclamo.model';

import { PutParameters, UpdateValueKeys, ReclamoUpdateKeys } from '@types';
export default class MemoryStorage {
  private myCache;

  constructor() {
    this.myCache = new NodeCache();
  }

  setEntry(entry: ReclamoModel): void {
    try {
      this.myCache.set(entry.id, entry);
    } catch (err: unknown) {
      const { message } = err as Error;
      const messageError: string = JSON.stringify({ message });

      throw new Error(messageError);
    }
  }

  getEntries(): (ReclamoModel | string)[] {
    const entries: string[] = this.myCache.keys();

    if (entries.length !== 0) {
      const reclamos: ReclamoModel[] = entries.map((id: string) => {
        const reclamo: ReclamoModel = this.getEntryById(id);

        if (Object.keys(reclamo).length !== 0) {
          return reclamo as ReclamoModel;
        }
      });

      return reclamos;
    }

    return entries;
  }

  getEntryById(id: string): ReclamoModel {
    const entry: ReclamoModel | undefined = this.myCache.get<ReclamoModel | undefined>(id);

    if (typeof entry !== 'undefined') {
      return entry;
    }

    return {} as ReclamoModel;
  }

  putEntry({ id, updateValues }: PutParameters): ReclamoModel {
    const entry: ReclamoModel = this.getEntryById(id);

    if (Object.keys(entry).length !== 0) {
      if (typeof updateValues.imagen !== 'undefined') {
        entry.imagen.push(updateValues.imagen);
      } else if (entry.titulo !== updateValues.titulo) {
        entry.titulo = updateValues.titulo;
      } else if (entry.descripcion !== updateValues.descripcion) {
        entry.descripcion = updateValues.descripcion;
      }

      if (this.deleteEntryById(id)) {
        this.setEntry(entry);

        return entry;
      }
    }

    return {} as ReclamoModel;
  }

  deleteEntryById(id: string): boolean {
    const entry = this.myCache.del(id);

    return entry === 0 ? false : true;
  }
}
