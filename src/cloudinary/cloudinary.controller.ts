import {
  Controller,
  Post,
  Body,
  Patch,
  UseInterceptors,
  UploadedFile,
  Put,
} from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('cloudinary')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @UploadedFile()
    file: Express.Multer.File, // you can set up validation here using ParseFilePipe(Builder)
  ) {
    return this.cloudinaryService.create(file);
  }

  @Put()
  optimze(@Body() optimizeDto: { public_id: string }) {
    return this.cloudinaryService.optimize(optimizeDto);
  }

  @Patch(':id')
  transform(@Body() transformDto: { public_id: string }) {
    return this.cloudinaryService.transform(transformDto);
  }
}
