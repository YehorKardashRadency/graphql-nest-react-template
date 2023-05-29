import { ObjectType, Field, ID, Directive } from '@nestjs/graphql';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserType {
  @Field(() => ID)
  id: string;
  @Field(() => String)
  fullName: string;
  @Field(() => String)
  userName: string;
}
