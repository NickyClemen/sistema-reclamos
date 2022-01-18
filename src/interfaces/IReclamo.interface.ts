import IComuna from './IComuna.interface';
export default interface IReclamo {
  readonly userId: string;
  readonly id: string;
  readonly nReclamo: number;
  titulo: string;
  descripcion: string;
  readonly comuna: IComuna;
  imagen?: File;
}
