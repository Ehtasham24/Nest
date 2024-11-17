import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async createStudentWithProfile(
    @Body() createStudentDto: Prisma.studentsCreateInput,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    try {
      const step = `step_1`;
      return await this.studentsService.createStudentWithProfile(
        createStudentDto,
        profileImage,
        step,
      );
    } catch (err) {
      console.log(err);
    }
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
  async getOneAllValue(@Param('id') id: string) {
    console.log(`getOneAllValue route hit`);
    return await this.studentsService.getOneAllValue(+id);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return await this.studentsService.findOne(+id);
  // }

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
