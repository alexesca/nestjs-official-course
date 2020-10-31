import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entites/coffe.entity';

@Module({
    controllers: [
        CoffeesController
    ],
    exports: [

    ],
    imports: [
        TypeOrmModule.forFeature([
            Coffee
        ])
    ],
    providers: [
        CoffeesService
    ]
})
export class CoffeesModule { }
