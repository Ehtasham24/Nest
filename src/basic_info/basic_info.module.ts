import { Module } from '@nestjs/common';
import { BasicInfoService } from './basic_info.service';
import { BasicInfoController } from './basic_info.controller';

@Module({
  controllers: [BasicInfoController],
  providers: [BasicInfoService],
})
export class BasicInfoModule {}
