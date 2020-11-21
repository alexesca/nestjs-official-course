import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Request } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Public } from 'src/common/decorators/is-public.decorator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto';
import { ParseIntPipe } from './../common/pipes/parse-int.pipe'

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeService: CoffeesService,
        @Inject(REQUEST) private readonly request: Request
    ) {
        console.log("CoffeesController  was instantiated!!!")
    }


    @Get()
    @Public()
    @HttpCode(HttpStatus.OK)
    async findAll(@Query() paginationQuery: PaginationQueryDto) {
        await new Promise(resolve => setTimeout(resolve, 5000))
        return this.coffeService.findAll(paginationQuery);
    }

    @Get(':id')
    getOne(@Param('id', ParseIntPipe) id: number) {
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
