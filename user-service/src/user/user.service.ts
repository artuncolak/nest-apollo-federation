import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Model } from 'mongoose';
import { config } from 'src/config';

import { AuthPayload } from './dto/auth-payload.dto';
import { RegisterUserInput } from './dto/register-user.input';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    const user = new this.userModel({
      ...registerUserInput,
      password: await bcrypt.hash(registerUserInput.password, 10),
    });
    await user.save();
    return user;
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const user = await this.userModel.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ user }, config.jwt.secret, {
        expiresIn: '1h',
      });

      return { user, token };
    }

    throw new Error('Invalid email or password');
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userModel.findOne({ email }).exec();
  }
}
