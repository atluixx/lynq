import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
  MaxLength,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email: string;

  @IsStrongPassword({
    minLength: 8,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  password: string;
}
