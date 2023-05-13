import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Public } from 'src/decorators/public.decorator';

import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserGuard } from './guards/user.guard';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @Mutation((returns) => User)
  async register(
    @Args('registerInput') registerInput: RegisterUserInput,
  ): Promise<User> {
    return this.userService.register(registerInput);
  }

  @Query((returns) => User)
  async user(@Args('email') email: string): Promise<User> {
    return this.userService.findByEmail(email);
  }

  @UseGuards(UserGuard)
  @Mutation((returns) => User)
  async updateUser(
    @Args('email') email: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ): Promise<User> {
    return this.userService.update(email, updateUserInput);
  }

  @UseGuards(UserGuard)
  @Mutation((returns) => User)
  async deleteUser(@Args('email') email: string): Promise<User> {
    return this.userService.delete(email);
  }
}
