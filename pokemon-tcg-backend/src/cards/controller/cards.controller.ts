import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardsService } from '../service/cards.service';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  // Crear
  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  // Listar cartas
  @Get()
  findAll() {
    return this.cardsService.findAll();
  }

  // Buscar por id
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  // Actualizar por id
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, updateCardDto);
  }

  // Eliminar por id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
