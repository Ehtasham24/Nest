import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { IntermediateInfoService } from './intermediate_info.service';
import { Prisma } from '@prisma/client';

@Controller('intermediate-info')
export class IntermediateInfoController {
  constructor(
    private readonly intermediateInfoService: IntermediateInfoService,
  ) {}
  @Post()
  async create(
    @Body()
    createMatriculationInfoDto: Prisma.matriculation_infoCreateInput & {
      student_id: string;
    },
  ) {
    try {
      const step = 'step_7';
      const { student_id, ...intermediateInfo } = createMatriculationInfoDto;
      return this.intermediateInfoService.create(
        +student_id,
        intermediateInfo,
        step,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll() {
    return this.intermediateInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intermediateInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateIntermediateInfoDto: Prisma.intermediate_infoUpdateInput,
  ) {
    return this.intermediateInfoService.update(+id, updateIntermediateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intermediateInfoService.remove(+id);
  }
}
