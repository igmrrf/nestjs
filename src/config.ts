import { IsNumber, validateSync } from 'class-validator';
import { plainToInstance } from 'class-transformer';

export default () => ({
  app: {
    port: process.env.PORT,
  },
});

class ConfigValidation {
  @IsNumber()
  PORT: number;
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
