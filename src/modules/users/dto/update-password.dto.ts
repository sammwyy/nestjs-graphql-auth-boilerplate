import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, Length, MaxLength } from 'class-validator';

@InputType()
export default class UpdatePasswordDTO {
  @IsNotEmpty()
  @MaxLength(256)
  @Field(() => String)
  oldPassword: string;

  @IsNotEmpty()
  @Length(8, 256)
  @Field(() => String)
  newPassword: string;
}
