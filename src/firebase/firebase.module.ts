import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global() // Makes this module globally available
@Module({
  providers: [FirebaseService],
  exports: [FirebaseService], // Export to make it accessible in other modules
})
export class FirebaseModule {}
