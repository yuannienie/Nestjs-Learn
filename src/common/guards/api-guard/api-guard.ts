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

@Injectable()
export class ApiGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  static create(): ApiGuard {
    const configService = new ConfigService();
    return new ApiGuard(configService);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const API_KEY = request.header('Authorization');
    return API_KEY === this.configService.get('API_KEY');
  }
}
