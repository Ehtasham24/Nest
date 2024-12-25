import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  dotenv.config();

  // Log all environment variables
  console.log('Environment Variables:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Allow this frontend origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials like cookies
  });

  const config = new DocumentBuilder()
    .setTitle(`ChatBot Api Docs`)
    .setDescription(`Detailed Docs for every Api for Enrollment proceudre`)
    .setVersion(`1.0.0`)
    .build();
  const docx = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, docx);

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
