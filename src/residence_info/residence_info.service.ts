import { Injectable } from '@nestjs/common';
import { Prisma, Steps } from '@prisma/client';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ResidenceInfoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    ResidenceInfo: Prisma.residence_informationCreateInput,
    step: Steps,
  ) {
    try {
      return await this.prisma.$transaction([
        this.prisma.residence_information.create({
          data: {
            ...ResidenceInfo,
            students: {
              connect: {
                student_id,
              },
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
      throw new Error(err);
    }
  }

  async findAll() {
    try {
      return await this.prisma.residence_information.findMany();
    } catch (err) {
      throw new Error(err);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} residenceInfo`;
  }

  update(
    id: number,
    updateResidenceInfoDto: Prisma.residence_informationUpdateInput,
  ) {
    return `This action updates a #${id} residenceInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} residenceInfo`;
  }
}
