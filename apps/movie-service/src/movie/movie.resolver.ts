import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthUserId } from 'shared';

import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { MovieService } from './movie.service';
import { Movie } from './schemas/movie.schema';

@Resolver()
export class MovieResolver {
  constructor(private movieService: MovieService) {}

  @Mutation((returns) => Movie)
  async createMovie(
    @AuthUserId() userId: string,
    @Args('createMovieInput') createMovieInput: CreateMovieInput,
  ): Promise<Movie> {
    console.log(userId);
    return this.movieService.create(userId, createMovieInput);
  }

  @Mutation((returns) => Movie)
  async updateMovie(
    @AuthUserId() userId: string,
    @Args('updateMovieInput') updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> {
    return this.movieService.update(userId, updateMovieInput);
  }

  @Query((returns) => Movie, { nullable: true })
  async getMovieById(
    @AuthUserId() userId: string,
    @Args('_id') _id: string,
  ): Promise<Movie> {
    return this.movieService.getById(_id, userId);
  }

  @Query((returns) => [Movie])
  async getMovies(@AuthUserId() userId: string): Promise<Movie[]> {
    return this.movieService.getByUserId(userId);
  }

  @Mutation((returns) => Movie)
  async deleteMovie(
    @AuthUserId() userId: string,
    @Args('_id') _id: string,
  ): Promise<Movie> {
    return this.movieService.deleteMovie(_id, userId);
  }
}
