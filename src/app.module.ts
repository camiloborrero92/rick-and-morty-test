import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { OriginsModule } from './origins/origins.module';
import { SpeciesModule } from './species/species.module';
import { CharactersModule } from './characters/characters.module';
import { Character } from './characters/entities/character.model';
import { Species } from './species/entities/species.model';
import { Origin } from './origins/entities/origin.model';


@Module({
  imports: [

    AppConfigModule, 

    SequelizeModule.forRootAsync({
      
      useFactory: (appConfigService: AppConfigService) => {
        const dbConfig = appConfigService.databaseConfig;

        return {
          host: dbConfig.host,
          port: dbConfig.port,
          username: dbConfig.username,
          password: dbConfig.password,
          database: dbConfig.database,
          dialect: dbConfig.driver,
          autoLoadModels: true,
          sync: { 
            force: false, 
            alter: dbConfig.synchronize 
          },
          logging: console.log,
        };
      },
      inject: [AppConfigService], 
    }), OriginsModule, SpeciesModule, CharactersModule,
  ],
  controllers: [],
  providers: [], 
})
export class AppModule {}