import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
  IsEmail,
} from "class-validator";

export class CreateUserDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username: string;

  @IsEmail()
  email?: string;

  @IsOptional()
  @IsUrl()
  profile_image?: string;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  bio?: string;

  @IsOptional()
  @IsString()
  background?: string;
}
