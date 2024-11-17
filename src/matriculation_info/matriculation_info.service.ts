import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Steps } from '@prisma/client';

@Injectable()
export class MatriculationInfoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    student_id: number,
    matriculationData: Prisma.matriculation_infoCreateInput,
    step: Steps,
  ) {
    return await this.prisma.$transaction([
      this.prisma.matriculation_info.create({
        data: {
          ...matriculationData,
          students: {
            connect: { student_id }, // Correctly connect using the 'students' relation field
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
    return await this.prisma.matriculation_info.findMany({
      orderBy: {
        student_id: 'asc',
      },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} matriculationInfo`;
  }

  update(
    id: number,
    updateMatriculationInfoDto: Prisma.matriculation_infoUpdateInput,
  ) {
    return this.prisma.matriculation_info.update({
      where: { student_id: id },
      data: updateMatriculationInfoDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} matriculationInfo`;
  }
}
