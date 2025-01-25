import { Injectable } from '@nestjs/common';
import { Prisma, Steps } from '@prisma/client';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(
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
      },
    });
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

  async remove(id: number) {
    return await this.prisma.students.delete({
      where: { student_id: id },
    });
  }
}
