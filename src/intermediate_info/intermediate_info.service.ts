import { Injectable } from '@nestjs/common';
import { CreateIntermediateInfoDto } from './dto/create-intermediate_info.dto';
import { UpdateIntermediateInfoDto } from './dto/update-intermediate_info.dto';

@Injectable()
export class IntermediateInfoService {
  create(createIntermediateInfoDto: CreateIntermediateInfoDto) {
    return 'This action adds a new intermediateInfo';
  }

  findAll() {
    return `This action returns all intermediateInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} intermediateInfo`;
  }

  update(id: number, updateIntermediateInfoDto: UpdateIntermediateInfoDto) {
    return `This action updates a #${id} intermediateInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} intermediateInfo`;
  }
}
