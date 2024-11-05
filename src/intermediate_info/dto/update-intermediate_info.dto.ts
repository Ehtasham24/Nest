import { PartialType } from '@nestjs/mapped-types';
import { CreateIntermediateInfoDto } from './create-intermediate_info.dto';

export class UpdateIntermediateInfoDto extends PartialType(CreateIntermediateInfoDto) {}
