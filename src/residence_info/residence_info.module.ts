import { Module } from '@nestjs/common';
import { ResidenceInfoService } from './residence_info.service';
import { ResidenceInfoController } from './residence_info.controller';

@Module({
  controllers: [ResidenceInfoController],
  providers: [ResidenceInfoService],
})
export class ResidenceInfoModule {}
