import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Module } from '@nestjs/common';

@Module({ controllers: [CoffeeController], providers: [CoffeeService] })
export class CoffeesModule {}
