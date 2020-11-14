import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCoffeDto } from './dto/create-coffe.dto';
import { UpdateCoffeDto } from './dto/update-coffe.dto';
import { Coffee } from './entites/coffe.entity';


@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
    ) { }



    findAll() {
        return this.coffeeRepository.find();
    }


    async findOne(id: string) {
        const coffee = await this.coffeeRepository.find();
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not fond.`)
        }
        return coffee;
    }


    async create(createCoffeDto: CreateCoffeDto) {
        const coffee = await this.coffeeRepository.create(createCoffeDto);
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, upateCoffeDto: UpdateCoffeDto) {
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...upateCoffeDto
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not found.`);
        }
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

}
