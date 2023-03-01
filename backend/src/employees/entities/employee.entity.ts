import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Order} from "../../orders/entities/order.entity";
import {StatusChange} from "../../orders/entities/statusChange.entity";

@Entity()
@ObjectType()
export class Employee {
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name?: string;

    @OneToMany(() => Order, order => order.employee)
    @Field(type => [Order], {nullable: true})
    orders?: Order[]

    @OneToMany(() => StatusChange, statusChange => statusChange.order)
    @Field(type => [StatusChange],  {nullable: true})
    statusChanges?: StatusChange[]

}
