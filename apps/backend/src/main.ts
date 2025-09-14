import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const serverPort = 3001;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(serverPort);
}
void bootstrap();
