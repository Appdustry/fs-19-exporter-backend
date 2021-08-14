import { Module } from '@nestjs/common';
import { FillTypesService } from './fill-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FillType } from './entities/fill-type.entity';
import { SellStationsModule } from '../sell-stations/sell-stations.module';
import { Savegame } from '../savegames/entities/savegame.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FillType, Savegame]), SellStationsModule],
  providers: [FillTypesService],
  exports: [FillTypesService],
})
export class FillTypesModule {}
