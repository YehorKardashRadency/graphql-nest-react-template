import { Field, ID, ObjectType } from '@nestjs/graphql';
import { UserType } from './user.type';

@ObjectType()
export class Post {
  @Field(() => ID)
  id: string;

  @Field()
  body: string;

  @Field()
  title: string;

  @Field()
  authorId: string;

  @Field(() => UserType)
  user?: UserType;
}
