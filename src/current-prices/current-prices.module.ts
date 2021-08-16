import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FillType } from '../fill-types/entities/fill-type.entity';
import { Savegame } from '../savegames/entities/savegame.entity';
import { CurrentPricesService } from './current-prices.service';
import { CurrentPrice } from './entities/current-price.entity';

@Module({
  providers: [CurrentPricesService],
  imports: [TypeOrmModule.forFeature([FillType, CurrentPrice, Savegame])],
  exports: [CurrentPricesService],
})
export class CurrentPricesModule {}
