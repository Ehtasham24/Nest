// src/admissions/admissions.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { Prisma } from '@prisma/client';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Post()
  async create(
    @Body() data: Prisma.admissionsCreateInput & { student_id: string },
  ) {
    try {
      const steps = 'step_2';
      const { student_id, ...admissionsInfo } = data;
      return await this.admissionsService.create(
        +student_id,
        admissionsInfo,
        steps,
      );
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll() {
    return await this.admissionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.admissionsService.findOne(Number(id));
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: Prisma.admissionsUpdateInput,
  ) {
    return await this.admissionsService.update(Number(id), data);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.admissionsService.remove(Number(id));
  }
}
