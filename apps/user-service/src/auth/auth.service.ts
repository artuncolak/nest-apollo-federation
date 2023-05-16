import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';

import { AuthPayload } from './dto/auth-payload.dto';
import { LoginInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async login(loginInput: LoginInput): Promise<AuthPayload> {
    const { email, password } = loginInput;
    try {
      const user = await this.userService.findByEmail(email);

      if (user && (await bcrypt.compare(password, user.password))) {
        const token = this.jwtService.sign({ user });

        return { user, token };
      }

      throw new Error('Invalid email or password');
    } catch (error) {
      throw new Error('Invalid email or password');
    }
  }
}
