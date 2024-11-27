import cookieParser from 'cookie-parser';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidatorPipe } from './common/validation.pipe';
import { HttpExceptions } from './common/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.useGlobalPipes(ValidatorPipe());

  app.enableCors({
    origin: 'http://localhost:3000',  // Frontend URL (adjust accordingly)
    credentials: true,  // Allow cookies and credentials to be sent
    methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
    allowedHeaders: 'Content-Type, Authorization',  // Allowed headers
  });

  app.use(cookieParser());
  app.setGlobalPrefix('api/v1');

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new HttpExceptions(httpAdapterHost));

  const config = new DocumentBuilder()
    .setTitle('Real Estate Application')
    .setDescription('Api for managing real estates')
    .setVersion('1.0')
    .setContact(
      'Adediji Abdulquadri',
      'https://abdulquadri-portfolio.vercel.app/',
      'adedijiabdulquadri@gmail.com',
    )
    .addTag('Real Estate')
    .addCookieAuth('__session')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/v1/api-docs', app, document, {
    explorer: true,
  });
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'), configService.get('HOST'));
  Logger.log(
    `Application is running with base url of localhost:${configService.get('PORT')}/api/v1`,
  );
}
bootstrap();
