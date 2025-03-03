import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Set } from '../entities/set.entity';
import { CreateSetDto } from '../dto/create-set.dto';
import { UpdateSetDto } from '../dto/update-set.dto';

@Injectable()
export class SetRepository {
  constructor(@InjectRepository(Set) private readonly repo: Repository<Set>) {}

  createSet(createSetDto: CreateSetDto) {
    const set = this.repo.create(createSetDto);
    return this.repo.save(set);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  async updateSet(id: string, updateSetDto: UpdateSetDto) {
    await this.repo.update(id, updateSetDto);
    return this.findOne(id);
  }

  async removeSet(id: string) {
    await this.repo.delete(id);
    return { message: `Set with id ${id} deleted successfully` };
  }
}
