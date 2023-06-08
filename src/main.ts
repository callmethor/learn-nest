import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(logger);
  app.use(cors());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('API Document of the Learn Nest Project')
    .setDescription('learn-nest API document')
    .addTag('Learn Project API')
    .addSecurity('token', { type: 'http', scheme: 'bearer' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3003);
}
bootstrap();
