import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FillType } from '../../fill-types/entities/fill-type.entity';
import { SellStation } from '../../sell-stations/entities/sell-station.entity';

@Entity()
export class CurrentPrice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('real')
  currentPrice: number;

  @Column()
  fillTypeId: string;

  @ManyToOne(() => FillType, (fillType) => fillType.currentPrices)
  @JoinColumn({ name: 'fillTypeId' })
  fillType: FillType;

  @Column()
  sellStationId: string;

  @ManyToOne(() => SellStation, (sellStation) => sellStation.currentPrices)
  @JoinColumn({ name: 'sellStationId' })
  sellStation: SellStation;
}
