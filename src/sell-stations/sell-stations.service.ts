import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Savegame } from '../savegames/entities/savegame.entity';
import { CreateSellStationDto } from './dto/create-sell-station.dto';
import { SellStation } from './entities/sell-station.entity';

@Injectable()
export class SellStationsService {
  constructor(
    @InjectRepository(SellStation)
    private readonly repo: Repository<SellStation>,

    @InjectRepository(Savegame)
    private readonly savegame: Repository<Savegame>,
  ) {}

  findForSavegame(savegameId: string) {
    return this.repo.find({ where: { savegameId } });
  }

  async setForSavegame(
    savegameId: string,
    sellStations: CreateSellStationDto[],
  ) {
    const savegame = await this.savegame.findOne(savegameId, {
      relations: ['fillTypes'],
    });
    if (!savegame) {
      throw new NotFoundException();
    }
    const createdTypes = this.repo.create(sellStations);
    savegame.sellStations = createdTypes;

    return this.savegame.save(savegame);
  }

  async createOne(sellStation: CreateSellStationDto) {
    return this.repo.save(sellStation);
  }
}
