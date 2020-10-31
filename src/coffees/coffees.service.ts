import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Coffee } from './entites/coffe.entity';


@Injectable()
export class CoffeesService {
    private coffees: Coffee[] = [
        {
            id: 1,
            name: "Frapuccino",
            brand: "Blue Cup",
            flavors: [
                "mint",
                "pumpkin",
                "caramel"
            ],
        },
        {
            id: 2,
            name: "Dark",
            brand: "Colombian",
            flavors: [
                "Oscuro",
                "Pesado",
                "Levanta muertos"
            ],
        },
        {
            id: 3,
            name: "Sturbucks",
            brand: "Importes",
            flavors: [
                "Attum",
                "Minty icy",
                "Pink Black"
            ],
        }
    ]


    findAll() {
        return this.coffees;
    }


    findOne(id: string) {
        const coffee = this.coffees.find(item => item.id === +id);
        if (!coffee) {
            throw new HttpException("Not found id", HttpStatus.NOT_FOUND)
        } else {
            return coffee;
        }
    }


    create(createCoffeDto: any) {
        return this.coffees.push(createCoffeDto);
    }

    update(id: string, upateCoffeDto: any) {
        const existingCoffe = this.findOne(id);
        if (existingCoffe) {
            return 'Updated existing coffe';
        }
    }

    remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (!!~coffeeIndex) {
            return this.coffees.splice(coffeeIndex, 1);
        }
    }

}
