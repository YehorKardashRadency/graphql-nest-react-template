import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Post } from './post.type';

@ObjectType()
@Directive('@key(fields: "id")')
export class UserType {
  @Field(() => ID)
  id: string;
  @Field(() => [Post])
  posts?: Post[];
}
