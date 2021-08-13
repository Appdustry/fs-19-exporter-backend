import { Test, TestingModule } from '@nestjs/testing';
import { SellStationsService } from './sell-stations.service';

describe('SellStationsService', () => {
  let service: SellStationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SellStationsService],
    }).compile();

    service = module.get<SellStationsService>(SellStationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
