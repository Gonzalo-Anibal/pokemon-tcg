import { IsString, IsUrl, IsDate, IsOptional } from 'class-validator';

export class UpdateMarketDto {
    @IsUrl()
    @IsOptional()
    url?: string;

    @IsDate()
    @IsOptional()
    updatedAt?: Date;

    @IsString()
    @IsOptional()
    market?: string;
}
