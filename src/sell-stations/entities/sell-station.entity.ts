import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PriceHistory } from '../../price-histories/entities/price-history.entity';
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

  @OneToMany(() => PriceHistory, (history) => history.sellStationId)
  priceHistories?: PriceHistory[];
}
