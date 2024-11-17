// src/admissions/admissions.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Steps } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    student_id: number,
    data: Prisma.admissionsCreateInput,
    step: Steps,
  ) {
    return await this.prisma.$transaction([
      this.prisma.admissions.create({
        data: {
          ...data,
          students: {
            connect: { student_id },
          },
        },
      }),
      this.prisma.students.update({
        where: { student_id: student_id },
        data: { steps: step },
      }),
    ]);
  }

  async findAll() {
    return await this.prisma.admissions.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.admissions.findFirst({
      where: { student_id: id },
    });
  }

  async update(id: number, data: Prisma.admissionsUpdateInput) {
    return await this.prisma.admissions.update({
      where: { student_id: id },
      data,
    });
  }

  async remove(id: number) {
    return await this.prisma.admissions.delete({
      where: { student_id: id },
    });
  }
}
