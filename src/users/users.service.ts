import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      name: 'Ali',
      Designation: 'Software Engineer',
      age: 24,
    },
    {
      id: 2,
      name: 'Hamza',
      Designation: 'Software Engineer',
      age: 22,
    },
    {
      id: 3,
      name: 'Zohaib',
      Designation: 'Intern',
      age: 24,
    },
    {
      id: 4,
      name: 'Maaz',
      Designation: 'Admin',
      age: 23,
    },
    {
      id: 5,
      name: 'Wasay',
      Designation: 'Intern',
      age: 23,
    },
    {
      id: 6,
      name: 'Wasif',
      Designation: 'Intern',
      age: 24,
    },
  ];

  findAll(role?: 'Intern' | 'Admin' | 'Software Engineer') {
    if (role) {
      const usersForDesiredRole = this.users.filter(
        (user) => user.Designation === role,
      );
      if (usersForDesiredRole.length === 0) {
        throw new NotFoundException(`User not found for the specified role`);
      }
      return usersForDesiredRole;
    }
    console.log(`Service`);
    return this.users;
  }

  findWithId(id: number) {
    const recordWithSpecifiedId = this.users.find((user) => user.id === id);
    if (!recordWithSpecifiedId) {
      throw new NotFoundException(`No record with id: ${id} found`);
    }
    return recordWithSpecifiedId;
  }

  createUser(createUserDto: CreateUserDto) {
    const calcIndex = [...this.users].sort((a, b) => b.id - a.id);
    const newUser = {
      id: calcIndex[0].id + 1,
      ...createUserDto,
    };
    this.users.push(newUser);
    return this.users;
  }

  updateUser(id: number, updateUserDto: UpdateUserDto) {
    const userTobePatched = this.users.find((user) => user.id === id);
    if (!userTobePatched) {
      return `no user with id ${userTobePatched.id} found`;
    }
    if (updateUserDto.name !== undefined) {
      userTobePatched.name = updateUserDto.name;
    }
    if (updateUserDto.age !== undefined) {
      userTobePatched.age = updateUserDto.age;
    }
    if (updateUserDto.Designation !== undefined) {
      userTobePatched.Designation = updateUserDto.Designation;
    }
    return `user with id ${id} successfully updated updated data: ${JSON.stringify(userTobePatched)}`;
  }

  deleteUser(id: number) {
    const index = this.users.findIndex((user) => user.id === id);
    if (index === -1) {
      return `No record with id ${id} found!`;
    }

    const deletedRecord = this.users.splice(index, 1);
    return `record with id ${id} deleted, deleted record: ${JSON.stringify(deletedRecord)}`;
  }
}
