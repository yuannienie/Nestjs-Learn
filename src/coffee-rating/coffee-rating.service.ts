import { CoffeeService } from './../coffees/coffee.service';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
  constructor(
    private readonly coffeeService: CoffeeService,
    @Inject('CONNECTION') private connection,
  ) {
    console.log('connection config: ', this.connection);
  }
}
