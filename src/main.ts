import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from './config/services/config.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('NestApplication');
  const configService = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      whitelist: true,
      transform: true,
    }),
  );
  app.setGlobalPrefix('/api');

  app.enableCors({
    origin: '*',
    methods: 'GET,PUT,PATCH,POST,DELETE',
  });

  const config = new DocumentBuilder()
    .setTitle('API AUTH')
    .setDescription('this API is authentication')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(configService.get('PORT'), async () => {
    logger.log(
      `Server is running on http://localhost:${configService.get('PORT')}`,
    );
  });
}
bootstrap();
