import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import 'dotenv/config';
import { logger } from './middleware/logger.middleware';
import { ValidationPipe } from './pipe/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { E_TOO_MANY_REQUESTS } from './common/exceptions/exceptions';

async function bootstrap() {
  // -- App Instantiation
  const app = await NestFactory.create(AppModule);

  // -- Helmet
  app.use(helmet());

  // -- Validation
  app.useGlobalPipes(new ValidationPipe());
  app.use(logger);

  // -- Cors setup
  app.use(cors());
  app.enableCors({
    origin: false,
  });

  // -- Rate limiting: Limits the number of requests from the same IP in a period of time.
  // -- More at: https://www.npmjs.com/package/express-rate-limit
  app.use(
    rateLimit({
      windowMs: 10 * 60 * 1000, // 10 minutes
      max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
      standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
      legacyHeaders: false, // Disable the `X-RateLimit-*` headers,
      skipSuccessfulRequests: false, // The counting will skip all successful requests and just count the errors. Instead of removing rate-limiting, it's better to set this to true to limit the number of times a request fails. Can help prevent against brute-force attacks
      message: { message: E_TOO_MANY_REQUESTS, statusCode: 403 },
    }),
  );

  // -- Swagger setup
  const config = new DocumentBuilder()
    .setTitle('API Document of the Learn Nest Project')
    .setDescription('learn-nest API document')
    .addBearerAuth() // The API will use Bearer Authentication
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT);
  console.log(
    'Click to open Swagger APi: ',
    `http://localhost:${process.env.PORT}/api`,
  );
}
bootstrap();
