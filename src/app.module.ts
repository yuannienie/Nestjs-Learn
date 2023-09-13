import { Module, ValidationPipe } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';

@Module({
  imports: [
    CoffeesModule,
    // if TypeOrmModule set above the configModule with forRoot method, the program will failed
    // because of the missing parameters of process.env
    // while forRootAsync make it run again, without care about the moudle's import order
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          host: process.env.DATABASE_HOST,
          port: process.env.DATABASE_PORT,
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        };
      },
    }),
    ConfigModule.forRoot({
      load: [appConfig], // merged with .env config
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
    }),
    CoffeeRatingModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // { provide: APP_PIPE, useClass: ValidationPipe }
  ],
})
export class AppModule {}
