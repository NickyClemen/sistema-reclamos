import uuid from 'uuid';

import IReclamo from '@interfaces/IReclamo.interface';

import Comuna from '@models/Comuna.model';

import { ReclamoParameters } from '@types';

import * as comunasCaba from '@static/comunas.json';
export default class ReclamoModel implements IReclamo {
  public readonly id: string;
  public readonly userId: string;
  public readonly nReclamo: number;
  public readonly comuna: Comuna;
  public titulo: string;
  public descripcion: string;
  public imagen: File[];

  constructor({ userId, titulo, descripcion, nombreComuna, imagen }: ReclamoParameters) {
    this.id = uuid.v4();
    this.userId = userId;
    this.titulo = titulo;
    this.nReclamo = this.generateNReclamo();
    this.descripcion = descripcion;
    this.comuna = this.setComuna(nombreComuna);
    this.imagen = [];

    if (typeof imagen !== 'undefined') {
      this.imagen.push(imagen);
    }
  }

  setComuna(nombreComuna: string): Comuna {
    const { comunas }: { comunas: { [key: string]: Comuna } } = JSON.parse(JSON.stringify(comunasCaba));
    let nuevaComuna: Comuna = {} as Comuna;

    Object.keys(comunas).forEach((comuna: string): void => {
      const { nombre, barrios }: Comuna = comunas[comuna];

      if (nombre === nombreComuna) {
        nuevaComuna = new Comuna(nombre, barrios);
      }
    });

    return nuevaComuna;
  }

  generateNReclamo(): number {
    return Math.floor(Math.random() * 1000);
  }
}
