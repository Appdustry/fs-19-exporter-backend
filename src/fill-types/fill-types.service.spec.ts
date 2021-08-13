import { Test, TestingModule } from '@nestjs/testing';
import { FillTypesService } from './fill-types.service';

describe('FillTypesService', () => {
  let service: FillTypesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FillTypesService],
    }).compile();

    service = module.get<FillTypesService>(FillTypesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
