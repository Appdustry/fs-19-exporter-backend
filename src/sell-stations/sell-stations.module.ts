import { Module } from '@nestjs/common';
import { SellStationsService } from './sell-stations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellStation } from './entities/sell-station.entity';
import { Savegame } from '../savegames/entities/savegame.entity';
import { SellStationsController } from './sell-stations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([SellStation, Savegame])],
  providers: [SellStationsService],
  exports: [SellStationsService],
  controllers: [SellStationsController],
})
export class SellStationsModule {}
