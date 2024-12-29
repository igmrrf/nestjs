import { IsNotEmpty, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export default () => ({
  cloudinary: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    preset: process.env.CLOUDINARY_PRESET,
  },
});

class ConfigValidation {
  @IsNotEmpty()
  @IsString()
  CLOUDINARY_CLOUD_NAME: string;

  @IsNotEmpty()
  @IsString()
  CLOUDINARY_API_KEY: string;

  @IsNotEmpty()
  @IsString()
  CLOUDINARY_API_SECRET: string;

  @IsNotEmpty()
  @IsString()
  CLOUDINARY_PRESET: string;
}

export function validateEnv(config: Record<string, any>): Record<string, any> {
  const validatedConfig = plainToInstance(ConfigValidation, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });
  if (errors.length > 0) {
    const detailedErrors = errors
      .map((err) => Object.values(err.constraints || {}).join(', '))
      .join('; ');
    throw new Error(`Environment variable validation error: ${detailedErrors}`);
  }

  return config;
}
