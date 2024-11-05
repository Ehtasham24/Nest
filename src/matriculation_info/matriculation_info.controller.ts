import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MatriculationInfoService } from './matriculation_info.service';
import { CreateMatriculationInfoDto } from './dto/create-matriculation_info.dto';
import { UpdateMatriculationInfoDto } from './dto/update-matriculation_info.dto';

@Controller('matriculation-info')
export class MatriculationInfoController {
  constructor(private readonly matriculationInfoService: MatriculationInfoService) {}

  @Post()
  create(@Body() createMatriculationInfoDto: CreateMatriculationInfoDto) {
    return this.matriculationInfoService.create(createMatriculationInfoDto);
  }

  @Get()
  findAll() {
    return this.matriculationInfoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.matriculationInfoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateMatriculationInfoDto: UpdateMatriculationInfoDto) {
    return this.matriculationInfoService.update(+id, updateMatriculationInfoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.matriculationInfoService.remove(+id);
  }
}
