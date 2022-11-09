import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { User } from './models/user';
import { UsersService } from './users.service';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import CurrentUser from 'src/decorators/current-user.decorator';

import CreateUserDTO from './dto/create-user.dto';
import UpdatePasswordDTO from './dto/update-password.dto';
import UpdateUserDTO from './dto/update-user.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  public createUser(@Args('payload') payload: CreateUserDTO): Promise<User> {
    return this.usersService.create(payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  public updateUser(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdateUserDTO,
  ): Promise<boolean> {
    return this.usersService.update(user._id, payload);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  public updatePassword(
    @CurrentUser() user: User,
    @Args('payload') payload: UpdatePasswordDTO,
  ): Promise<boolean> {
    return this.usersService.updatePassword(user._id, payload);
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async getCurrentUser(@CurrentUser() user: User): Promise<User> {
    return user;
  }
}
