import { forwardRef, Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from "./entities/order.entity";
import {Item} from "./entities/item.entity";
import {Employee} from "../employees/entities/employee.entity";
import {StatusChange} from "./entities/statusChange.entity";

@Module({
  imports :[TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Item]),
    TypeOrmModule.forFeature([Employee]),
    TypeOrmModule.forFeature([StatusChange])],
  providers: [OrdersService, OrdersResolver],
  exports: [OrdersService]
})
export class OrdersModule {}
