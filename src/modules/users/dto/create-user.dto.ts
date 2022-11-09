import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export default class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @Length(8, 256)
  @Field(() => String)
  password: string;

  @IsNotEmpty()
  @MaxLength(64)
  @Field(() => String)
  displayName: string;
}
