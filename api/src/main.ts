import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
<<<<<<< HEAD
import { HttpResponseFilter } from './guards/http-response.filter';
import { HttpResponseInterceptor } from './interceptors/http-response.interceptor';
import { ValidationPipe } from "@nestjs/common";
=======
import { ValidationPipe } from '@nestjs/common';
import { HttpResponseInterceptor } from './interceptors/http-reponse.interceptor';
>>>>>>> 754ce3d (Implement hTTP interceptors to standardize HTTP responses)

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
<<<<<<< HEAD
  app.useGlobalFilters(new HttpResponseFilter());
  app.useGlobalInterceptors(new HttpResponseInterceptor());

=======
  app.useGlobalInterceptors(new HttpResponseInterceptor()); // <-- Add this line
>>>>>>> 754ce3d (Implement hTTP interceptors to standardize HTTP responses)
  await app.listen(3000);
}
bootstrap();
