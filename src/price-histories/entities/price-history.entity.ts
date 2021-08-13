import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FillType } from '../../fill-types/entities/fill-type.entity';
import { SellStation } from '../../sell-stations/entities/sell-station.entity';

@Entity({ orderBy: { createdAt: 'DESC' } })
export class PriceHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fillTypeId: string;

  @Column('real')
  price: number;

  @Column()
  sellStationId: string;

  @Column('int')
  day: number;

  @Column('int')
  time: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => FillType, (filltype) => filltype.priceHistory)
  @JoinColumn({ name: 'fillTypeId' })
  fillType?: FillType;

  @ManyToOne(() => SellStation, (sellSation) => sellSation.priceHistories)
  @JoinColumn({ name: 'sellStationId' })
  sellStation?: SellStation;
}
