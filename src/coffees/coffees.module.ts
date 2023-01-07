import { COFFEE_BRANDS } from './coffee.constants';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Inject, Module, Injectable } from '@nestjs/common';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],
  controllers: [CoffeeController],
  providers: [
    CoffeeService,
    {
      provide: COFFEE_BRANDS,
      useFactory: async (connection: Connection) => {
        // const coffeeBrands = await connection.query('SELECT * FROM ...');
        const coffeeBrands = await Promise.resolve([
          'buddy brew',
          'nescafe',
          'coco',
        ]);
        // console.log('!! async task !!');
        return coffeeBrands;
      },
      inject: [Connection],
    },
  ],
  exports: [CoffeeService],
})
export class CoffeesModule {}
