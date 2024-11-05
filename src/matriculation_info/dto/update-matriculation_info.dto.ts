import { PartialType } from '@nestjs/mapped-types';
import { CreateMatriculationInfoDto } from './create-matriculation_info.dto';

export class UpdateMatriculationInfoDto extends PartialType(CreateMatriculationInfoDto) {}
