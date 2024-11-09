import { Module } from '@nestjs/common';
import { ResidenceInfoService } from './residence_info.service';
import { ResidenceInfoController } from './residence_info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ResidenceInfoController],
  providers: [ResidenceInfoService, PrismaService],
})
export class ResidenceInfoModule {}
