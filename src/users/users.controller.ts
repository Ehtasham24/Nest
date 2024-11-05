import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  ParseIntPipe,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  findAll(@Query('role') role?: 'Intern' | 'Software Engineer' | 'Admin') {
    console.log(role);
    return this.userService.findAll(role);
  }

  @Get(':id')
  findWithId(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findWithId(id);
  }
  //   @Get('interns')
  //   findall() {
  //     return [`Interns within array`];
  //   }
  @Post()
  createUser(
    @Body(ValidationPipe)
    createUserDto: CreateUserDto,
  ) {
    return this.userService.createUser(createUserDto);
  }

  @Patch(':id')
  updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body(ValidationPipe)
    updateUserDto: UpdateUserDto,
  ) {
    return this.userService.updateUser(id, updateUserDto);
  }

  @Delete(':id')
  deleteUser(@Param('id') id: String) {
    return this.userService.deleteUser(+id);
  }
}
