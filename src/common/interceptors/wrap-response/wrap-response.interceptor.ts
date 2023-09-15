import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map, tap } from 'rxjs';

@Injectable()
export class WrapResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log('before from wrap response interceptor...');
    // tap func Used to perform side-effects for notifications from the source observable
    // map func applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.
    // wrap our response in data property
    return next
      .handle()
      .pipe(map((data) => ({ data }))) // data is response here
      .pipe(
        tap((data) => console.log('after from wrap response interceptor...')),
      );
  }
}
