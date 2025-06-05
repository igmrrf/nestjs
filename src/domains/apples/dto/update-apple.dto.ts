import { PartialType } from '@nestjs/mapped-types';
import { CreateAppleDto } from './create-apple.dto';

export class UpdateAppleDto extends PartialType(CreateAppleDto) {}
