import { Card } from "src/cards/entities/card.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'set' })
export class Set {
  @PrimaryColumn({ name: 'id' })
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'series' })
  series: string;

  @Column({ name: 'printed_total', nullable: true })
  printedTotal: number;

  @Column({ name: 'total', nullable: true })
  total: number;

  @Column({ name: 'ptcgo_code', nullable: true })
  ptcgoCode: string;

  @Column({ name: 'release_date', type: 'date', nullable: true })
  releaseDate: Date;

  @Column({ name: 'updated_at', type: 'timestamptz', nullable: true })
  updatedAt: Date;

  @Column({ name: 'symbol_url', nullable: true })
  symbolUrl: string;

  @Column({ name: 'logo_url', nullable: true })
  logoUrl: string;

  @OneToMany(() => Card, (card) => card.set)
  cards: Card[];
}