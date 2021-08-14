import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FillType } from '../fill-types/entities/fill-type.entity';
import { SetCurrentPriceDto } from './dto/set-current-price.dto';
import { CurrentPrice } from './entities/current-price.entity';

@Injectable()
export class CurrentPricesService {
  constructor(
    @InjectRepository(CurrentPrice)
    private readonly repo: Repository<CurrentPrice>,

    @InjectRepository(FillType)
    private readonly fillType: Repository<FillType>,
  ) {}

  async setCurrentPriceForType(
    savegameId: string,
    fillTypeIndex: string,
    data: SetCurrentPriceDto,
  ) {
    const fillType = await this.fillType.findOne({
      where: { savegameId, fillTypeIndex },
    });

    if (!fillType) {
      throw new NotFoundException(
        'Not Found',
        'Could not find filltype with provided index',
      );
    }

    let currentPrice = await this.repo.findOne({
      where: { fillTypeId: fillType.id, sellStationId: data.sellStationId },
    });

    if (!currentPrice) {
      currentPrice = this.repo.create({
        fillTypeId: fillType.id,
        ...data,
      });
    } else {
      currentPrice.currentPrice = data.currentPrice;
    }

    return await this.repo.save(currentPrice);
  }
}
