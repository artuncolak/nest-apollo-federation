import { Args, Mutation, Resolver, ResolveReference } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { AuthUserId } from 'shared';

import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { RatingService } from './rating.service';
import { Rating } from './schemas/rating.schema';

@Resolver((of) => Rating)
export class RatingResolver {
  constructor(private readonly ratingService: RatingService) {}

  @Mutation((returns) => Rating)
  async createRating(
    @AuthUserId() userId: string,
    @Args('createRatingInput') createRatingInput: CreateRatingInput,
  ) {
    return this.ratingService.create(userId, createRatingInput);
  }

  @Mutation((returns) => Rating)
  async updateRating(
    @AuthUserId() userId: string,
    @Args('updateRatingInput') updateRatingInput: UpdateRatingInput,
  ) {
    return this.ratingService.update(userId, updateRatingInput);
  }

  @Mutation((returns) => Rating)
  async getRatingById(
    @AuthUserId() userId: string,
    @Args('ratingId') ratingId: string,
  ) {
    return this.ratingService.delete(userId, ratingId);
  }

  @ResolveReference()
  async resolveReference(reference: {
    __typename: string;
    movieId: Types.ObjectId;
  }): Promise<Rating> {
    return await this.ratingService.getByMovieId(reference.movieId.toString());
  }
}
