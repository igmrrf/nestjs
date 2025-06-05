import { Prop, Schema, SchemaFactory, Virtual, raw } from '@nestjs/mongoose';
import { Personality, PersonalitySchema } from './personality.schema';
import { HydratedDocument, Types } from 'mongoose';

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

  @Prop({ PersonalitySchema })
  personality: Personality;

  @Virtual({
    get: function (this: Owner) {
      return `${this.name}-${this.email.substring(0, 3)}`;
    },
  })
  username: string;
}

export const OwnerSchema = SchemaFactory.createForClass(Owner);

export type OwnerDocumentOverride = {
  name: string;
  email: string;
  address: Record<string, string | number | boolean>;
  personality: Types.Subdocument<Types.ObjectId> & Personality;
};

export type OwnerDocument = HydratedDocument<Owner, OwnerDocumentOverride>;
