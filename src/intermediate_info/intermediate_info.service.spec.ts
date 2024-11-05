import { Test, TestingModule } from '@nestjs/testing';
import { IntermediateInfoService } from './intermediate_info.service';

describe('IntermediateInfoService', () => {
  let service: IntermediateInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntermediateInfoService],
    }).compile();

    service = module.get<IntermediateInfoService>(IntermediateInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
