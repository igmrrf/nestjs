import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventOptions } from '../events.constant';

@Schema({ timestamps: true, discriminatorKey: 'kind' })
export class Event {
  @Prop({
    type: String,
    required: true,
    enum: EventOptions,
  })
  kind: string;

  @Prop({ type: Date, required: true })
  time: Date;
}

export const EventSchema = SchemaFactory.createForClass(Event);
