import ReclamoModel from '@models/Reclamo.model';

import NodeCache from 'node-cache';

export default class MemoryStorage {
  private myCache;

  constructor() {
    this.myCache = new NodeCache();
  }

  setEntry(entry:ReclamoModel):void {
    try {
      this.myCache.set(entry.id, entry);
    } catch(err:unknown) {
      const { message } = err as Error;
      const messageError:string = JSON.stringify({ message });

      throw new Error(messageError);
    }
  }

  getEntryById(id:string):ReclamoModel {
    const entry = this.myCache.get(id);

    if(typeof entry === undefined) {

    }

    return entry;
  }

  deleteEntryById(id:string):boolean {
    const entry = this.myCache.delete(id);

    return entry === 0 ? false : true;
  }
}