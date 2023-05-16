import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateRatingInput } from './create-rating.input';

@InputType()
export class UpdateRatingInput extends PartialType(CreateRatingInput) {
  @Field()
  _id: string;
}
