import { Injectable } from '@nestjs/common';
import { guardians, Prisma, Steps } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GuardiansService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    guardiansInfo: Prisma.guardiansCreateInput,
    step: Steps,
  ) {
    return await this.prisma.$transaction([
      this.prisma.guardians.create({
        data: {
          ...guardiansInfo,
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
    return await this.prisma.guardians.findMany({
      orderBy: { student_id: 'asc' },
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} guardian`;
  }

  async update(id: number, updateGuardianDto: Prisma.guardiansUpdateInput) {
    return await this.prisma.guardians.update({
      where: { student_id: id },
      data: updateGuardianDto,
    });
  }

  async remove(id: number) {
    return await this.prisma.guardians.delete({
      where: { student_id: id },
    });
  }
}
