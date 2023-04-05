import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
import { ValidationPipe } from "@nestjs/common";
import { DateFormat, DateFormatInterceptor } from "nestjs-date-format-interceptor";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // (app as NestExpressApplication).use(helmet);

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     disableErrorMessages: true,
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     transform: true,
  //   }),
  // );
  // app.useGlobalFilters(new GlobalExceptionFilter());
  // app.useGlobalInterceptors(
  //   new DateFormatInterceptor({
  //     maxDeep: 6,
  //     format: DateFormat.toISOString,
  //     fnFormat: date => `${date.toLocaleString('es-CR')}`,
  //   }),
  // );

  // app.enableCors(corsOptions);
  app.enableCors({
    origin:"http://localhost:3000",
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    allowedHeaders: 'Content-Type, Accept',
    credentials:true
  });
  app.use(cookieParser());
  await app.listen( 3001);
}
bootstrap();
