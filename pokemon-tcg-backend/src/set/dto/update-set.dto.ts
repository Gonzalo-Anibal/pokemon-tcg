import { PartialType } from '@nestjs/mapped-types';
import { CreateSetDto } from './create-set.dto';
import { IsDateString, IsInt, IsOptional, IsString, IsUrl } from 'class-validator';

export class UpdateSetDto {
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    series?: string;
  
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