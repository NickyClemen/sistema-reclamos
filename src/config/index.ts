import path from 'path';
import dotenv from 'dotenv';

import IConfig from '@interfaces/IConfig.interface';

const ENV_FILE = path.join(__dirname, '.env');
dotenv.config({ path: ENV_FILE });

export default class Config implements IConfig {
  public readonly PORT: number;
  public readonly HOST: string;

  constructor() {
    this.PORT = Number(process.env.PORT);
    this.HOST = String(process.env.HOST);
  }
}
