import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Date, Document } from 'mongoose';

@ObjectType()
@Schema()
export class Session {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  address: string;

  @Field()
  @Prop({ required: true })
  device: string;

  @Prop({ required: true })
  token: string;

  @Prop({ required: true })
  user: string;

  @Field(() => Number)
  @Prop({
    type: Date,
    default: Date.now,
    expires: process.env['JWT_EXPIRATION'],
  })
  date: Date;
}

export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
