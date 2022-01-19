import IBarrio from './IBarrio.interface';

export default interface IComuna {
  readonly nombre: string;
  readonly barrios: IBarrio[];
}
