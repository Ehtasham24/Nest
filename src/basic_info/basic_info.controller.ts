import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BasicInfoService } from './basic_info.service';
import { Prisma } from '@prisma/client';

@Controller('basic-info')
export class BasicInfoController {
  constructor(private readonly basicInfoService: BasicInfoService) {}

  @Post()
  create(
    @Body()
    createBasicInfoDto: Prisma.basic_informationCreateInput & {
      student_id: string;
    },
  ) {
    try {
      const step = 'step_3';
      const { student_id, ...basicInfo } = createBasicInfoDto;
      return this.basicInfoService.create(+student_id, basicInfo, step);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll() {
    return await this.basicInfoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.basicInfoService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBasicInfoDto: Prisma.basic_informationUpdateInput,
  ) {
    return await this.basicInfoService.update(+id, updateBasicInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicInfoService.remove(+id);
  }
}
