import { Injectable, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from './entities/event.entity'
import { COFFEE_BRANDS } from './coffess.constants';

export class ConfigService { }
export class DevelopmentConfigService { }
export class ProductionConfigService { }


@Injectable()
class CoffeBrandsFactory {
    create() {
        return [
            'Starbucks',
            'Nestcafe'
        ]
    }
}

@Module({
    controllers: [
        CoffeesController
    ],
    exports: [
        CoffeesService
    ],
    imports: [
        TypeOrmModule.forFeature([
            Coffee,
            Flavor,
            Event
        ])
    ],
    providers: [
        CoffeesService,
        CoffeBrandsFactory,
        {
            provide: COFFEE_BRANDS,
            useFactory: async (coffeBrandsFactory: CoffeBrandsFactory) => {
                console.log("Inside async factory!!!")
                return Promise.resolve(coffeBrandsFactory.create())
            },
            inject: [
                CoffeBrandsFactory
            ]
        },
        {
            provide: ConfigService,
            useValue: process.env.NODE_ENV === 'production' ? new ProductionConfigService() : new DevelopmentConfigService()
        }
    ]
})
export class CoffeesModule { }
