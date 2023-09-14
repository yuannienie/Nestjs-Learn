import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Module,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/decorators/public.decorator';

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get(IS_PUBLIC_KEY, context.getHandler());
    if (isPublic) return true; // directly return true for public decorated method
    // const request = context.switchToHttp().getRequest<Request>();
    // const API_KEY = request.header('Authorization');
    // return API_KEY === this.configService.get('API_KEY');
    return true;
  }
}
