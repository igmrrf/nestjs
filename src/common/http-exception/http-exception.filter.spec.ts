import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilterFilter', () => {
  it('should be defined', () => {
    expect(new AllExceptionFilter(new HttpAdapterHost())).toBeDefined();
  });
});
