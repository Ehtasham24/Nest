import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { GuardiansService } from './guardians.service';
import { Prisma } from '@prisma/client';

@Controller('guardians')
export class GuardiansController {
  constructor(private readonly guardiansService: GuardiansService) {}

  @Post()
  async create(
    @Body()
    createGuardianDto: Prisma.guardiansCreateInput & { student_id: string },
  ) {
    try {
      const { student_id, ...guardiansInfo } = createGuardianDto;
      return await this.guardiansService.create(+student_id, guardiansInfo);
    } catch (err) {
      throw new Error(err);
    }
  }

  @Get()
  async findAll() {
    return await this.guardiansService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.guardiansService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGuardianDto: Prisma.guardiansUpdateInput,
  ) {
    return await this.guardiansService.update(+id, updateGuardianDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardiansService.remove(+id);
  }
}
