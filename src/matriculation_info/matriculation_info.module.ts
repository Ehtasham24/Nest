import { Module } from '@nestjs/common';
import { MatriculationInfoService } from './matriculation_info.service';
import { MatriculationInfoController } from './matriculation_info.controller';

@Module({
  controllers: [MatriculationInfoController],
  providers: [MatriculationInfoService],
})
export class MatriculationInfoModule {}
