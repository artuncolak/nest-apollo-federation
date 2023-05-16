import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { RatingResolver } from './rating.resolver';
import { RatingService } from './rating.service';
import { Rating, RatingSchema } from './schemas/rating.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Rating.name, schema: RatingSchema }]),
  ],
  providers: [RatingResolver, RatingService],
})
export class RatingModule {}
