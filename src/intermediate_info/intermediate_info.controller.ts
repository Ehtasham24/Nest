import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { IntermediateInfoService } from './intermediate_info.service';
import { CreateIntermediateInfoDto } from './dto/create-intermediate_info.dto';
import { UpdateIntermediateInfoDto } from './dto/update-intermediate_info.dto';

@Controller('intermediate-info')
export class IntermediateInfoController {
  constructor(private readonly intermediateInfoService: IntermediateInfoService) {}

  @Post()
  create(@Body() createIntermediateInfoDto: CreateIntermediateInfoDto) {
    return this.intermediateInfoService.create(createIntermediateInfoDto);
  }

  @Get()
  findAll() {
    return this.intermediateInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.intermediateInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIntermediateInfoDto: UpdateIntermediateInfoDto) {
    return this.intermediateInfoService.update(+id, updateIntermediateInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.intermediateInfoService.remove(+id);
  }
}
