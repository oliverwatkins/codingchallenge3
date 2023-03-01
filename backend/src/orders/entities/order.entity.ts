import { ObjectType, Field, Int } from '@nestjs/graphql';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Employee} from "../../employees/entities/employee.entity";
import {Item} from "./item.entity";
import {StatusChange} from "./statusChange.entity";

@Entity()
@ObjectType()
export class Order {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    state: string;

    @Column()
    @Field()
    customer: string;

    @Column()
    @Field()
    description: string;

    @ManyToOne(() => Employee, employee => employee.orders)
    @Field(type => Employee)
    employee: Employee

    @Column()
    @Field()
    createdDate: string; // TODO dates should be long or date object, but having problems with Graphql and dates at the moment, so using string for now


    @Column()
    @Field()
    updatedDate: string; // TODO dates should be long or date object, but having problems with Graphql and dates at the moment, so using string for now

    @OneToMany(() => Item, item => item.order)
    @Field(type => [Item],  {nullable: true})
    items?: Item[]

    @OneToMany(() => StatusChange, statusChange => statusChange.order)
    @Field(type => [StatusChange],  {nullable: true})
    statusChanges?: StatusChange[]
}
