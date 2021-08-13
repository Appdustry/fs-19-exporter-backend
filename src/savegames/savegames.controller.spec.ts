import { Test, TestingModule } from '@nestjs/testing';
import { SavegamesController } from './savegames.controller';
import { SavegamesService } from './savegames.service';

describe('SavegamesController', () => {
  let controller: SavegamesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavegamesController],
      providers: [SavegamesService],
    }).compile();

    controller = module.get<SavegamesController>(SavegamesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
