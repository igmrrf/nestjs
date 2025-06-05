import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { EventSchema } from './entities/event.schema';
import { LoginEvent, LoginEventSchema } from './entities/event.login.schema';
import { SignUpEvent, SignUpEventSchema } from './entities/event.signup.schema';
import { databases } from 'src/common/constants/db.constants';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Event.name,
          schema: EventSchema,
          discriminators: [
            { name: LoginEvent.name, schema: LoginEventSchema },
            { name: SignUpEvent.name, schema: SignUpEventSchema },
          ],
        },
      ],
      databases.animals,
    ),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
