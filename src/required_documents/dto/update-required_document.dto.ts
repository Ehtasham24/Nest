import { PartialType } from '@nestjs/mapped-types';
import { CreateRequiredDocumentDto } from './create-required_document.dto';

export class UpdateRequiredDocumentDto extends PartialType(CreateRequiredDocumentDto) {}
