import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateMovieInput {
  @Field()
  name: string;

  @Field()
  releaseDate: Date;
}
