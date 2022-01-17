import uuid from 'uuid';

import IReclamo from '@interfaces/IReclamo.interface';
import IComuna from '@interfaces/IComuna.interface';

import { ReclamoParameters } from '@types';

export default class ReclamoModel implements IReclamo {
  public readonly id:string;
  public readonly userId: string;
  readonly nReclamo:number;
  public readonly :number;
  public titulo:string;
  public descripcion: string;
  public readonly comuna:IComuna;
  public imagen?:File

  constructor({
    userId,
    titulo,
    descripcion,
    comuna,
    imagen
  }:ReclamoParameters) {
    this.id = uuid.v4();
    this.userId = userId;
    this.titulo = titulo;
    this.nReclamo = 1;
    this.descripcion = descripcion;
    this.comuna = comuna;
    this.imagen = imagen;
  }

  async getAllReclamos():Promise<ReclamoModel[]> {
    return;
  }

  async getReclamoById(id:string):Promise<ReclamoModel> {
    return;
  }
}