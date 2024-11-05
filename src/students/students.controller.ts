import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() createStudentDto: Prisma.studentsCreateInput) {
    return await this.studentsService.create(createStudentDto);
  }

  @Get()
  async findAll() {
    return await this.studentsService.findAll();
  }

  @Get('All')
  async getAllTablesValues() {
    console.log(`------>correct route hit<-----------s`);
    return await this.studentsService.getAllTablesValues();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.studentsService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: Prisma.studentsUpdateInput,
  ) {
    return await this.studentsService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(+id);
  }
}
