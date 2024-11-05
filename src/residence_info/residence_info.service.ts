import { Injectable } from '@nestjs/common';
import { CreateResidenceInfoDto } from './dto/create-residence_info.dto';
import { UpdateResidenceInfoDto } from './dto/update-residence_info.dto';

@Injectable()
export class ResidenceInfoService {
  create(createResidenceInfoDto: CreateResidenceInfoDto) {
    return 'This action adds a new residenceInfo';
  }

  findAll() {
    return `This action returns all residenceInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} residenceInfo`;
  }

  update(id: number, updateResidenceInfoDto: UpdateResidenceInfoDto) {
    return `This action updates a #${id} residenceInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} residenceInfo`;
  }
}
