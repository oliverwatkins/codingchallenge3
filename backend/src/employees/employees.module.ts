import { forwardRef, Module } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { EmployeesResolver } from './employees.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from './entities/employee.entity';

import {OrdersModule} from "../orders/orders.module";

@Module({
    imports: [forwardRef(() => OrdersModule),TypeOrmModule.forFeature([Employee]) ],
    providers: [EmployeesResolver, EmployeesService],
    exports: [EmployeesService]
})
export class EmployeesModule {}
