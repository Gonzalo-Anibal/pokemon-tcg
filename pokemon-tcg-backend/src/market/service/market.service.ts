import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMarketDto } from '../dto/create-market.dto';
import { UpdateMarketDto } from '../dto/update-market.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Market } from '../entities/market.entity';
import { Card } from 'src/cards/entities/card.entity';
import { Repository } from 'typeorm';

@Injectable()
export class MarketService {
  constructor(
    @InjectRepository(Market)
    private readonly marketRepository: Repository<Market>,
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,
  ) {}

  async create(cardId: string, createMarketDto: CreateMarketDto): Promise<Market> {
      const card = await this.cardRepository.findOne({ where: { id: cardId } });

      if (!card) {
          throw new NotFoundException(`Card with id ${cardId} not found`);
      }

      const market = this.marketRepository.create({ ...createMarketDto, card });
      return this.marketRepository.save(market);
  }

  async findAll(): Promise<Market[]> {
      return this.marketRepository.find({ relations: ['card'] });
  }

  async findById(id: number): Promise<Market> {
      const market = await this.marketRepository.findOne({ where: { id }, relations: ['card'] });
      if (!market) {
          throw new NotFoundException(`Market with id ${id} not found`);
      }
      return market;
  }

  async update(id: number, updateMarketDto: UpdateMarketDto): Promise<Market> {
      const market = await this.findById(id);
      Object.assign(market, updateMarketDto);
      return this.marketRepository.save(market);
  }

  async remove(id: number): Promise<void> {
      const result = await this.marketRepository.delete(id);
      if (result.affected === 0) {
          throw new NotFoundException(`Market with id ${id} not found`);
      }
  }
}
