import { PaginationQueryDto } from './../common/dto/pagination-query.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  NotFoundException,
  Param,
  Patch,
  Post,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CoffeeService } from './coffee.service';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Public } from 'src/common/decorators/public.decorator';
import { ParseIntPipe } from 'src/common/pipes/parse-int/parse-int.pipe';
import { Protocol } from 'src/common/decorators/protocol.decorator';

@Controller('coffees')
export class CoffeeController {
  constructor(
    private readonly coffeeService: CoffeeService,
    // when setting services to request scoped, the controller will be also "bubbled" into request scoped
    // by this way, we can get request in controller constructor, but use with caution as performance will be affected
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log(
      'CoffeeController created, the request ip is: ',
      this.request.ip,
    );
  }

  @UsePipes(ValidationPipe)
  @Public()
  @Get()
  findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log('The protocol is:', protocol);
    return this.coffeeService.findAll(paginationQuery);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    return this.coffeeService.findOne(id);
  }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    await this.coffeeService.create(createCoffeeDto);
    return createCoffeeDto;
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto,
  ) {
    return this.coffeeService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.coffeeService.remove(id);
  }
}
