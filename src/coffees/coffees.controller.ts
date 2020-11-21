import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request
    ) {
        console.log(request)
        console.log("CoffeesController  was instantiated!!!")
    }


    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.coffeService.findAll(paginationQuery);
    }

    @Get(':id')
    getOne(@Param('id') id: number) {
        console.log(typeof id)
        return this.coffeService.findOne('' + id);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() body: CreateCoffeeDto) {
        console.log(body instanceof CreateCoffeeDto)
        return this.coffeService.create(body);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body: UpdateCoffeeDto
    ) {
        return this.coffeService.update(id, body);
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return this.coffeService.remove(id);
    }


}
