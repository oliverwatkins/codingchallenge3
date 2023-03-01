import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEmployeeInput } from './dto/create-employee.input';
import { Employee } from './entities/employee.entity';
import {OrdersService} from "../orders/orders.service";

@Injectable()
export class EmployeesService {
  constructor(
  @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
  @Inject(forwardRef(() => OrdersService)) private ordersService: OrdersService){}

  create(createEmployeeInput: CreateEmployeeInput) {
    const newOwner = this.employeeRepository.create(createEmployeeInput);
    return this.employeeRepository.save(newOwner);
  }

  findAll() {
    return this.employeeRepository.find();
  }

  getOrdersByEmployee(employee: Employee) {
    return this.ordersService.findByEmployee(employee);
  }

  findOne(id: number) {
    return this.employeeRepository.findOne(id);
  }

  getOrders() {
    return this.ordersService.findAll()
  }
}
