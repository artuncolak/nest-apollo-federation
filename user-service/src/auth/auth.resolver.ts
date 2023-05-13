import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { AuthPayload } from './dto/auth-payload.dto';
import { LoginInput } from './dto/login-user.input';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation((returns) => AuthPayload)
  async login(
    @Args('loginInput') loginInput: LoginInput,
  ): Promise<AuthPayload> {
    return this.authService.login(loginInput);
  }
}
