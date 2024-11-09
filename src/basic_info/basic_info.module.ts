import { Module } from '@nestjs/common';
import { BasicInfoService } from './basic_info.service';
import { BasicInfoController } from './basic_info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [BasicInfoController],
  providers: [BasicInfoService, PrismaService],
})
export class BasicInfoModule {}
