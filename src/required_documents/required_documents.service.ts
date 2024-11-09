import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { FirebaseService } from 'src/firebase/firebase.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class RequiredDocumentsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly firebaseService: FirebaseService,
  ) {}

  async createDocumentWithFiles(
    student_id: number,
    files: {
      nic_front?: Express.Multer.File[];
      nic_back?: Express.Multer.File[];
      matric_marksheet?: Express.Multer.File[];
      intermediate_part2_marksheet?: Express.Multer.File[];
      guardian_cnic?: Express.Multer.File[];
      matric_certificate?: Express.Multer.File[];
      intermediate_part1_marksheet?: Express.Multer.File[];
    },
  ) {
    try {
      // Prepare an object to store file URLs based on the field name
      const fileUrls: { [key: string]: string } = {};

      // Iterate over the files object, process each field if there are files
      for (const fieldName in files) {
        const fileGroup = files[fieldName]; // This is an array of files

        // Only proceed if there are files for this field
        if (fileGroup && fileGroup.length > 0) {
          // Upload each file in the group
          for (const file of fileGroup) {
            const fileUrl = await this.firebaseService.uploadFile(file);
            fileUrls[fieldName] = fileUrl; // Store the first file URL for the field
            break; // Break after storing the first file URL for this field (assuming only one file per field)
          }
        }
      }

      // Store the document data with the file URLs in the Prisma database
      return await this.prisma.required_documents.create({
        data: {
          student_id,
          ...fileUrls,
        },
      });
    } catch (err) {
      console.error('Error in createDocumentWithFiles:', err);
      throw new BadRequestException(
        `File upload failed: ${err.message || 'Unexpected error'}`,
      );
    }
  }

  findAll() {
    return `This action returns all requiredDocuments`;
  }

  findOne(id: number) {
    return `This action returns a #${id} requiredDocument`;
  }

  update(
    id: number,
    updateRequiredDocumentDto: Prisma.required_documentsUpdateInput,
  ) {
    return `This action updates a #${id} requiredDocument`;
  }

  remove(id: number) {
    return `This action removes a #${id} requiredDocument`;
  }
}
