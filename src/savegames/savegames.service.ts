import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { CreateSavegameDto } from './dto/create-savegame.dto';
import { UpdateSavegameDto } from './dto/update-savegame.dto';
import { Savegame } from './entities/savegame.entity';

@Injectable()
export class SavegamesService {
  constructor(
    @InjectRepository(Savegame)
    private readonly repo: Repository<Savegame>,

    @Inject(REQUEST) private req: Request,
  ) {}

  async create(createSavegameDto: CreateSavegameDto) {
    const existingSavegames = await this.repo.find({ select: ['inviteCode'] });
    const inviteCodes = existingSavegames.map(
      (savegame) => savegame.inviteCode,
    );
    let inviteCode;
    try {
      inviteCode = this.generateInviteCode(inviteCodes);
    } catch (error) {
      throw new InternalServerErrorException('Internal Server Error', error);
    }

    const saveGame = await this.repo.create({
      ownerId: this.req.user,
      inviteCode,
      ...createSavegameDto,
    });

    const saved = await this.repo.save(saveGame);
    return this.repo.findOne(saved.id);
  }

  findOneByInviteCode(inviteCode: string) {
    return this.repo.find({ where: { inviteCode } });
  }

  findAll() {
    return this.repo.find({ where: { ownerId: this.req.user } });
  }

  findOne(id: string) {
    return this.repo.findOne(id);
  }

  update(id: number, updateSavegameDto: UpdateSavegameDto) {
    return `This action updates a #${id} savegame`;
  }

  remove(id: number) {
    return `This action removes a #${id} savegame`;
  }

  private generateInviteCode(existingCodes: string[]) {
    const acceptedChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
    let isUnique = false;
    let attempts = 0;
    let inviteCode;
    while (isUnique === false && attempts < 10) {
      attempts += 1;
      inviteCode = '';
      for (let i = 0; i < 6; i++) {
        inviteCode +=
          acceptedChars[Math.floor(Math.random() * (acceptedChars.length - 1))];
      }
      if (!existingCodes.find((existingCode) => existingCode === inviteCode)) {
        isUnique = true;
      }
    }
    if (!isUnique) {
      throw new Error(
        'Error could not create a unique invite code in 10 attempts',
      );
    }
    return inviteCode;
  }
}
