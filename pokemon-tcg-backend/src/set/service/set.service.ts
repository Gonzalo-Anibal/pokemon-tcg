import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSetDto } from '../dto/create-set.dto';
import { UpdateSetDto } from '../dto/update-set.dto';
import { SetRepository } from '../repository/set.repository';

@Injectable()
export class SetService {
  constructor(private readonly setRepository: SetRepository) {}

  create(createSetDto: CreateSetDto) {
    return this.setRepository.createSet(createSetDto);
  }

  findAll() {
    return this.setRepository.findAll();
  }

  async findOne(id: string) {
    const set = await this.setRepository.findOne(id);
    if (!set) {
      throw new NotFoundException(`Set with id ${id} not found`);
    }
    return set;
  }

  async update(id: string, updateSetDto: UpdateSetDto) {
    return this.setRepository.updateSet(id, updateSetDto);
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica existencia
    return this.setRepository.removeSet(id);
  }
}
