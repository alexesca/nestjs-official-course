import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';

@Controller('coffees')
export class CoffeesController {

    constructor(
        private readonly coffeService: CoffeesService
    ) { }

    @Get()
    @HttpCode(HttpStatus.OK)
    findAll(@Query() paginationQuery) {
        return this.coffeService.findAll();
    }

    @Get(':id')
    getOne(@Param('id') id) {
        return this.coffeService.findOne(id);
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return this.coffeService.create(body);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body
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
