import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EventOptionType } from '../events.type';

@Schema({ timestamps: true })
export class LoginEvent {
  kind: EventOptionType;
  time: Date;

  @Prop({
    type: String,
    required: true,
  })
  url: string;

  @Prop({
    type: String,
  })
  src: string;
}

export const LoginEventSchema = SchemaFactory.createForClass(LoginEvent);
