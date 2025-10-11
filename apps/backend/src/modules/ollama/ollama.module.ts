import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createOllama } from 'ai-sdk-ollama';
import { PrismaModule } from '../prisma/prisma.module';
import { OllamaController } from './ollama.controller';
import { OllamaService } from './ollama.service';

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule],
  providers: [
    OllamaService,
    {
      provide: 'OLLAMA_PROVIDER',
      useFactory: () => {
        return createOllama({ baseURL: 'http://localhost:3003' });
      },
      inject: [ConfigService],
    },
  ],
  controllers: [OllamaController],
})
export class OllamaModule {}
