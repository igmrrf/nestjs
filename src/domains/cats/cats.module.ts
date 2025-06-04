import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/cat.schema';

@Module({
  imports: [MongooseModule.forFeature([{ schema: CatSchema, name: Cat.name }])],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
