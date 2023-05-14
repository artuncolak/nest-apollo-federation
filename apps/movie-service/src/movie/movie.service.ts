import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateMovieInput } from './dto/create-movie.input';
import { UpdateMovieInput } from './dto/update-movie.input';
import { Movie } from './schemas/movie.schema';

@Injectable()
export class MovieService {
  constructor(@InjectModel(Movie.name) private movieModel: Model<Movie>) {}

  async create(
    userId: string,
    createMovieInput: CreateMovieInput,
  ): Promise<Movie> {
    const newMovie = new this.movieModel({ ...createMovieInput, userId });
    return newMovie.save();
  }

  async update(
    userId: string,
    updateMovieInput: UpdateMovieInput,
  ): Promise<Movie> {
    const { _id, ...rest } = updateMovieInput;
    const existingMovie = await this.movieModel.findById(_id);

    if (!existingMovie) throw new Error('Movie not found');

    if (existingMovie.userId.toString() !== userId)
      throw new ForbiddenException();

    return await this.movieModel.findByIdAndUpdate(_id, rest, {
      new: true,
    });
  }

  async getById(_id: string, userId: string): Promise<Movie> {
    const movie = await this.movieModel.findById(_id);
    if (!movie) {
      throw new Error('Movie not found');
    }

    if (movie.userId.toString() !== userId) throw new ForbiddenException();

    return movie;
  }

  async getByUserId(userId: string): Promise<Movie[]> {
    return this.movieModel.find({ userId });
  }

  async deleteMovie(_id: string, userId: string): Promise<Movie> {
    const movie = await this.movieModel.findOneAndDelete({ _id, userId });
    if (!movie) {
      throw new Error('Movie not found');
    }
    return movie;
  }
}
