import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';

@Module({
    controllers: [
        CoffeesController
    ],
    exports: [

    ],
    imports: [
        TypeOrmModule.forFeature([
            Coffee,
            Flavor,
            Event
        ])
    ],
    providers: [
        CoffeesService
    ]
})
export class CoffeesModule { }
