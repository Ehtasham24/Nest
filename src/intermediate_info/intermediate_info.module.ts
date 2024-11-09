import { Module } from '@nestjs/common';
import { IntermediateInfoService } from './intermediate_info.service';
import { IntermediateInfoController } from './intermediate_info.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [IntermediateInfoController],
  providers: [IntermediateInfoService, PrismaService],
})
export class IntermediateInfoModule {}
