import { Card } from 'src/cards/entities/card.entity';
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

@Entity({ name: 'market' })
export class Market {
    @PrimaryGeneratedColumn({ name: 'id' })
    id: number;

    @Column({ name: 'card_id' })
    cardId: string;

    @Column({ name: 'url' })
    url: string;

    @Column({ name: 'updated_at', type: 'date' })
    updatedAt: Date;

    @Column({ name: 'market' })
    market: string;

    @ManyToOne(() => Card, (card) => card.markets)
    @JoinColumn({ name: 'card_id', referencedColumnName: 'id' })
    card: Card;
}
