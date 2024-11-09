import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { connect } from 'http2';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class ResidenceInfoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    ResidenceInfo: Prisma.residence_informationCreateInput,
  ) {
    try {
      return await this.prisma.residence_information.create({
        data: {
          ...ResidenceInfo,
          students: {
            connect: {
              student_id,
            },
          },
        },
      });
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
