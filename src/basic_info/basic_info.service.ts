import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class BasicInfoService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    basicInfo: Prisma.basic_informationCreateInput,
  ) {
    return await this.prisma.basic_information.create({
      data: {
        ...basicInfo,
        students: {
          connect: { student_id },
        },
      },
    });
  }

  async findAll() {
    return await this.prisma.basic_information.findMany({
      orderBy: {
        student_id: 'asc',
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.basic_information.findUnique({
      where: {
        student_id: id,
      },
    });
  }

  async update(
    id: number,
    updateBasicInfoDto: Prisma.basic_informationUpdateInput,
  ) {
    return await this.prisma.basic_information.update({
      where: { student_id: id },
      data: updateBasicInfoDto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} basicInfo`;
  }
}
