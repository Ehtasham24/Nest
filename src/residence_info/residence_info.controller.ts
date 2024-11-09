import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResidenceInfoService } from './residence_info.service';
import { Prisma } from '@prisma/client';

@Controller('residence-info')
export class ResidenceInfoController {
  constructor(private readonly residenceInfoService: ResidenceInfoService) {}

  @Post()
  async create(
    @Body()
    createResidenceInfoDto: Prisma.residence_informationCreateInput & {
      student_id: string;
    },
  ) {
    try {
      const { student_id, ...residenceInfo } = createResidenceInfoDto;
      return await this.residenceInfoService.create(+student_id, residenceInfo);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll() {
    return await this.residenceInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residenceInfoService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateResidenceInfoDto: Prisma.residence_informationUpdateInput,
  ) {
    return this.residenceInfoService.update(+id, updateResidenceInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residenceInfoService.remove(+id);
  }
}
