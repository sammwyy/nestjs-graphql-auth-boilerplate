import { IsEmail, MaxLength } from 'class-validator';

export default class EditAccountDTO {
  @IsEmail()
  @MaxLength(256)
  email?: string;

  @MaxLength(256)
  password?: string;
}
