import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('flavors')
    findAll() {
        return "This action returns all the coffee flavors."
    }

    @Get(':id')
    getOne(@Param('id') id) {
        return `THis action returns #${id} coffe`
    }

    @Post()
    @HttpCode(HttpStatus.GONE)
    create(@Body() body) {
        return body
    }
}
