import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrentPrice } from '../../current-prices/entities/current-price.entity';
import { Savegame } from '../../savegames/entities/savegame.entity';

@Entity()
export class SellStation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  savegameId: string;

  @ManyToOne(() => Savegame, (savegame) => savegame.sellStations)
  savegame?: Savegame;

  @OneToMany(() => CurrentPrice, (currentPrice) => currentPrice.sellStation)
  currentPrices?: CurrentPrice[];
}
