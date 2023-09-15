import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  // middleware should configured for path
  use(req: any, res: any, next: () => void) {
    console.time('request-response-time');
    res.on('finish', () => console.timeEnd('request-response-time'));
    next();
  }
}
