import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { RegisterUserInput } from './dto/register-user.input';
import { User } from './schemas/user.schema';
import { UserService } from './user.service';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

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
}
