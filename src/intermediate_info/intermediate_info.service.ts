import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma, Steps } from '@prisma/client';
@Injectable()
export class IntermediateInfoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    intermediateInfo: Prisma.matriculation_infoCreateInput,
    step: Steps,
  ) {
    try {
      return await this.prisma.$transaction([
        this.prisma.intermediate_info.create({
          data: {
            ...intermediateInfo,
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
    } catch (err) {
      console.log(err);
      return err;
    }
  }

  async findAll() {
    try {
      return this.prisma.intermediate_info.findMany();
    } catch (err) {
      console.log(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} intermediateInfo`;
  }

  update(
    id: number,
    updateIntermediateInfoDto: Prisma.intermediate_infoUpdateInput,
  ) {
    return this.prisma.intermediate_info.update({
      where: { student_id: id },
      data: updateIntermediateInfoDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} intermediateInfo`;
  }
}
