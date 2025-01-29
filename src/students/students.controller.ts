import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Prisma } from '@prisma/client';
import { FirebaseService } from '../firebase/firebase.service';

@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly firebaseService: FirebaseService,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('profileImage'))
  async createStudentWithProfile(
    @Body() createStudentDto: Prisma.studentsCreateInput,
    @UploadedFile() profileImage: Express.Multer.File,
  ) {
    try {
      // Log the student data (form data)
      console.log('Student Data:', createStudentDto);

      // Log the profile image file details
      if (profileImage) {
        console.log('Profile Image:', {
          name: profileImage.originalname,
          size: profileImage.size,
          mimeType: profileImage.mimetype,
        });
      } else {
        console.log('No profile image uploaded');
      }

      const step = 'step_1'; // You can replace this with a more descriptive step name
      // Call your service to create the student and save the profile image
      return await this.studentsService.createStudentWithProfile(
        createStudentDto,
        profileImage,
        step,
      );
    } catch (err) {
      // Log the error details
      console.error('Error creating student with profile image:', err);
      throw new Error('Failed to create student with profile image');
    }
  }

  @Patch('Status/:id')
  async statusUpdate(
    @Param('id') id: string,
    @Body() updateStudentDto: Prisma.studentsUpdateInput,
  ) {
    console.log(`====>statusUpdate route hit<====`);
    return await this.studentsService.statusUpdate(+id, updateStudentDto);
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

  // @Patch(':id')
  // @UseInterceptors(FileInterceptor('profileImage')) // Intercept file uploads under 'profileImage'
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateStudentDto: Prisma.studentsUpdateInput,
  //   @UploadedFile() file: Express.Multer.File, // Handles file uploads
  //   @Req() req: any, // Access raw request for form-data handling
  // ) {
  //   // Check if the request is `multipart/form-data`
  //   if (req.is('multipart/form-data')) {
  //     const formData = req.body;

  //     // Merge form-data fields into the DTO
  //     updateStudentDto = {
  //       ...formData,
  //       profileImage: file?.path || undefined, // Add file path if the file exists
  //     };

  //     console.log('FormData received:', formData);
  //   }

  //   console.log(
  //     `Patch route hit with data: ${JSON.stringify(updateStudentDto)}`,
  //   );
  //   console.log(`Uploaded file:`, file);

  //   return await this.studentsService.update(+id, updateStudentDto);
  // }
  @Patch(':id')
  @UseInterceptors(FileInterceptor('profileImage')) // Intercept file uploads
  async update(
    @Param('id') id: string,
    @Body() updateStudentDto: Prisma.studentsUpdateInput,
    @UploadedFile() file: Express.Multer.File, // Handles file uploads
    @Req() req: any, // Access raw request for form-data handling
  ) {
    let updatedDto: Prisma.studentsUpdateInput = { ...updateStudentDto };

    if (req.is('multipart/form-data') && file) {
      const existingStudent = await this.studentsService.findOne(+id);
      const oldImageUrl = existingStudent?.profile_photo;

      const newImageUrl = await this.firebaseService.uploadFile(file);

      updatedDto = {
        ...updateStudentDto,
        profile_photo: newImageUrl,
      };

      if (oldImageUrl) {
        await this.firebaseService.deleteFile(oldImageUrl);
      }
    }

    console.log(`Updating student with data: ${JSON.stringify(updatedDto)}`);

    return await this.studentsService.update(+id, updatedDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.studentsService.remove(+id);
  }
}
