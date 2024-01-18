import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as express from 'express';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';
import { CONSTANT, Swagger } from './common/constant';
import { AllExceptionsFilter } from './filters/exceptionFilter';
import { LoggerMiddleware } from './middlewares/logging.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  app.use(
    express.json({
      verify: (req: any, res, buf) => {
        req.rawBody = buf;
      },
    })
  );

  app.useGlobalPipes(new ValidationPipe({ transform: true, transformOptions: { enableImplicitConversion: true } }));
  app.enableCors();
  app.setGlobalPrefix(CONSTANT.API_ROOT_PATH);
  app.use(bodyParser.json());
  app.use(new LoggerMiddleware().use);
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  const httpAdapter = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  const config = new DocumentBuilder()
    .setTitle(Swagger.Title)
    .setDescription(Swagger.Description)
    .setVersion(Swagger.Version)
    .addApiKey(
      {
        type: 'apiKey',
        name: Swagger.AddApiKey.Name,
        in: Swagger.AddApiKey.In,
      },
      Swagger.AuthType
    )
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(Swagger.Path, app, document);

  await app.listen(8008);
}
bootstrap();
