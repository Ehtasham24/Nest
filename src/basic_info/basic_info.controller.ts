import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BasicInfoService } from './basic_info.service';
import { CreateBasicInfoDto } from './dto/create-basic_info.dto';
import { UpdateBasicInfoDto } from './dto/update-basic_info.dto';

@Controller('basic-info')
export class BasicInfoController {
  constructor(private readonly basicInfoService: BasicInfoService) {}

  @Post()
  create(@Body() createBasicInfoDto: CreateBasicInfoDto) {
    return this.basicInfoService.create(createBasicInfoDto);
  }

  @Get()
  findAll() {
    return this.basicInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basicInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBasicInfoDto: UpdateBasicInfoDto) {
    return this.basicInfoService.update(+id, updateBasicInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.basicInfoService.remove(+id);
  }
}
