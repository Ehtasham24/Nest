import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import {
  FilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { RequiredDocumentsService } from './required_documents.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { Prisma } from '@prisma/client';

@Controller('required-documents')
export class RequiredDocumentsController {
  constructor(
    private readonly requiredDocumentsService: RequiredDocumentsService,
  ) {}

  @Post('upload')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'nic_front', maxCount: 1 },
      { name: 'nic_back', maxCount: 1 },
      { name: 'matric_marksheet', maxCount: 1 },
      { name: 'intermediate_part2_marksheet', maxCount: 1 },
      { name: 'guardian_cnic', maxCount: 1 },
      { name: 'matric_certificate', maxCount: 1 },
      { name: 'intermediate_part1_marksheet', maxCount: 1 },
    ]),
  )
  async createDocumentWithFiles(
    @Body('student_id') student_id: string, // 'student_id' is a string by default
    @UploadedFiles()
    files: {
      nic_front?: Express.Multer.File[];
      nic_back?: Express.Multer.File[];
      matric_marksheet?: Express.Multer.File[];
      intermediate_part2_marksheet?: Express.Multer.File[];
      guardian_cnic?: Express.Multer.File[];
      matric_certificate?: Express.Multer.File[];
      intermediate_part1_marksheet?: Express.Multer.File[];
    },
  ) {
    // Cast 'student_id' to number
    const studentIdNumber = parseInt(student_id, 10); // Use parseInt to convert to a number
    const step = `step_8`;
    // Pass the converted student ID to the service
    return this.requiredDocumentsService.createDocumentWithFiles(
      studentIdNumber,
      files,
      step,
    );
  }

  @Get()
  findAll() {
    return this.requiredDocumentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.requiredDocumentsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateRequiredDocumentDto: Prisma.required_documentsUpdateInput,
  ) {
    return this.requiredDocumentsService.update(+id, updateRequiredDocumentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.requiredDocumentsService.remove(+id);
  }
}
