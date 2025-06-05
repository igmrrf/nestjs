import { IsNumber, IsString, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export default () => ({
  app: {
    port: process.env.PORT,
  },
  database: {
    animal: {
      url: process.env.ANIMAL_MONGO_DB_URL,
    },
    plants: {
      url: process.env.PLANT_MONGO_DB_URL,
    },
    nest: {
      url: process.env.NEST_MONGO_DB_URL,
    },
  },
});

class ConfigValidation {
  @IsNumber()
  PORT: number;

  @IsString()
  ANIMAL_MONGO_DB_URL: string;

  @IsString()
  NEST_MONGO_DB_URL: string;

  @IsString()
  PLANT_MONGO_DB_URL: string;
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
