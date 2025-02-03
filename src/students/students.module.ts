import { Module } from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentsController } from './students.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseService } from 'src/firebase/firebase.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [PrismaModule, HttpModule],
  controllers: [StudentsController],
  providers: [StudentsService, FirebaseService],
})
export class StudentsModule {}
