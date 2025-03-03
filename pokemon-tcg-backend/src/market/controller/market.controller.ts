import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MarketService } from '../service/market.service';
import { CreateMarketDto } from '../dto/create-market.dto';
import { UpdateMarketDto } from '../dto/update-market.dto';
import { Market } from '../entities/market.entity';

@Controller('cards/:cardId/markets')
export class MarketController {
  constructor(private readonly marketService: MarketService) {}

  @Post()
  create(
      @Param('cardId') cardId: string,
      @Body() createMarketDto: CreateMarketDto,
  ): Promise<Market> {
      return this.marketService.create(cardId, createMarketDto);
  }

  @Get()
  findAll(): Promise<Market[]> {
      return this.marketService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<Market> {
      return this.marketService.findById(id);
  }

  @Patch(':id')
  update(
      @Param('id') id: number,
      @Body() updateMarketDto: UpdateMarketDto,
  ): Promise<Market> {
      return this.marketService.update(id, updateMarketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
      return this.marketService.remove(id);
  }
}
