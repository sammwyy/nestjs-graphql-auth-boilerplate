import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class CreateSessionDTO {
  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  email: string;

  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  password: string;
}
