import { Injectable } from '@nestjs/common';
import config from '.';

@Injectable()
export class ConfigService {
  private _IS_PROD = process.env.NODE_ENV === 'production';
  private configs = config;

  public get PORT(): string | number {
    return this.configs.PORT;
  }

  public get RABBITMQ_URL(): string {
    return this.configs.RABBITMQ_URL;
  }

  public get EMAIL_SERVICE(): string {
    return this.configs.EMAIL_SERVICE;
  }

  public get EMAIL_QUEUE(): string {
    return this.configs.EMAIL_QUEUE;
  }

  public get IS_PROD(): boolean {
    return this.configs.IS_PROD;
  }

  public get DB_URI(): string {
    return this.configs.DB_URI;
  }
}
