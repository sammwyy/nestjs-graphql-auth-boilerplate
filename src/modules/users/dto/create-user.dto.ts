import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class CreateUserDTO {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  password: string;
}
