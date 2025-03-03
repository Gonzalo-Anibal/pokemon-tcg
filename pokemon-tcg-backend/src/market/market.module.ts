import { Module } from '@nestjs/common';
import { MarketService } from './service/market.service';
import { MarketController } from './controller/market.controller';
import { Card } from 'src/cards/entities/card.entity';
import { Market } from './entities/market.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Market, Card])],
  controllers: [MarketController],
  providers: [MarketService],
})
export class MarketModule {}
