import { DynamicModule, Module } from '@nestjs/common';
import { Connection, ConnectionOptions, createConnection } from 'typeorm';

@Module({
  // providers: [
  //   // hard code configuration
  //   {
  //     provide: 'CONNECTION',
  //     useValue: createConnection({
  //       type: 'postgres',
  //       host: 'localhost',
  //       port: 5432,
  //     }),
  //   },
  // ],
})
export class DatabaseModule {
  static register(options: ConnectionOptions): DynamicModule {
    // dynamic module, we can customize options to create connection
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'CONNECTION',
          // useValue: createConnection(options),
          useValue: options,
        },
      ],
      // export CONNECTION for other service utilize
      exports: ['CONNECTION'],
    };
  }
}
