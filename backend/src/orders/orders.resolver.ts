import {Args, Int, Mutation, Parent, Query, ResolveField, Resolver} from '@nestjs/graphql';
import {Order} from './entities/order.entity';
import {OrdersService} from './orders.service';
import {CreateOrderInput} from "./dto/create-order.input";
import {UpdateOrderInput} from "./dto/update-order.input";
import {Item} from "./entities/item.entity";
import {StatusChange} from "./entities/statusChange.entity";

@Resolver(of => Order)
export class OrdersResolver {
    constructor(private ordersService: OrdersService) {
    }

    @Query(returns => Order)
    getOrder(@Args('id', {type: () => Int}) id: number): Promise<Order> {
        return this.ordersService.findOne(id)
    }

    @Query(returns => [Order])
    orders(): Promise<Order[]> {
        return this.ordersService.findAll();
    }

    @ResolveField(returns => [Item])
    items(@Parent() owner: Order):Promise<Item[]> {
        return this.ordersService.itemsByOrder(owner);
    }

    @ResolveField(returns => [StatusChange])
    statusChanges(@Parent() owner: Order):Promise<StatusChange[]> {
        return this.ordersService.statusChangesByOrder(owner);
    }

    @Mutation(returns => Order)
    createOrder(@Args('createOrderInput') createOrderInput: CreateOrderInput): Promise<Order> {
        return this.ordersService.createOrder(createOrderInput)
    }

    @Mutation(() => Order)
    updateOrder(@Args('updateOrderInput') updateOrderInput: UpdateOrderInput) {
        return this.ordersService.updateOrder(updateOrderInput.id, updateOrderInput);
    }
}
