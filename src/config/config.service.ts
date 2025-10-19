import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Dialect } from 'sequelize';
import { DatabaseConfig, RedisConfig } from './config.interface';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get port(): number {
    return this.configService.get<number>('PORT')!;
  }


  get databaseConfig(): DatabaseConfig {
    return {
      host: this.configService.get<string>('DB_HOST')!,
      port: this.configService.get<number>('DB_PORT')!,
      username: this.configService.get<string>('DB_USER')!,
      password: this.configService.get<string>('DB_PASSWORD')!,
      database: this.configService.get<string>('DB_NAME')!,
      synchronize: this.configService.get<boolean>('DB_SYNCHRONIZE')!,
      driver: this.configService.get<Dialect>('DB_DRIVER')!,
    };
  }

  get redisConfig(): RedisConfig {
    return {
      host: this.configService.get<string>('REDIS_HOST')!,
      port: this.configService.get<number>('REDIS_PORT')!,
    };
  }
}