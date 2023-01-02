import { CoffeeService } from './../coffees/coffee.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CoffeeRatingService {
  constructor(private readonly coffeeService: CoffeeService) {}
}
