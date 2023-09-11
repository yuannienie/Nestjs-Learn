import { COFFEE_BRANDS } from './coffee.constants';
import { Flavor } from './entities/flavor.entity';
import { Coffee } from './entities/coffee.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from './coffee.controller';
import { CoffeeService } from './coffee.service';
import { Inject, Module, Injectable, Scope } from '@nestjs/common';
import { Event } from 'src/events/entities/event.entity';
import { Connection } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
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
      // scope: Scope.TRANSIENT,
    },
  ],
  exports: [CoffeeService],
})
export class CoffeesModule { }
