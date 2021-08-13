import { Module } from '@nestjs/common';
import { FillTypesService } from './fill-types.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FillType } from './entities/fill-type.entity';
import { SellStationsModule } from '../sell-stations/sell-stations.module';
import { Savegame } from '../savegames/entities/savegame.entity';
import { PriceHistory } from '../price-histories/entities/price-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FillType, Savegame, PriceHistory]),
    SellStationsModule,
  ],
  providers: [FillTypesService],
  exports: [FillTypesService],
})
export class FillTypesModule {}
