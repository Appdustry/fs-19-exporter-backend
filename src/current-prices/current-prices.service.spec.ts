import { Test, TestingModule } from '@nestjs/testing';
import { CurrentPricesService } from './current-prices.service';

describe('CurrentPricesService', () => {
  let service: CurrentPricesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrentPricesService],
    }).compile();

    service = module.get<CurrentPricesService>(CurrentPricesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
