import { Test, TestingModule } from '@nestjs/testing';
import { IntermediateInfoController } from './intermediate_info.controller';
import { IntermediateInfoService } from './intermediate_info.service';

describe('IntermediateInfoController', () => {
  let controller: IntermediateInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IntermediateInfoController],
      providers: [IntermediateInfoService],
    }).compile();

    controller = module.get<IntermediateInfoController>(IntermediateInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
