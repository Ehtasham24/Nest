import { PartialType } from '@nestjs/mapped-types';
import { CreateResidenceInfoDto } from './create-residence_info.dto';

export class UpdateResidenceInfoDto extends PartialType(CreateResidenceInfoDto) {}
