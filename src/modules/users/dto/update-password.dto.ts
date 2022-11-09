import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, MaxLength } from 'class-validator';

@InputType()
export default class UpdatePasswordDTO {
  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  oldPassword: string;

  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  newPassword: string;
}
