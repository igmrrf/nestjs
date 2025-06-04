import {
  IsArray,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import mongoose from 'mongoose';

export class CreateCatDto {
  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsString()
  breed: string;

  @IsMongoId()
  owner: mongoose.Types.ObjectId;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsArray()
  @IsMongoId({ each: true })
  fans?: mongoose.Types.ObjectId[]; // mongoose.Types.ObjectId if it's not always populated
}
