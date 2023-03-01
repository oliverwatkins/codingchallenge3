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
    createdDate: string;

    @Column()
    @Field()
    updatedDate: string;

    @OneToMany(() => Item, item => item.order)
    @Field(type => [Item],  {nullable: true})
    items?: Item[]

    @OneToMany(() => StatusChange, statusChange => statusChange.order)
    @Field(type => [StatusChange],  {nullable: true})
    statusChanges?: StatusChange[]
}
