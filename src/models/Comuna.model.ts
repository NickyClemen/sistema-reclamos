import IBarrio from '@interfaces/IBarrio.interface';
import IComuna from '@interfaces/IComuna.interface';

export default class Comuna implements IComuna {
  public readonly nombre: string;
  public readonly barrios: IBarrio[];

  constructor(nombre: string, barrios: IBarrio[]) {
    this.nombre = nombre;
    this.barrios = barrios;
  }
}
