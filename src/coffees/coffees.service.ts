import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Connection, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffe.dto';
import { UpdateCoffeeDto } from './dto/update-coffe.dto';
import { Coffee } from './entities/coffe.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from './entities/event.entity';
import { COFFEE_BRANDS } from './coffess.constants';
import { ConfigService } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';
import { ConfigType } from '@nestjs/config';



@Injectable({ scope: Scope.DEFAULT })
export class CoffeesService {

    constructor(
        @InjectRepository(Coffee)
        private readonly coffeeRepository: Repository<Coffee>,
        @InjectRepository(Flavor)
        private readonly flavorRepository: Repository<Flavor>,
        private readonly connection: Connection,
        @Inject(COFFEE_BRANDS) coffeeBrands: string[],
        private readonly configService: ConfigService,
        @Inject(coffeesConfig.KEY) coffeesConfiguration: ConfigType<typeof coffeesConfig>
    ) {
        console.log(coffeesConfiguration.foo)
    }



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


    async recommendCoffe(coffee: Coffee) {
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();

        try {
            coffee.recommendations++;
            const recommendEvent = new Event();
            recommendEvent.name = 'recommend_event';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {
                coffeeId: coffee.id
            }
            await queryRunner.manager.save(coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        } catch (e) {
            await queryRunner.rollbackTransaction();
        } finally {
            await queryRunner.release();
        }
    }

}
