import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';
import { EmployeeModule } from './employee/employee.module';

import { StudentsModule } from './students/students.module';
import { GuardiansModule } from './guardians/guardians.module';
import { IntermediateInfoModule } from './intermediate_info/intermediate_info.module';
import { MatriculationInfoModule } from './matriculation_info/matriculation_info.module';
import { ResidenceInfoModule } from './residence_info/residence_info.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { BasicInfoModule } from './basic_info/basic_info.module';

import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { RequiredDocumentsModule } from './required_documents/required_documents.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    UsersModule,
    DatabaseModule,
    EmployeeModule,
    StudentsModule,
    GuardiansModule,
    IntermediateInfoModule,
    MatriculationInfoModule,
    ResidenceInfoModule,
    AdmissionsModule,
    BasicInfoModule,
    PrismaModule,
    RequiredDocumentsModule,
    FirebaseModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
