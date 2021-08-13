import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FillType } from '../../fill-types/entities/fill-type.entity';
import { SellStation } from '../../sell-stations/entities/sell-station.entity';

@Entity()
export class Savegame {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  ownerId: string;

  @Column()
  description: string;

  @Column({ unique: true })
  inviteCode: string;

  @OneToMany(() => FillType, (fillType) => fillType.savegame, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  fillTypes: FillType[];

  @OneToMany(() => SellStation, (sellStation) => sellStation.savegame, {
    cascade: true,
    nullable: true,
    eager: true,
  })
  sellStations: SellStation[];
}
