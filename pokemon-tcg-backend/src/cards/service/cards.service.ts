import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCardDto } from '../dto/create-card.dto';
import { UpdateCardDto } from '../dto/update-card.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from '../entities/card.entity';
import { Repository } from 'typeorm';
import { Image } from '../entities/image.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepository: Repository<Card>,

    @InjectRepository(Image)
    private readonly imageRepository: Repository<Image>,
  ) {}

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const card = this.cardRepository.create(createCardDto);
    if (createCardDto.images) {
      card.images = createCardDto.images.map((imageDto) => {
        const image = this.imageRepository.create(imageDto);
        image.card = card; // Asigna la relación
        return image;
      });
    }
    return await this.cardRepository.save(card);
  }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.find({ relations: ['images'] });
  }

  async findOne(id: string): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['images', 'markets'], // <--- esta es la clave
    });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }
    return card;
  }

  async findAllBySetId(setId: string): Promise<Card[]> {
    return this.cardRepository.find({
      where: { setId },
      relations: ['images', 'markets'],
    });
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const card = await this.cardRepository.findOne({
      where: { id },
      relations: ['images'],
    });
    if (!card) {
      throw new NotFoundException(`Card with id ${id} not found`);
    }

    // Actualizar los campos básicos de la carta
    this.cardRepository.merge(card, updateCardDto);

    // Manejar imágenes (opcional, puedes ajustar según el caso)
    if (updateCardDto.images) {
      // Elimina las imágenes antiguas (o podrías actualizarlas si prefieres)
      await this.imageRepository.delete({ card: { id } });

      // Crea las nuevas imágenes
      card.images = updateCardDto.images.map((imageDto) => {
        const image = this.imageRepository.create(imageDto);
        image.card = card;
        return image;
      });
    }

    return this.cardRepository.save(card);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id); // Valida existencia
    await this.cardRepository.delete(id);
  }
}
