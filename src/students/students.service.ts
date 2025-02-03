import {
  Injectable,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Steps, Status } from '@prisma/client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class StudentsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}
  // async create(createStudentDto: Prisma.studentsCreateInput) {
  //   return await this.prisma.students.create({ data: createStudentDto });
  // }
  async createStudentWithProfile(
    studentData: Prisma.studentsCreateInput,
    profileImage: Express.Multer.File,
    step: Steps,
  ): Promise<any> {
    // 1. Upload the image to Firebase and get the URL
    const profilePhotoUrl = await this.firebaseService.uploadFile(profileImage);

    // 2. Add the profile photo URL to the student data
    const studentDataWithPhoto = {
      ...studentData,
      profile_photo: profilePhotoUrl, // Ensure this field matches your Prisma schema
      steps: step,
    };

    // 3. Save the student data with the profile photo URL to the database
    const createdStudent = await this.prisma.students.create({
      data: studentDataWithPhoto,
    });

    // 4. Return the newly created student record, including the profile photo URL
    console.log(createdStudent);
    return createdStudent;
  }

  async findAll() {
    return await this.prisma.students.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.students.findUnique({
      where: { student_id: id },
    });
  }
  async getAllTablesValues() {
    return await this.prisma.students.findMany({
      include: {
        basic_information: true,
        guardians: true,
        residence_information: true,
        admissions: true,
        matriculation_info: true,
        intermediate_info: true,
      },
      orderBy: {
        student_id: 'asc',
      },
    });
  }

  async getOneAllValue(id) {
    return await this.prisma.students.findUnique({
      where: { student_id: id },
      include: {
        basic_information: true,
        guardians: true,
        residence_information: true,
        admissions: true,
        matriculation_info: true,
        intermediate_info: true,
        required_documents: true,
        agreement: true,
      },
    });
  }

  async updateStudentScore(id: number): Promise<any> {
    // Call the Flask API to get the overall score
    const flaskApiUrl = 'http://your-flask-api-url/endpoint'; // Replace with actual URL
    try {
      const response$ = this.httpService.get(flaskApiUrl);
      const response = await lastValueFrom(response$);
      const overallScore: number = response.data.overall_score;

      const updatedStudent = await this.prisma.students.update({
        where: { student_id: id },
        data: { test_score: overallScore },
      });

      return updatedStudent;
    } catch (error) {
      // You can improve error handling based on your requirements
      throw new HttpException(
        'Failed to update student score',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateStudentDto: Prisma.studentsUpdateInput) {
    console.log(
      `ID: ${id}, Updating student with data: ${JSON.stringify(updateStudentDto)}`,
    );
    console.log('Update DTO:', updateStudentDto);

    // Ensure the data is valid and mapped correctly for Prisma
    return await this.prisma.students.update({
      where: { student_id: id },
      data: updateStudentDto,
    });
  }

  async statusUpdate(id: number, updateStudentDto: Prisma.studentsUpdateInput) {
    // Existing validation from previous implementation
    const validKeys = ['status'];
    const invalidKeys = Object.keys(updateStudentDto).filter(
      (key) => !validKeys.includes(key),
    );

    if (invalidKeys.length > 0) {
      throw new BadRequestException(
        `Invalid fields detected: ${invalidKeys.join(', ')}. Only 'status' can be updated.`,
      );
    }

    if (
      !updateStudentDto.status ||
      !Object.values(Status).includes(updateStudentDto.status as Status)
    ) {
      throw new BadRequestException(
        `Invalid status value. Allowed values: ${Object.values(Status).join(', ')}`,
      );
    }

    // New: Check if trying to set to "Accepted"
    if (updateStudentDto.status === Status.approved) {
      // Get current student data
      const student = await this.prisma.students.findUnique({
        where: { student_id: id },
        select: { steps: true },
      });

      if (!student) {
        throw new NotFoundException(`Student with ID ${id} not found`);
      }

      // Check if steps is not Step_8
      if (student.steps !== Steps.step_8) {
        throw new BadRequestException(
          `Cannot accept student at step ${student.steps}. Student must complete all 8 steps first.`,
        );
      }
    }

    // Proceed with update
    return await this.prisma.students.update({
      where: { student_id: id },
      data: {
        status: updateStudentDto.status as Status,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.students.delete({
      where: { student_id: id },
    });
  }
}
