import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@ObjectType()
@Directive('@key(fields: "_id")')
@Schema()
export class Movie extends Document {
  @Field(() => ID)
  readonly _id: Types.ObjectId;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field()
  @Prop({ required: true })
  releaseDate: Date;

  @Field(() => ID)
  @Prop({ required: true })
  userId: Types.ObjectId;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
