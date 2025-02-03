import { Injectable } from '@nestjs/common';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { Prisma, Steps } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AgreementService {
  constructor(private readonly prisma: PrismaService) {}
  async create(
    student_id: number,
    agreementInfo: Prisma.agreementCreateInput,
    step: Steps,
  ) {
    return await this.prisma.$transaction([
      this.prisma.agreement.create({
        data: { ...agreementInfo, students: { connect: { student_id } } },
      }),
      this.prisma.students.update({
        where: { student_id: student_id },
        data: { steps: step },
      }),
    ]);
  }

  findAll() {
    return `This action returns all agreement`;
  }

  findOne(id: number) {
    return `This action returns a #${id} agreement`;
  }

  update(id: number, updateAgreementDto: UpdateAgreementDto) {
    return `This action updates a #${id} agreement`;
  }

  remove(id: number) {
    return `This action removes a #${id} agreement`;
  }
}
