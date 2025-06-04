import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Owner } from 'src/domains/owners/entities/owner.schema';
import { CatBreeds } from '../cat.types';
import { catBreeds } from '../cat.constants';

@Schema()
export class Cat {
  @Prop({ required: true, unique: true })
  name: string;

  @Prop()
  age: number;

  @Prop({ required: true, enum: catBreeds })
  breed: CatBreeds;

  @Prop({ type: [String] })
  tags: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
  owner: Owner;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' }] })
  fans: mongoose.Types.ObjectId[]; // mongoose.Types.ObjectId if it's not always populated
}

export const CatSchema = SchemaFactory.createForClass(Cat);
