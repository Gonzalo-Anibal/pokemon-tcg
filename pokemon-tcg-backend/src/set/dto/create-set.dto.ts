import { IsDateString, IsInt, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateSetDto {
    @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  series: string;

  @IsOptional()
  @IsInt()
  printedTotal?: number;

  @IsOptional()
  @IsInt()
  total?: number;

  @IsOptional()
  @IsString()
  ptcgoCode?: string;

  @IsOptional()
  @IsDateString()
  releaseDate?: string;

  @IsOptional()
  @IsDateString()
  updatedAt?: string;

  @IsOptional()
  @IsUrl()
  symbolUrl?: string;

  @IsOptional()
  @IsUrl()
  logoUrl?: string;
}
