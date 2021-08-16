import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Savegame } from '../savegames/entities/savegame.entity';
import { CreateFillTypeDto } from './dto/create-fill-type.dto';
import { FillType } from './entities/fill-type.entity';

@Injectable()
export class FillTypesService {
  constructor(
    @InjectRepository(FillType)
    private readonly repo: Repository<FillType>,

    @InjectRepository(Savegame)
    private readonly savegame: Repository<Savegame>,
  ) {}
  findForSavegame(savegameId: string) {
    return this.repo.find({ where: { savegameId: savegameId } });
  }

  async createOne(data: CreateFillTypeDto) {
    return this.repo.save(data);
  }

  async setForSavegame(savegameId: string, fillTypes: CreateFillTypeDto[]) {
    const savegame = await this.savegame.findOne(savegameId, {
      relations: ['fillTypes', 'fillTypes.priceHistory'],
    });
    if (!savegame) {
      throw new NotFoundException();
    }

    const existingTypes = savegame.fillTypes;
    for (const updatedType of fillTypes) {
      updatedType.savegameId = savegameId;
      let exists = existingTypes.find((type) => type.name === updatedType.name);
      if (!exists) {
        exists = await this.repo.save(updatedType);
      }
      // await this.setPriceHistoryForType(exists.id, updatedType.priceHistory);
    }

    return this.savegame.findOne(savegameId, { relations: ['fillTypes'] });
  }

  async setFillLevelForType(
    savegameId: string,
    fillTypeIndex: string,
    fillLevel: number,
  ) {
    const fillType = await this.repo.findOne({
      where: { fillTypeIndex, savegameId },
    });

    if (!fillType) {
      throw new NotFoundException();
    }

    fillType.currentLevel = fillLevel;
    return this.repo.save(fillType);
  }

  public async setLowAndHigh(savegameId: string, fillTypeIndex: number) {
    const fillType = await this.repo.findOne({
      where: { fillTypeIndex, savegameId },
    });
    const currentPrices = fillType.currentPrices;
    for (const currentPrice of currentPrices) {
      if (!fillType.priceHigh) {
        fillType.priceHigh = currentPrice.currentPrice;
      }
      if (!fillType.priceLow) {
        fillType.priceLow = currentPrice.currentPrice;
      }
      if (currentPrice.currentPrice > fillType.priceHigh) {
        fillType.priceHigh = currentPrice.currentPrice;
      } else if (currentPrice.currentPrice < fillType.priceLow) {
        fillType.priceLow = currentPrice.currentPrice;
      }
    }

    await this.repo.save(fillType);
  }
}
