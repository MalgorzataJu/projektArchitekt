import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
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
  app.enableCors();
  // app.enableCors({origin: 'localhost:3000'});
  app.use(cookieParser());
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
