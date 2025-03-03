import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { SetService } from '../service/set.service';
import { CreateSetDto } from '../dto/create-set.dto';
import { CardsService } from 'src/cards/service/cards.service';

@Controller('sets')
export class SetController {
  constructor(
    private readonly setService: SetService,
    private readonly cardsService: CardsService,
  ) {}

  @Post()
  create(@Body() createSetDto: CreateSetDto) {
    return this.setService.create(createSetDto);
  }

  @Get()
  findAll() {
    return this.setService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.setService.findOne(id);
  }

  @Get(':id/cards')
  async findCardsBySetId(@Param('id') setId: string) {
    return this.cardsService.findAllBySetId(setId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateSetDto: UpdateSetDto) {
  //   return this.setService.update(id, updateSetDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.setService.remove(id);
  // }
}
