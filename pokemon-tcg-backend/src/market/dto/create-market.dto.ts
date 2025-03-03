import { IsString, IsUrl, IsDate, IsNotEmpty } from 'class-validator';

export class CreateMarketDto {
    @IsUrl()
    @IsNotEmpty()
    url: string;

    @IsDate()
    @IsNotEmpty()
    updatedAt: Date;

    @IsString()
    @IsNotEmpty()
    market: string;
}
