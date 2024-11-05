import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentsService {
  constructor(private readonly prisma: PrismaService) {}
  async create(createStudentDto: Prisma.studentsCreateInput) {
    return await this.prisma.students.create({ data: createStudentDto });
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
    });
  }

  async update(id: number, updateStudentDto: Prisma.studentsUpdateInput) {
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
