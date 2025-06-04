import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import config, { validateEnv } from './config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { AllExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { HttpResponseInterceptor } from './common/interceptors/http-response/http-response.interceptor';
import { CatsModule } from './domains/cats/cats.module';
import { MongooseModule } from '@nestjs/mongoose';
import { OwnersModule } from './domains/owners/owners.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
      load: [config],
      validate: validateEnv,
    }),
    MongooseModule.forRoot('mongodb://localhost:27017/nest', {
      autoIndex: false,
    }),
    CatsModule,
    OwnersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: HttpResponseInterceptor },
    { provide: APP_FILTER, useClass: AllExceptionFilter },
  ],
})
export class AppModule {}
