import { Module } from '@nestjs/common';
import { OwnersService } from './owners.service';
import { OwnersController } from './owners.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Owner, OwnerSchema } from './entities/owner.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Owner.name, schema: OwnerSchema }]),
  ],
  controllers: [OwnersController],
  providers: [OwnersService],
})
export class OwnersModule {}
