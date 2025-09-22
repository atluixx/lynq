import { IsString, IsUrl, IsOptional } from "class-validator";

export class LinkDTO {
  @IsString()
  title: string;

  @IsUrl()
  url: string;

  @IsOptional()
  is_active?: boolean;

  @IsOptional()
  order?: number;

  @IsOptional()
  expires_at?: Date;

  @IsOptional()
  max_clicks?: number;
}
