import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Image } from './image.entity';
import { Market } from 'src/market/entities/market.entity';
import { Set } from 'src/set/entities/set.entity';

@Entity({ name: 'card' })
export class Card {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'supertype' })
  supertype: string;

  @Column({ name: 'subtypes', type: 'text', array: true })
  subtypes: string[];

  @Column({ name: 'types', type: 'text', array: true })
  types: string[];

  @Column({ name: 'set_id' })
  setId: string;

  @Column({ name: 'number' })
  number: string;

  @Column({ name: 'rarity', nullable: true })
  rarity: string;

  @ManyToOne(() => Set, (set) => set.cards)
  @JoinColumn({ name: 'set_id', referencedColumnName: 'id' })
  set: Set;

  @OneToMany(() => Image, (image) => image.card)
  images: Image[];

  @OneToMany(() => Market, (market) => market.card)
  markets: Market[];
}
