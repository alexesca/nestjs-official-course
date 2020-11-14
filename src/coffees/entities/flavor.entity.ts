import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { Coffee } from "./coffe.entity";

@Entity()
export class Flavor {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(
        type => Coffee,
        (cofee) => cofee.flavors
    )
    coffees: Coffee[]
}
