import { IsString, IsInt, IsEnum, IsNotEmpty } from 'class-validator';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsEnum(['Intern', 'Admin', 'Software Engineer'], {
    message:
      'Select a valid role from "Intern", "Admin" , "Software Engineer" ',
  })
  Designation: 'Intern' | 'Admin' | 'Software Engineer';
}
