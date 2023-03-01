import { InputType, Int, Field } from '@nestjs/graphql';


@InputType()
export class CreateEmployeeInput {
    @Field()
    name: string;
}
