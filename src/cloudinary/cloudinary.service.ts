import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { v2 as Cloudinary } from 'cloudinary';
import * as fs from 'fs/promises';
import { ConfigService } from '@nestjs/config';
import { fsync, readFileSync } from 'fs';
import { UpdateCloudinaryDto } from './dto/update-cloudinary.dto';

@Injectable()
export class CloudinaryService {
  // private readonly cloudinary: any;
  private readonly PRESET: string;
  constructor(private readonly configService: ConfigService) {
    const CLOUD_NAME = this.configService.get('cloudinary.cloud_name');
    const API_KEY = this.configService.get('cloudinary.api_key');
    const API_SECRET = this.configService.get('cloudinary.api_secret');
    this.PRESET = this.configService.get('cloudinary.preset');
    Cloudinary.config({
      cloud_name: CLOUD_NAME,
      api_key: API_KEY,
      api_secret: API_SECRET,
    });
  }

  async create(file: Express.Multer.File) {
    const { size, path, originalname, mimetype } = file;

    const fileRead = readFileSync(path, 'base64');
    const image = `data:image/jpeg;base64,${fileRead}`;
    // unlink - delete file as soon as you've read it into memory
    await fs.unlink(path);
    // restricting size
    const FIVE_MB = 5242880;
    if (size > FIVE_MB) {
      throw new UnprocessableEntityException('file size exceeds limit of 1MB');
    }
    // restricting type
    const IMAGE_MIMETYPE = 'image/jpeg';
    if (mimetype !== IMAGE_MIMETYPE) {
      throw new UnprocessableEntityException('invalid image type submitted');
    }
    const uploadResponse = await Cloudinary.uploader.upload(image, {
      upload_preset: this.PRESET,
      public_id: originalname,
    });

    return uploadResponse;
  }

  transform(payload: UpdateCloudinaryDto) {
    const { public_id } = payload;

    const autoCropUrl = Cloudinary.url(public_id, {
      crop: 'auto',
      gravity: 'auto',
      width: 500,
      height: 500,
    });

    return autoCropUrl;
  }

  optimize(payload: UpdateCloudinaryDto) {
    const { public_id } = payload;

    const optimizeUrl = Cloudinary.url(public_id, {
      fetch_format: 'auto',
      quality: 'auto',
    });

    return {
      success: true,
      data: optimizeUrl,
      message: 'image uploaded success',
    };
  }
}
