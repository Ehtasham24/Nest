import { Test, TestingModule } from '@nestjs/testing';
import { MatriculationInfoService } from './matriculation_info.service';

describe('MatriculationInfoService', () => {
  let service: MatriculationInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MatriculationInfoService],
    }).compile();

    service = module.get<MatriculationInfoService>(MatriculationInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
