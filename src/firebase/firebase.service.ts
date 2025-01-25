import { Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class FirebaseService {
  constructor() {
    // Correctly resolve the path to the serviceAccountKey.json file
    const serviceAccountPath = path.resolve(
      __dirname,
      '..',
      '..',
      'src',
      'config',
      'serviceAccountKey.json',
    );
    console.log('Resolved service account path:', serviceAccountPath);
    if (!admin.apps.length) {
      // Initialize Firebase with the service account credentials
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccountPath),
        storageBucket: 'test-6ec33.appspot.com',
      });
    }
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const bucket = admin.storage().bucket(); // Access the storage bucket
    const uniqueFileName = `${uuidv4()}-${file.originalname}`; // Unique name for the file
    const fileUpload = bucket.file(uniqueFileName);

    // Save the file to Firebase Storage
    await fileUpload.save(file.buffer, {
      metadata: { contentType: file.mimetype },
    });

    // Make the file publicly accessible and return the URL
    await fileUpload.makePublic();
    return `https://storage.googleapis.com/${bucket.name}/${uniqueFileName}`;
  }
  async deleteFile(fileUrl: string): Promise<void> {
    try {
      const bucket = admin.storage().bucket(); // Access the storage bucket

      // Extract file path from the provided URL
      const filePath = fileUrl.split('/o/')[1].split('?')[0]; // Extract path after "/o/" and remove query params
      const decodedFilePath = decodeURIComponent(filePath); // Decode the file path

      // Delete the file from Firebase Storage
      await bucket.file(decodedFilePath).delete();
      console.log(`Successfully deleted file: ${decodedFilePath}`);
    } catch (error) {
      console.error(
        'Error deleting file from Firebase:',
        error.message || error,
      );
    }
  }
}
