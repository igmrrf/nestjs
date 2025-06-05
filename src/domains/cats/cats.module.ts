import { Module } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Cat, CatSchema } from './entities/cat.schema';
import { databases } from 'src/common/constants/db.constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ schema: CatSchema, name: Cat.name }],
      databases.animals,
    ),
  ],
  controllers: [CatsController],
  providers: [CatsService],
})
export class CatsModule {}
