import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Employee} from "../../employees/entities/employee.entity";
import {Order} from "./order.entity";

@Entity()
@ObjectType()
export class Item {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    description: string;

    @Column()
    @Field()
    amount: number;

    @ManyToOne(() => Order, order => order.items)
    @Field(type => Order)
    order: Order

}
