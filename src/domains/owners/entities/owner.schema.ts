import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema()
export class Owner {
  @Prop({ required: true, type: String })
  name: string;

  @Prop({ required: true, type: String })
  email: string;

  @Prop(
    raw({
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    }),
  )
  address: Record<string, string | number | boolean>;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);
