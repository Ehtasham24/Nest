import { Injectable } from '@nestjs/common';
import { CreateMatriculationInfoDto } from './dto/create-matriculation_info.dto';
import { UpdateMatriculationInfoDto } from './dto/update-matriculation_info.dto';

@Injectable()
export class MatriculationInfoService {
  create(createMatriculationInfoDto: CreateMatriculationInfoDto) {
    return 'This action adds a new matriculationInfo';
  }

  findAll() {
    return `This action returns all matriculationInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} matriculationInfo`;
  }

  update(id: number, updateMatriculationInfoDto: UpdateMatriculationInfoDto) {
    return `This action updates a #${id} matriculationInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} matriculationInfo`;
  }
}
