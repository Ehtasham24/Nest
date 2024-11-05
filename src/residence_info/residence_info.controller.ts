import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ResidenceInfoService } from './residence_info.service';
import { CreateResidenceInfoDto } from './dto/create-residence_info.dto';
import { UpdateResidenceInfoDto } from './dto/update-residence_info.dto';

@Controller('residence-info')
export class ResidenceInfoController {
  constructor(private readonly residenceInfoService: ResidenceInfoService) {}

  @Post()
  create(@Body() createResidenceInfoDto: CreateResidenceInfoDto) {
    return this.residenceInfoService.create(createResidenceInfoDto);
  }

  @Get()
  findAll() {
    return this.residenceInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.residenceInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateResidenceInfoDto: UpdateResidenceInfoDto) {
    return this.residenceInfoService.update(+id, updateResidenceInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.residenceInfoService.remove(+id);
  }
}
