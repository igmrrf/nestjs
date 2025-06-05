import { Module } from '@nestjs/common';
import { ApplesService } from './apples.service';
import { ApplesController } from './apples.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Apple, AppleSchema } from './entities/apple.schema';
import { databases } from 'src/common/constants/db.constants';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ schema: AppleSchema, name: Apple.name }],
      databases.plants,
    ),

    MongooseModule.forFeatureAsync(
      [
        {
          name: Apple.name,
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const schema = AppleSchema;
            schema.pre('save', () => {
              console.log({
                port: configService.get<number>('PORT'),
              });
            });
            return schema;
          },
          inject: [ConfigService],
        },
      ],
      databases.plants,
    ),
  ],
  controllers: [ApplesController],
  providers: [ApplesService],
})
export class ApplesModule {}
