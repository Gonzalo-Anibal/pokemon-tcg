import { Module } from '@nestjs/common';
import { SetService } from './service/set.service';
import { SetController } from './controller/set.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Set } from './entities/set.entity';
import { SetRepository } from './repository/set.repository';
import { CardsModule } from 'src/cards/cards.module';

@Module({
  imports: [TypeOrmModule.forFeature([Set]), CardsModule],
  controllers: [SetController],
  providers: [SetService, SetRepository],
  exports: [SetService],
})
export class SetModule {}
