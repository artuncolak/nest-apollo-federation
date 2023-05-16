import { Directive, Field, Float, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Directive('@key(fields: "movieId")')
@Schema()
export class Rating extends Document {
  @Field(() => ID)
  readonly _id: Types.ObjectId;

  @Field(() => ID, { nullable: true })
  @Prop({ required: true })
  movieId: Types.ObjectId;

  @Field(() => ID)
  @Prop({ required: true })
  userId: Types.ObjectId;

  @Field(() => Float)
  @Prop({ required: true, min: 0, max: 10 })
  rating: number;

  @Field(() => String, { nullable: true })
  @Prop()
  comment?: string;
}

export const RatingSchema = SchemaFactory.createForClass(Rating);
