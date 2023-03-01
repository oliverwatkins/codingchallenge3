import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { Employee } from './entities/employee.entity';
import { CreateEmployeeInput } from './dto/create-employee.input';
import {EmployeesService} from "./employees.service";
import {Order} from "../orders/entities/order.entity";

@Resolver(() => Employee)
export class EmployeesResolver {
  constructor(private readonly employeesService: EmployeesService) {}

  @Mutation(() => Employee)
  createEmployee(@Args('createEmployeesInput') createEmployeeInput: CreateEmployeeInput) {
    return this.employeesService.create(createEmployeeInput);
  }

  @Query(() => [Employee], { name: 'employees' })
  findAll() {
    return this.employeesService.findAll();
  }

  @Query(() => Employee, { name: 'employee' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.employeesService.findOne(id);
  }

  @ResolveField(returns => [Order])
  ordersByEmployee(@Parent() owner: Employee): Promise<Order[]>{
    return this.employeesService.getOrdersByEmployee(owner)
  }
}
