import * as bcrypt from 'bcrypt';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@ObjectType()
@Schema()
export class User {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  displayName: string;

  @Field()
  @Prop({ lowercase: true, required: true })
  email: string;

  @Field()
  @Prop({ default: false })
  emailVerified: boolean;

  @Prop({ required: true })
  password: string;

  comparePassword: (candidate: string) => Promise<boolean>;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

function comparePassword(candidate: string): Promise<boolean> {
  const user = this as UserDocument;
  return bcrypt.compare(candidate, user.password);
}

async function onPreSave(next: () => void) {
  const user = this as UserDocument;

  // Check if user hasn't password field modified.
  if (!user.isModified('password')) {
    return next();
  }

  // Generate salt and hash the user password with it.
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);

  // Replace the password with the hash.
  user.password = hash;

  next();
}

UserSchema.methods.comparePassword = comparePassword;
UserSchema.pre('save', onPreSave);
