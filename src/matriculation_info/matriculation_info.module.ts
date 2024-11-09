import { Module } from '@nestjs/common';
import { MatriculationInfoService } from './matriculation_info.service';
import { MatriculationInfoController } from './matriculation_info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [MatriculationInfoController],
  providers: [MatriculationInfoService, PrismaService],
})
export class MatriculationInfoModule {}
