import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { RegisterUserInput } from './dto/register-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async register(registerUserInput: RegisterUserInput): Promise<User> {
    if (
      await this.userModel.exists({
        email: registerUserInput.email,
      })
    ) {
      throw new Error('User already exists');
    }

    const user = new this.userModel({
      ...registerUserInput,
      password: await bcrypt.hash(registerUserInput.password, 10),
    });
    await user.save();
    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new Error('User not found');
    }

    return this.userModel.findOne({ email }).exec();
  }

  async update(email: string, updateUserInput: UpdateUserInput): Promise<User> {
    if (updateUserInput.password) {
      updateUserInput.password = await bcrypt.hash(
        updateUserInput.password,
        10,
      );
    }
    return await this.userModel
      .findOneAndUpdate({ email }, updateUserInput, { new: true })
      .exec();
  }

  async delete(email: string): Promise<User> {
    if (
      !(await this.userModel.exists({
        email,
      }))
    ) {
      throw new Error('User not found');
    }

    return this.userModel.findOneAndDelete({ email }).exec();
  }
}
