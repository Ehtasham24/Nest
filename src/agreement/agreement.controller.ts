import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AgreementService } from './agreement.service';
import { CreateAgreementDto } from './dto/create-agreement.dto';
import { UpdateAgreementDto } from './dto/update-agreement.dto';
import { Prisma } from '@prisma/client';

@Controller('agreement')
export class AgreementController {
  constructor(private readonly agreementService: AgreementService) {}

  @Post()
  create(
    @Body()
    createAgreementDto: Prisma.agreementCreateInput & { student_id: string },
  ) {
    try {
      const step = 'step_9';
      const { student_id, ...agreement } = createAgreementDto;
      return this.agreementService.create(+student_id, agreement, step);
    } catch (err) {
      console.error('Error creating agreement:', err);
      throw new Error('Failed to create agreement');
    }
  }
  @Get()
  findAll() {
    return this.agreementService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.agreementService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateAgreementDto: UpdateAgreementDto,
  ) {
    return this.agreementService.update(+id, updateAgreementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.agreementService.remove(+id);
  }
}
