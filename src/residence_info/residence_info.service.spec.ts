import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceInfoService } from './residence_info.service';

describe('ResidenceInfoService', () => {
  let service: ResidenceInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResidenceInfoService],
    }).compile();

    service = module.get<ResidenceInfoService>(ResidenceInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
