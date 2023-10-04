import { NestFactory } from '@nestjs/core';
import { MoviesModule } from './movies.module';
import { Logger } from 'nestjs-pino';

const port= process.env.PORT || 3010;
async function bootstrap() {
  const app = await NestFactory.create(MoviesModule);
  app.useLogger(app.get(Logger));
  app.enableCors();
  await app.listen(port);
}
bootstrap();
