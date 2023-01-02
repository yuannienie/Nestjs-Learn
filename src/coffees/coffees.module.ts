import { COFFEE_BRANDS } from './coffee.constants';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Inject, Module, Injectable } from '@nestjs/common';
import { Event } from 'src/events/entities/event.entity';

// class MockCoffeeService {}
// class ConfigService {}
// class DevelopmentService {}
// class ProductionService {}
@Injectable()
class CoffeeBrandsFactory {
  create() {
    return ['buddy brew', 'nescafe', 'coco'];
  }
}
@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    // [{ provide: CoffeeService, useValue: new MockCoffeeService() }], // useValue
    // {
    //   provide: ConfigService,
    //   useClass:
    //     process.env.NODE_ENV === 'development'
    //       ? DevelopmentService
    //       : ProductionService,
    // },
    CoffeeBrandsFactory,
    {
      provide: COFFEE_BRANDS,
      useFactory: (brandsFactory: CoffeeBrandsFactory) =>
        brandsFactory.create(),
      inject: [CoffeeBrandsFactory],
    },
  ],
  exports: [CoffeeService],
})
export class CoffeesModule {}
