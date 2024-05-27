// import modules needed.
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// function main
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Setting CORS allow all IP
  app.enableCors({
    origin: '*', // Permitir todas las direcciones IP
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });
  // set preffix global
  app.setGlobalPrefix("");
  // Setting needed
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  //Port
  await app.listen(3000);
}
//Call method main
bootstrap();
