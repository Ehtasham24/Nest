import { Test, TestingModule } from '@nestjs/testing';
import { MatriculationInfoController } from './matriculation_info.controller';
import { MatriculationInfoService } from './matriculation_info.service';

describe('MatriculationInfoController', () => {
  let controller: MatriculationInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatriculationInfoController],
      providers: [MatriculationInfoService],
    }).compile();

    controller = module.get<MatriculationInfoController>(MatriculationInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
