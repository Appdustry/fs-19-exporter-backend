import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceHistory } from '../../price-histories/entities/price-history.entity';
import { Savegame } from '../../savegames/entities/savegame.entity';

@Entity()
export class FillType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  savegameId: string;

  @Column('int')
  fillTypeIndex: number;

  @Column('real')
  basePrice: number;

  @Column('real')
  mass: number;

  @Column()
  name: string;

  @Column()
  displayName: string;

  @Column('real', { nullable: true })
  priceHigh?: number;

  @Column('real', { nullable: true })
  priceLow?: number;

  @Column('int', { default: 0 })
  currentLevel: number;

  @ManyToOne(() => Savegame, (savegame) => savegame.fillTypes)
  @JoinColumn({ name: 'savegameId' })
  savegame: Savegame;

  @OneToMany(() => PriceHistory, (history) => history.fillType, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  priceHistory?: PriceHistory[];
}
