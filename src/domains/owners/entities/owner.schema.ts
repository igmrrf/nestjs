import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Owner {
  @Prop({ required: true, type: String })
  name: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
