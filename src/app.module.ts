import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';

import { AppConfigModule } from './config/config.module';
import { AppConfigService } from './config/config.service';
import { OriginsModule } from './origins/origins.module';
import { SpeciesModule } from './species/species.module';
import { CharactersModule } from './characters/characters.module';
import { TestGrapModule } from './test-grap/test-grap.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LoggerInterceptor } from './interceptors/logger.interceptor';



@Module({
  imports: [

    AppConfigModule, 
    ScheduleModule.forRoot(),
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
          // logging: console.log,
        };
      },
      inject: [AppConfigService], 
    }), 
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      sortSchema: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    OriginsModule, SpeciesModule, CharactersModule, TestGrapModule,
  ],
  controllers: [],
  providers: [{
      provide: APP_INTERCEPTOR, // task - middleware
      useClass: LoggerInterceptor,
    },], 
})
export class AppModule {}