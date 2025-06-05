import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './entities/owner.schema';
import { databases } from 'src/common/constants/db.constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [{ name: Owner.name, schema: OwnerSchema }],
      databases.animals,
    ),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
