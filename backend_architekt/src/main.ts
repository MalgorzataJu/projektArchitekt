import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {ValidationPipe} from "@nestjs/common";
import {GlobalExceptionFilter} from "./filters/global-exception.filter";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(new ValidationPipe(({
  //   disableErrorMessages: true,
  //   whitelist: true,
  //   forbidNonWhitelisted: true,
  //   transform: true,
  // })))
  // app.useGlobalFilters(new GlobalExceptionFilter())
  // app.enableCors();
  await app.listen(3001);
}
bootstrap();
