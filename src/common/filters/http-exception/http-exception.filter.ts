import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException>
  implements ExceptionFilter
{
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const errorResponse = exception.getResponse();
    const error =
      typeof errorResponse === 'string'
        ? { message: errorResponse }
        : (errorResponse as object);
    const status = exception.getStatus();
    response.status(status).json({
      ...error,
      timeStamp: new Date().toUTCString(),
      customError: true,
    });
  }
}
