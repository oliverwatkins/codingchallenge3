import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
export class CreateOrderInput {

    @Field()
    state: string;

    @Field()
    description: string;

    @Field(type => Int)
    employeeNo: number;
}
