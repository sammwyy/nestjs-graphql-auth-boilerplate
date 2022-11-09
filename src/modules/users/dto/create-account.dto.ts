import { IsEmail, IsNotEmpty, MaxLength } from 'class-validator';

export default class CreateAccountDTO {
  @IsNotEmpty()
  @IsEmail()
  @MaxLength(256)
  email: string;

  @IsNotEmpty()
  @MaxLength(256)
  password: string;
}
