import IComuna from './IComuna.interface';
export default interface IReclamo {
  readonly userId: string;
  readonly nReclamo: number;
  readonly comuna: IComuna;
  readonly id: string;
  titulo: string;
  descripcion: string;
  imagen: File[];
}
