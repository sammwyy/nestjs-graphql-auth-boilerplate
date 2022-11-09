import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

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

  @Field()
  @Prop({ type: BigInt })
  date: number;

  @Prop({ type: BigInt })
  token: string;

  @Prop({ required: true })
  user: string;
}

export type SessionDocument = Session & Document;
export const SessionSchema = SchemaFactory.createForClass(Session);
