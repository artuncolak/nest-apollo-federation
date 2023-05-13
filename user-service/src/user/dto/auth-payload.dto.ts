import { Field, ObjectType } from '@nestjs/graphql';

import { User } from '../schemas/user.schema';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  token: string;

  @Field(() => User)
  user: User;
}
