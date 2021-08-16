import { Module } from '@nestjs/common';
import { SavegamesService } from './savegames.service';
import { SavegamesController } from './savegames.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Savegame } from './entities/savegame.entity';
import { FillTypesModule } from '../fill-types/fill-types.module';
import { SellStationsModule } from '../sell-stations/sell-stations.module';
import { CurrentPricesModule } from '../current-prices/current-prices.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Savegame]),
    FillTypesModule,
    SellStationsModule,
    CurrentPricesModule,
  ],
  controllers: [SavegamesController],
  providers: [SavegamesService],
})
export class SavegamesModule {}
