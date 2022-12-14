import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Nest-Backend by Shirakayo')
    .setDescription('Documentation for REST')
    .setVersion('1.0.0')
    .addTag('Shirakayo')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/api/documentation', app, document);

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
}

start();
