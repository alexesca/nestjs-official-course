import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Res } from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {

    @Get('flavors')
    @HttpCode(HttpStatus.OK)
    findAll(@Res() response) {
        return response.status(200).send("This action returns all the coffee flavors.")
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

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() body
    ) {
        return `This action updates #${id} cofee`
    }

    @Delete(':id')
    delete(
        @Param('id') id: string,
    ) {
        return `This action deletes #${id} cofee`
    }


}
