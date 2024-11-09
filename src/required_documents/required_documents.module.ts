import { Module } from '@nestjs/common';
import { RequiredDocumentsService } from './required_documents.service';
import { RequiredDocumentsController } from './required_documents.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaModule } from 'src/prisma/prisma.module';
import { FirebaseModule } from 'src/firebase/firebase.module';

@Module({
  imports: [PrismaModule],
  controllers: [RequiredDocumentsController],
  providers: [RequiredDocumentsService, FirebaseService],
})
export class RequiredDocumentsModule {}
