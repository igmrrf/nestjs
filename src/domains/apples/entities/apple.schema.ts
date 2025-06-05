import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Apple {
  @Prop({ type: String, required: true })
  breed: string;

  @Prop({ type: String, required: true })
  origin: string;
}

export const AppleSchema = SchemaFactory.createForClass(Apple);
