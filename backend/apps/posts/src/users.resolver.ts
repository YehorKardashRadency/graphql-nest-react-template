import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Post } from './types/post.type';
import { UserType } from './types/user.type';
import { PostsService } from './posts.service';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly postsService: PostsService) {}

  @ResolveField(() => [Post])
  async posts(@Parent() user: UserType): Promise<Post[]> {
    return await this.postsService.forAuthor(user.id);
  }
}
