import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

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
