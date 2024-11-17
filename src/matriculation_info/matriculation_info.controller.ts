import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatriculationInfoService } from './matriculation_info.service';
import { Prisma } from '@prisma/client';

@Controller('matriculation-info')
export class MatriculationInfoController {
  constructor(
    private readonly matriculationInfoService: MatriculationInfoService,
  ) {}

  @Post()
  async create(
    @Body()
    createMatriculationInfoDto: Prisma.matriculation_infoCreateInput & {
      student_id: string;
    },
  ) {
    const step = 'step_6';
    const { student_id, ...matriculationData } = createMatriculationInfoDto;
    return this.matriculationInfoService.create(
      +student_id,
      matriculationData,
      step,
    );
  }

  @Get()
  async findAll() {
    return this.matriculationInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculationInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMatriculationInfoDto: Prisma.matriculation_infoUpdateInput,
  ) {
    return this.matriculationInfoService.update(
      +id,
      updateMatriculationInfoDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculationInfoService.remove(+id);
  }
}
