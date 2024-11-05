import { Injectable } from '@nestjs/common';
import { CreateBasicInfoDto } from './dto/create-basic_info.dto';
import { UpdateBasicInfoDto } from './dto/update-basic_info.dto';

@Injectable()
export class BasicInfoService {
  create(createBasicInfoDto: CreateBasicInfoDto) {
    return 'This action adds a new basicInfo';
  }

  findAll() {
    return `This action returns all basicInfo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} basicInfo`;
  }

  update(id: number, updateBasicInfoDto: UpdateBasicInfoDto) {
    return `This action updates a #${id} basicInfo`;
  }

  remove(id: number) {
    return `This action removes a #${id} basicInfo`;
  }
}
