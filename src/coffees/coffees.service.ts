import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';


@Injectable()
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
    ) { }



    findAll(paginationQuery: PaginationQueryDto) {
        const { limit, offset } = paginationQuery;
        return this.coffeeRepository.find({
            relations: ['flavors'],
            skip: offset,
            take: limit
        });
    }


    async findOne(id: string) {
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ['flavors']
        });
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not fond.`)
        }
        return coffee;
    }


    async create(createCoffeDto: CreateCoffeeDto) {
        const flavors = await Promise.all(
            createCoffeDto.flavors.map(name => this.preloadFlavorByName(name))
        )
        const coffee = await this.coffeeRepository.create({
            ...createCoffeDto,
            flavors
        });
        return this.coffeeRepository.save(coffee);
    }

    async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
        const flavors = updateCoffeeDto.flavors && await Promise.all(
            updateCoffeeDto.flavors.map(name => this.preloadFlavorByName(name))
        )

        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateCoffeeDto,
            flavors
        })
        if (!coffee) {
            throw new NotFoundException(`Coffee ${id} not found.`);
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id: string) {
        const coffee = await this.findOne(id);
        return this.coffeeRepository.remove(coffee);
    }

    private async preloadFlavorByName(name: string): Promise<Flavor> {
        const existingFlavor = await this.flavorRepository.findOne({ name });
        if (existingFlavor) {
            return existingFlavor;
        }
        return this.flavorRepository.create({ name });
    }

}
