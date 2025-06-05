import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config, { validateEnv } from './config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { HttpResponseInterceptor } from './common/interceptors/http-response/http-response.interceptor';
import { CatsModule } from './domains/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersModule } from './domains/owners/owners.module';
import { databases } from './common/constants/db.constants';
import { ApplesModule } from './domains/apples/apples.module';
import { Connection } from 'mongoose';
import { EventsModule } from './domains/events/events.module';
import { MongooseConfigService } from './common/services/mongoose-config/mongoose-config.service';
const plants_uri = 'mongodb://localhost:27017/plants';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [config],
      validate: validateEnv,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const logger = new Logger(databases.animals);
        const uri = configService.get<string>('ANIMAL_MONGO_DB_URL');
        return {
          uri,
          onConnectionCreate: (connection: Connection) => {
            const name = databases.animals;
            connection.on('connected', () => logger.log('%s connected', name));
            connection.on('open', () => logger.log('%s open', name));
            connection.on('disconnected', () =>
              logger.log('%s disconnected', name),
            );
            connection.on('reconnected', () =>
              logger.log('%s reconnected', name),
            );
            connection.on('disconnecting', () =>
              logger.log('%s disconnecting', name),
            );
            return connection;
          },
        };
      },

      inject: [ConfigService],
      connectionName: databases.animals,
    }),

    MongooseModule.forRootAsync({
      useClass: MongooseConfigService,
      inject: [ConfigService],
    }),

    MongooseModule.forRoot(plants_uri, {
      onConnectionCreate: (connection: Connection) => {
        const name = databases.plants;
        const logger = new Logger(databases.plants);
        connection.on('connected', () => logger.log('%s connected', name));
        connection.on('open', () => logger.log('%s open', name));
        connection.on('disconnected', () =>
          logger.log('%s disconnected', name),
        );
        connection.on('reconnected', () => logger.log('%s reconnected', name));
        connection.on('disconnecting', () =>
          logger.log('%s disconnecting', name),
        );
        return connection;
      },
      connectionName: databases.plants,
      autoIndex: false,
    }),
    CatsModule,
    OwnersModule,
    ApplesModule,
    EventsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
    MongooseConfigService,
  ],
})
export class AppModule {}
