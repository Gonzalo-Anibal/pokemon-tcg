import { Type } from 'class-transformer';
import { IsString, IsArray, IsOptional, ValidateNested } from 'class-validator';
import { CreateImageDto } from './create-image.dto';
import { CreateMarketDto } from '../../market/dto/create-market.dto';

export class CreateCardDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  supertype: string;

  @IsArray()
  @IsString({ each: true })
  subtypes: string[];

  @IsArray()
  @IsString({ each: true })
  types: string[];

  @IsString()
  set_id: string;

  @IsString()
  number: string;

  @IsOptional()
  @IsString()
  rarity?: string;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateImageDto)
  images?: CreateImageDto[];

  @IsOptional()
  @ValidateNested({ each: true })
  @Type(() => CreateMarketDto)
  markets?: CreateMarketDto[];
}
