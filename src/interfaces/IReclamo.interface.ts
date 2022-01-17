import IComuna from './IComuna.interface';

export default interface IReclamo {
  readonly id:string,
  titulo:string,
  descripcion:string,
  readonly comuna:IComuna
  imagen:File
}