import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies.module';
import { Logger } from 'nestjs-pino';


async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.useLogger(app.get(Logger));
  app.enableCors();
  await app.listen(3010);
}
bootstrap();
