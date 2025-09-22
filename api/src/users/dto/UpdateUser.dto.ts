import { Type } from "class-transformer";
import type { Link } from "@prisma/client";
import {
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
  IsUrl,
  IsEmail,
  IsArray,
  ValidateNested,
} from "class-validator";
import { LinkDTO } from "./Link.dto";

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  username?: string;

  @IsOptional()
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

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LinkDTO)
  links?: LinkDTO[];
}
