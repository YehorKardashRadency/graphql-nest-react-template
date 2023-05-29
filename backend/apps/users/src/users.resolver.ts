import {
  Args,
  ID,
  Mutation,
  Query,
  ResolveReference,
  Resolver
} from '@nestjs/graphql';
import { CreateUserInput } from './models/create-user.input';
import { UpdateUserInput } from './models/update-user.input';
import { UserType } from './types/user.type';
import { UsersService } from './users.service';
import { GetUser } from './common/decorators/get-user.decorator';
import { CurrentUser } from './common/decorators/current-user.model';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './common/guards/auth/auth.guard';

@Resolver(() => UserType)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [UserType], { name: 'users' })
  findAll() {
    return this.usersService.findAll();
  }

  @Query(() => UserType, { name: 'userById' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => UserType, { name: 'current_user' })
  findCurrent(@GetUser() user: CurrentUser) {
    console.log('GET USER', user.sub);
    return this.usersService.findOne(user.sub);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserType)
  createUser(
    @GetUser() user: CurrentUser,
    @Args('createUserInput') createUserInput: CreateUserInput
  ) {
    console.log('create user', user);
    return this.usersService.create(user, createUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => UserType)
  updateUser(
    @GetUser() user: CurrentUser,
    @Args('updateUserInput') updateUserInput: UpdateUserInput
  ) {
    return this.usersService.update(user, updateUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => ID)
  removeUser(@GetUser() user: CurrentUser) {
    return this.usersService.remove(user);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    id: string;
  }): Promise<UserType> {
    return await this.usersService.findOne(reference.id);
  }
}
