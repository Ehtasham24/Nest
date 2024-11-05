import { Test, TestingModule } from '@nestjs/testing';
import { ResidenceInfoController } from './residence_info.controller';
import { ResidenceInfoService } from './residence_info.service';

describe('ResidenceInfoController', () => {
  let controller: ResidenceInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ResidenceInfoController],
      providers: [ResidenceInfoService],
    }).compile();

    controller = module.get<ResidenceInfoController>(ResidenceInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
