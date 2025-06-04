import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name);
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const instanceOfHttpException = exception instanceof HttpException;
    let message = instanceOfHttpException
      ? exception.message
      : 'internal server error, please try again later.';

    if (
      typeof exception === 'object' &&
      'message' in exception &&
      typeof exception.message === 'string'
    ) {
      const exceptionMessage = exception.message;
      message = exceptionMessage;
      if (
        message === 'Bad Request Exception' &&
        typeof exceptionMessage !== 'string'
      ) {
        message = exceptionMessage[0];
      }
    }

    const responseBody = {
      success: false,
      status_code: httpStatus,
      message,
      data: null,
      timestamp: new Date().toISOString(),
      links: [],
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    this.logger.log(responseBody);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}

export const ExceptionList = ['BSONError', 'CastError'];
