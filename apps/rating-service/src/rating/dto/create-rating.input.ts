import { Field, Float, InputType } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@InputType()
export class CreateRatingInput {
  @Field()
  movieId: string;

  @Field((type) => Float)
  @Min(0)
  @Max(10)
  rating: number;

  @Field({ nullable: true })
  comment?: string;
}
