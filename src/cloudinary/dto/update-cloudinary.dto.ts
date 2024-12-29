import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateCloudinaryDto {
  @IsNotEmpty()
  @IsString()
  public_id: string;
}
