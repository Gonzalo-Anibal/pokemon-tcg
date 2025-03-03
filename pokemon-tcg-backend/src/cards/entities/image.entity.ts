import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Card } from './card.entity';

@Entity({ name: 'image' })
export class Image {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'card_id' })
  cardId: string;

  @Column({ name: 'url' })
  url: string;

  @Column({ name: 'type' })
  type: string;

  @ManyToOne(() => Card, (card) => card.images)
  @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
  card: Card;
}
