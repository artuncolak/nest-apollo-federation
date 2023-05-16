import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateRatingInput } from './dto/create-rating.input';
import { UpdateRatingInput } from './dto/update-rating.input';
import { Rating } from './schemas/rating.schema';

@Injectable()
export class RatingService {
  constructor(@InjectModel(Rating.name) private ratingModel: Model<Rating>) {}

  async create(
    userId: string,
    createRatingInput: CreateRatingInput,
  ): Promise<Rating> {
    const newRating = new this.ratingModel({ userId, ...createRatingInput });
    return await newRating.save();
  }

  async update(
    userId: string,
    updateRatingInput: UpdateRatingInput,
  ): Promise<Rating> {
    const { _id, ...updateFields } = updateRatingInput;
    const rating = await this.ratingModel
      .findOneAndUpdate({ _id, userId }, updateFields, { new: true })
      .exec();
    if (!rating) throw new NotFoundException('Rating not found');
    return rating;
  }

  async delete(userId: string, ratingId: string): Promise<Rating> {
    const rating = await this.ratingModel
      .findOneAndDelete({ _id: ratingId, userId })
      .exec();
    if (!rating) throw new NotFoundException('Rating not found');
    return rating;
  }

  async getByMovieId(movieId: string): Promise<Rating> {
    return await this.ratingModel.findOne({ movieId }).exec();
  }
}
