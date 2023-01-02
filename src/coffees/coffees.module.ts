import { COFFEE_BRANDS } from './coffee.constants';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Module } from '@nestjs/common';
import { Event } from 'src/events/entities/event.entity';

class MockCoffeeService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeeController],
  // providers: [{ provide: CoffeeService, useValue: new MockCoffeeService() }],
  providers: [
    CoffeeService,
    { provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe'] },
  ],
  exports: [CoffeeService],
})
export class CoffeesModule {}
