import { Test, TestingModule } from '@nestjs/testing';
import { RequiredDocumentsController } from './required_documents.controller';
import { RequiredDocumentsService } from './required_documents.service';

describe('RequiredDocumentsController', () => {
  let controller: RequiredDocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RequiredDocumentsController],
      providers: [RequiredDocumentsService],
    }).compile();

    controller = module.get<RequiredDocumentsController>(RequiredDocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
