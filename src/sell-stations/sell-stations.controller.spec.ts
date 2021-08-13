import { Test, TestingModule } from '@nestjs/testing';
import { SellStationsController } from './sell-stations.controller';

describe('SellStationsController', () => {
  let controller: SellStationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SellStationsController],
    }).compile();

    controller = module.get<SellStationsController>(SellStationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
