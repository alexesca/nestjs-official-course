import { Body, Controller, Get, Param, Post } from '@nestjs/common';

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
    create(@Body() body) {
        return body
    }
}
