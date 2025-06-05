import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventOptionType } from '../events.type';

@Schema({ timestamps: true })
export class SignUpEvent {
  kind: EventOptionType;
  time: Date;

  @Prop({
    type: Boolean,
  })
  sales: boolean;

  @Prop({
    type: String,
  })
  origin: string;
}

export const SignUpEventSchema = SchemaFactory.createForClass(SignUpEvent);
