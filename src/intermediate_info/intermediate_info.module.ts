import { Module } from '@nestjs/common';
import { IntermediateInfoService } from './intermediate_info.service';
import { IntermediateInfoController } from './intermediate_info.controller';

@Module({
  controllers: [IntermediateInfoController],
  providers: [IntermediateInfoService],
})
export class IntermediateInfoModule {}
