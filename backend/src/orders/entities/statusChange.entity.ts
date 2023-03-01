import { ObjectType, Field, Int, GraphQLTimestamp } from '@nestjs/graphql';
import {Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import {Employee} from "../../employees/entities/employee.entity";
import {Order} from "./order.entity";

@Entity()
@ObjectType()
export class StatusChange {

    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    status: string;

    @Column()
    @Field()
    updatedDate: string;

    @ManyToOne(() => Order, order => order.statusChanges)
    @Field(type => Order)
    order: Order

    @ManyToOne(() => Employee, employee => employee.statusChanges)
    @Field(type => Employee)
    employee: Employee

}
