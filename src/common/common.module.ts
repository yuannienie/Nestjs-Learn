import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ApiGuard } from './guards/api-guard/api-guard';
import { LoggingMiddleware } from './middlewares/logging/logging.middleware';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: APP_GUARD, useClass: ApiGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggingMiddleware)
      .exclude({ path: 'coffees', method: RequestMethod.POST })
      .forRoutes({ path: 'coffees/*', method: RequestMethod.GET });
  }
}
