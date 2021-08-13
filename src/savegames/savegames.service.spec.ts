import { Test, TestingModule } from '@nestjs/testing';
import { SavegamesService } from './savegames.service';

describe('SavegamesService', () => {
  let service: SavegamesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavegamesService],
    }).compile();

    service = module.get<SavegamesService>(SavegamesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
