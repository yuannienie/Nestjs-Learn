import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    const val = parseInt(value, 10);
    if (isNaN(val)) {
      // a friendly resposne error
      throw new BadRequestException(
        `Validation failed. "${val} is not an interger"`,
      );
    }

    return val;
  }
}
