import {forwardRef, Inject, Injectable, OnModuleInit} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrderInput } from './dto/create-order.input';
import { Order } from './entities/order.entity';
import {UpdateOrderInput} from "./dto/update-order.input";
import {Item} from "./entities/item.entity";
import {Employee} from "../employees/entities/employee.entity";
import {StatusChange} from "./entities/statusChange.entity";

@Injectable()
export class OrdersService implements OnModuleInit {
  constructor(
      @InjectRepository(Order) private ordersRepository: Repository<Order>,
      @InjectRepository(Item) private itemRepository: Repository<Item>,
      @InjectRepository(Employee) private employeeRepository: Repository<Employee>,
      @InjectRepository(StatusChange) private statusChangeRepository: Repository<StatusChange>,
  ){}

  createOrder(createOrderInput: CreateOrderInput): Promise<Order> {
    const newOrder = this.ordersRepository.create(createOrderInput)

    return this.ordersRepository.save(newOrder)
  }

  async updateOrder(orderId: number, updateOrderInput: UpdateOrderInput): Promise<Order> {

    console.info("updateOrderInput.state " + updateOrderInput.state)

    switch (updateOrderInput.state) {
      case "OPEN":
        updateOrderInput.state = "IN_PROGRESS"
        break;
      case "IN_PROGRESS":
        updateOrderInput.state = "COMPLETE"
        break;
      case "COMPLETE":
        updateOrderInput.state = "OPEN"
        break;
      default:
        updateOrderInput.state = "OPEN"
    }

    let order = await this.ordersRepository.save(updateOrderInput)

    let employee = await this.employeeRepository.findOne({where: {id: updateOrderInput.employeeNo}})

    await this.statusChangeRepository.save({status: updateOrderInput.state, employee: employee, updatedDate: Date.now().toString(), order: order})

    //TODO is it really necessary to reload this order?
    order = await this.ordersRepository.findOne({where: {id: updateOrderInput.id}})

    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.ordersRepository.find();
  }

  async findByEmployee(employee: Employee) {
    let all = await this.ordersRepository.find();

    return await this.ordersRepository.find({
      where: {
        employee: employee
      },
      relations: ['employee'],
    });
  }

  async findAllItems(): Promise<Item[]> {
    return this.itemRepository.find();
  }

  findOne(id: number): Promise<Order> {
    return this.ordersRepository.findOneOrFail(id)
  }

  async itemsByOrder(order: Order) {
    return await this.itemRepository.find({
      where: {
        order: order
      },
      relations: ['order'],
    });
  }

  async statusChangesByOrder(order: Order) {
    return await this.statusChangeRepository.find({
      where: {
        order: order
      },
      relations: ['order'],
    });
  }

  async onModuleInit() {
    console.log(`Initialization...order services`);

    let employee = await this.employeeRepository.save({name: "Jimbo"})

    let order1 = await this.ordersRepository.save({state:"OPEN", description:"blah", customer: "Bob Dylan", createdDate:Date.now().toString(), updatedDate: Date.now().toString(), employee: employee})
    let order2 = await this.ordersRepository.save({state:"OPEN", description:"blah", customer: "Jimi Hendrix",  createdDate:Date.now().toString(), updatedDate: Date.now().toString()})
    let order3 = await this.ordersRepository.save({state:"OPEN", description:"blah", customer: "Jim Morrison", createdDate:Date.now().toString(), updatedDate: Date.now().toString()})
    let order4 = await this.ordersRepository.save({state:"OPEN", description:"blah", customer: "Janis Joplin", createdDate:Date.now().toString(), updatedDate: Date.now().toString()})

    await this.statusChangeRepository.save({status: "OPEN", employee: employee, updatedDate: Date.now().toString(), order: order1})
    await this.statusChangeRepository.save({status: "IN_PROGRESS", employee: employee, updatedDate: Date.now().toString(),  order: order1})
    await this.statusChangeRepository.save({status: "COMPLETE", employee: employee, updatedDate: Date.now().toString(),  order: order1})

    let employee2 = await this.employeeRepository.save({name: "Jacko", orders: [order3, order4]})

    console.info(order1.state)

    await this.itemRepository.save({state:"OPEN", description:"Bosch headsets", amount: 2, order: order1})
    await this.itemRepository.save({state:"OPEN", description:"Sony amplifier", amount: 1 , order: order1})
    await this.itemRepository.save({state:"OPEN", description:"Usb cables", amount: 4 , order: order1})
    await this.itemRepository.save({state:"OPEN", description:"Dyson Vacuum cleaner", amount: 1 , order: order2})
    await this.itemRepository.save({state:"OPEN", description:"CD Elton Johns greatest hits", amount: 1, order: order3})
    await this.itemRepository.save({state:"OPEN", description:"CD Bon Jov greatest hits", amount: 1, order: order3})
    await this.itemRepository.save({state:"OPEN", description:"Lenovo Laptop", amount: 1, order: order4})
  }
}
