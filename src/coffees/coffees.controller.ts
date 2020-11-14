import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeService: CoffeesService,
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() paginationQuery) {
        return this.coffeService.findAll();
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
