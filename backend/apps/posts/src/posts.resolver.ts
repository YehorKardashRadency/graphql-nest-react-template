import {
  Resolver,
  Query,
  Mutation,
  Args,
  Parent,
  ResolveField
} from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { Post } from './types/post.type';
import { CreatePostInput } from './models/create-post.input';
import { UpdatePostInput } from './models/update-post.input';
import { UserType } from './types/user.type';
import { GetUser } from './common/decorators/get-user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './common/guards/post/auth.guard';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  createPost(
    @GetUser() user,
    @Args('createPostInput') createPostInput: CreatePostInput
  ) {
    return this.postsService.create(user, createPostInput);
  }

  @Query(() => [Post], { name: 'posts' })
  findAll() {
    return this.postsService.findAll();
  }

  @Query(() => Post, { name: 'post' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  updatePost(
    @GetUser() user,
    @Args('updatePostInput') updatePostInput: UpdatePostInput
  ) {
    return this.postsService.update(user, updatePostInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Post)
  removePost(@GetUser() user, @Args('id', { type: () => String }) id: string) {
    return this.postsService.remove(user, id);
  }

  @ResolveField(() => UserType)
  user(@Parent() post: Post): any {
    return { __typename: 'UserType', id: post.authorId };
  }
}
