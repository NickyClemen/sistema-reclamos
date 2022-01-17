import IReclamo from '@interfaces/IReclamo.interface';
import IComuna from '@interfaces/IComuna.interface';

export default class ReclamoModel implements IReclamo {
  public readonly id:string;
  public titulo:string;
  public descripcion: string;
  public readonly comuna:IComuna;
  public imagen:File

  async getReclamoById(id:string):Promise<ReclamoModel> {
    return;
  }
}