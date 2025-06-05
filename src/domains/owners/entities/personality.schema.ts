import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Personality {
  @Prop({ min: 1, max: 100 })
  arrogance: number;

  @Prop({ min: 1, max: 100 })
  brilliance: number;

  @Prop({ min: 1, max: 100 })
  empathy: number;

  @Prop({ min: 1, max: 100 })
  honesty: number;

  @Prop({ min: 1, max: 100 })
  sympathy: number;
}

export const PersonalitySchema = SchemaFactory.createForClass(Personality);
