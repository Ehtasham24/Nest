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
  async create(@Body() data: Prisma.admissionsCreateInput) {
    return await this.admissionsService.create(data);
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
