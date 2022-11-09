import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MaxLength } from 'class-validator';

@InputType()
export default class UpdateUserDTO {
  @IsEmail()
  @MaxLength(256)
  @Field(() => String)
  email?: string;

  @MaxLength(64)
  @Field(() => String)
  displayName?: string;
}
