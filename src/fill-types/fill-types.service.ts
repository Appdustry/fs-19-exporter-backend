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

  // private async setPriceHistoryForType(
  //   typeId: string,
  //   priceHistory: CreatePriceHistoryDto[],
  // ) {
  //   const type = await this.repo.findOne(typeId, {
  //     relations: ['priceHistory'],
  //   });
  //   if (!type) {
  //     return;
  //   }
  //   const newEntries: CreatePriceHistoryDto[] = [];
  //   for (const createHistory of priceHistory) {
  //     if (
  //       !type.priceHistory.find(
  //         (exisiting) =>
  //           exisiting.day === createHistory.day &&
  //           exisiting.time === createHistory.time,
  //       )
  //     ) {
  //       newEntries.push(createHistory);
  //     }
  //   }
  //   newEntries.sort((a, b) => {
  //     if (a.day - b.day !== 0) {
  //       return a.day - b.day;
  //     }
  //     return a.time - b.time;
  //   });
  //   await this.priceHistory.save(newEntries);
  // }

  // public async pushPricesForType(
  //   savegameId: string,
  //   fillTypeIndex: string,
  //   priceData: CreatePriceHistoryDto[],
  // ) {
  //   const fillType = await this.repo.findOne({
  //     where: { savegameId, fillTypeIndex },
  //   });
  //   if (!fillType) {
  //     throw new NotFoundException();
  //   }

  //   let lowOrHighChange = false;
  //   let low = fillType.priceLow;
  //   let high = fillType.priceHigh;

  //   fillType.currentPrices = [];

  //   for (const price of priceData) {
  //     if (price.price < low) {
  //       low = price.price;
  //       lowOrHighChange = true;
  //     } else if (price.price > high) {
  //       high = price.price;
  //       lowOrHighChange = true;
  //     }
  //     fillType.priceHistory.push(
  //       await this.priceHistory.save({
  //         fillTypeId: fillType.id,
  //         ...price,
  //       }),
  //     );
  //   }

  //   if (lowOrHighChange) {
  //     await this.repo.save({ id: fillType.id, priceHigh: high, priceLow: low });
  //   }

  //   return fillType.priceHistory;
  // }
}
